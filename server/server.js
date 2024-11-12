const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas/index.js');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const db = require('./config/connection');
require('dotenv').config();
// const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const cors = require("cors");
const { request, gql } = require('graphql-request');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  // context: ({ req }) => authMiddleware({ req })
});

const corsOptions = {  ///// had to comment out for gql sandbox to work
  origin:'http://localhost:3000', 
  access:true,   
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
// app.use(bodyParser.json());


const endpoint = `http://localhost:${PORT}${server.graphqlPath}`;
const UPDATE_PRODUCT_INVENTORY = gql`
  mutation updateProductInventory($productId: ID!, $sizeId: ID!, $cartProductQuantity: Int!) {
    updateProductInventory(productId: $productId, sizeId: $sizeId, cartProductQuantity: $cartProductQuantity) {
      _id
      name
      image
      image2
      description
      price
      inventory {
        _id
        size
        quantity
        priceId
      }
    }
  }
`;

// const queryUser = gql`
//   query me {
//     me {
//       _id
//       firstName
//       lastName
//       email
//       isAdmin
//       cartItems {
//         _id
//         cartProductId
//         cartProductName
//         cartProductSizeId
//         cartProductSize
//         cartProductImage
//         cartProductPrice
//         cartProductPriceId
//         cartProductQuantity
//       }
//     }
//   }
// `;

const handleCheckoutSuccess = async (lineItems, token, context, req) => {
  //query products, loop thru lineItems.price and product.inventory.priceId to get a match, update inventory

  // const headers = req.query.token
  // app.use((req, res, next) => {
  //   authMiddleware({ req })
  //   next();
  // });
  const customReq = {
    headers: { authorization: `Bearer ${token?.split(' ').pop() || ''}` },
    query: {}
  };
  authMiddleware({ req: customReq });

  if (customReq.user && customReq.user.email) {
    console.log("User found:", customReq.user.email);
  } else {
    console.log('No user found');
  }

  const query = gql`
    query getProducts {
      products {
        _id
        name
        price
        inventory {
          _id
          size
          quantity
          priceId
        }
      }
    }
  `;
  try {
    const data = await request(endpoint, query);

    // const userData = await request(endpoint, queryUser, headers);
    // const user = userData?.me

    for (const lineItem of lineItems.data) {
      const lineItemPriceId = lineItem.price.id;
      const lineItemQuantity = lineItem.quantity;
  
      console.log('lineItem price id: ', lineItemPriceId, 'lineItem quantity: ', lineItemQuantity);
  
      const matchingProduct = data.products.find((product) =>
        product.inventory.some((inventoryItem) => inventoryItem.priceId === lineItemPriceId)
      );
  
      if (matchingProduct) {
        const matchingInventory = matchingProduct.inventory.find(
          (inventoryItem) => inventoryItem.priceId === lineItemPriceId
        );

        if (matchingInventory) {
          console.log(`Match found for product: ${matchingProduct._id} ${matchingProduct.name} with priceId: ${matchingInventory.priceId}`);
          console.log(`Inventory details: `, matchingInventory);

          const updateInventoryVariables = {
            productId: matchingProduct._id,
            sizeId: matchingInventory._id,
            cartProductQuantity: lineItemQuantity
          };

          try {
            const updatedProduct = await request(endpoint, UPDATE_PRODUCT_INVENTORY, updateInventoryVariables);
            console.log('Updated product inventory:', updatedProduct);
            //////////////////////check if user is loggedin, then clear localstorage or user.cart accordingly
            // if (req.user.email) {
            //   console.log("user found");
            // } else if (!req.user.email) {
            //   console.log('no user found')
            // }
            if (customReq.user) {
              console.log("User found:", customReq.user.email);
            } else {
              console.log('No user found');
              console.log(customReq)
            }
           
          } catch (updateError) {
            console.error('Error updating product inventory:', updateError);
          }
        } else {
          console.log('No matching inventory found');
        }
      } else {
        console.log('No matching product found');
      }
    }; 
  } catch (error) {
    console.error('Error querying product data:', error);
  }
};

app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_bd479958e581bb6cfb04ec9746336f01034c90ce245fbe734e9c2cb33ba0dca9');
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return res.sendStatus(400);
  }

  const context = {}; // 

  switch (event.type) {
    case 'payment_intent.succeeded' && 'checkout.session.completed':
      intent = event.data.object;
      console.log("Payment intent succeeded and checkout session completed!", intent.id)
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        { expand: ['line_items'] }
      );
      const lineItems = sessionWithLineItems?.line_items;
      if (!lineItems) {
        console.error('Line items are missing');
      }
      await handleCheckoutSuccess(lineItems, req.headers.authorization);
      break;
    case 'payment_intent.payment_failed' || 'charge.failed':
      intent = event.data.object;
      console.log("Payment intent failed and charge failed", intent.id)
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  res.sendStatus(200);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log(req.body)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body,
      mode: 'payment',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'NZ', 'FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'DK', 'SE', 'NO', 'FI', 
          'AT', 'IE', 'PT', 'CH', 'PL', 'CZ', 'SK', 'HU', 'EE', 'LT', 'LV', 'GR', 'RO', 'BG', 'HR',
          'SI', 'CY', 'MT', 'LU', 'LI', 'IS', 'JP', 'SG', 'HK', 'MY', 'PH', 'TH', 'IN', 'ID', 'VN', 
          'KR', 'TW', 'BR', 'MX', 'AR', 'CL', 'PE', 'CO', 'UY', 'IL', 'SA', 'AE', 'ZA'
        ],
      },
      // custom_text: {
      //   shipping_address: {
      //     message: 'Please note that we can\'t guarantee 2-day delivery for PO boxes at this time.',
      //   },
      //   submit: {
      //     message: 'We\'ll email you instructions on how to get started.',
      //   },
      // },
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60),
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cart`,
      
    });
    res.json({url: session.url})
  } catch (error) {
    console.error('Error creating Checkout Session:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// COMMENT OUT WHEN USING IN LOCALHOST
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// create an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  })
};

startApolloServer(typeDefs, resolvers);