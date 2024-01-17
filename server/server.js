const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas/index.js');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const db = require('./config/connection');
require('dotenv').config();
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 3001;
// const PORT = 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// const fulfillOrder = (lineItems) => {
//   console.log("Fulfilling order", lineItems);
//   for (let i = 0; i < lineItems.data.length; i++) {
//     console.log("Line item price id:", lineItems.data[i].price.id, " Quantity:", lineItems.data[i].quantity) //pull price id out to match with inventory and update
//     // send email to user with receipt and tracking 
//   }
// }
app.use(bodyParser.json());



app.post('/webhook', bodyParser.raw({type: 'application/json'}), async (request, response) => {
  const payload = request.body;
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, process.env.ENDPOINT_SECRET);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items'],
      }
    );
    const lineItems = sessionWithLineItems.line_items;

    fulfillOrder(lineItems);
  }
  response.status(200).end();
});

////////////////////////////////////
// app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event = req.body;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_bd479958e581bb6cfb04ec9746336f01034c90ce245fbe734e9c2cb33ba0dca9');
//   } catch (err) {
//     console.error('Webhook signature verification failed.', err);
//     return res.sendStatus(400);
//   }

//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       intent = event.data.object;
//       console.log("Payment intent succeeded!", intent.id)
//       handlePaymentIntentSucceeded(event);
//       break;
//     case 'payment_intent.payment_failed':
//       intent = event.data.object;
//       console.log("Payment intent failed", intent.id)
//     default:
//       console.log(`Unhandled event type: ${event.type}`);
//   }

//   res.sendStatus(200);
// });
////////////////////////////////

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors(
    // {
    //   origin: "http://localhost:3001",
    // }
  )
)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post('/create-checkout-session', async (req, res) => {
  try {
   console.log(req.body)
    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body,
      //  [
      //   {
      //     price: "price_1NTqMAGsTkNkjE8Ul9sJek5Y",
      //     quantity: 2
      //   }
      //   // {
      //   //   price: data.price,
      //   //   quantity: data.quantity
      //   // }
      // ],
      mode: 'payment',
      // shipping_address_collection: {
      //   allowed_countries: ['US'],
      // },
      // custom_text: {
      //   shipping_address: {
      //     message: 'Please note that we can\'t guarantee 2-day delivery for PO boxes at this time.',
      //   },
      //   submit: {
      //     message: 'We\'ll email you instructions on how to get started.',
      //   },
      // },
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cart`,
      
    });
    // Send the session ID back to the client
    // res.json({ id: session.id });  *can only have this or res.redirect, not both

    res.redirect(303, session.url);
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