const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas/index.js');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const db = require('./config/connection');
require('dotenv').config();
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const fulfillOrder = (lineItems) => {
  // TODO: fill me in
  console.log("Fulfilling order", lineItems);
  console.log(lineItems.data) //pull price id out to match with inventory and update 
}

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

//////////////////// for client secret //////////////////////////
// app.get('/secret', async (req, res) => {
//   const intent = // ... Fetch or create the PaymentIntent
//   res.json({client_secret: intent.client_secret});
// });
// another way below? //
// app.get('/get-payment-intent/:paymentIntentId', async (req, res) => {
//   try {
//     const paymentIntentId = req.params.paymentIntentId;
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     res.json({ paymentIntent });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// another nother way? //
// app.post('/create-payment-intent', async (req, res) => {
//   try {
//     const { amount, currency } = req.body;

//     // Create a PaymentIntent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//     });

//     // Send the client secret to the frontend
//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Endpoint to fetch a PaymentIntent
// app.get('/get-payment-intent/:paymentIntentId', async (req, res) => {
//   try {
//     const paymentIntentId = req.params.paymentIntentId;
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     res.json({ paymentIntent });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
////////////////////////////////////////////////////////////


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

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