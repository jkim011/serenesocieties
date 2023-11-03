const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas/index.js');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const db = require('./config/connection');
require('dotenv').config();
const bodyParser = require('body-parser');

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_KEY);

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

////////////////////////////////////////////////
// app.use(bodyParser.json());

// app.post('/success', async (req, res) => {
//   const event = req.body;

//   try {
//     // Verify the webhook event is from Stripe
//     const webhookEvent = stripe.webhooks.constructEvent(
//       req.rawBody, // Use rawBody to access the payload
//       req.headers['stripe-signature'],
//       'YOUR_STRIPE_WEBHOOK_SECRET'
//     );

//     if (webhookEvent.type === 'payment_intent.succeeded') {
//       // Execute your function after a successful payment
//       yourFunctionToExecute();
//     }
//   } catch (err) {
//     console.error('Webhook error:', err);
//   }
//   res.sendStatus(200);
// });

// const yourFunctionToExecute = () => {
//   // This is where you execute your desired function after a successful payment
//   // You can update the database, send order confirmations, or perform other actions here
//   console.log('Payment successful. Executing your function.');
// };

const endpointSecret = "whsec_bd479958e581bb6cfb04ec9746336f01034c90ce245fbe734e9c2cb33ba0dca9";

app.post('/success', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      window.alert("Payment success")
      console.log("Payment successful")
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});
///////////////////////////////////////////////////


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