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

//////////////////////////////////////////////// test 1
// app.use(bodyParser.raw({ type: 'application/json' }));

// const successRedirect = '/success';

// const handlePaymentSucceeded = (event) => {
//   const paymentIntent = event.data.object;
//   console.log('Payment succeeded');
// };

// app.post('/success', (req, res) => {
//   const sig = req.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, 'your_webhook_secret');
//   } catch (err) {
//     console.error('Webhook signature verification failed.');
//     return res.sendStatus(400);
//   }

//   if (event.type === 'payment_intent.succeeded') {
//     handlePaymentSucceeded(event);
//   }

//   res.sendStatus(200);
// });
///////////////////////////////////////////////////////

///////////////////////////////////////////////////test 2
// const paymentIntentSucceeded = (event) => {
//   window.alert("Payment success")
//   console.log("Payment successful")
// }

// let endpointSecret = "whsec_bd479958e581bb6cfb04ec9746336f01034c90ce245fbe734e9c2cb33ba0dca9";
// app.post('http://localhost:3000/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   if (event.type === 'payment_intent.succeeded') {
//     paymentIntentSucceeded(event)
//   } else {
//     console.log(err)
//   }
  
//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });
///////////////////////////////////////////////////

app.use(bodyParser.raw({ type: 'application/json' }));
// Webhook endpoint to listen for Stripe events
app.post('/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_bd479958e581bb6cfb04ec9746336f01034c90ce245fbe734e9c2cb33ba0dca9');
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return res.sendStatus(400);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log("payment succeeded!")
      handlePaymentIntentSucceeded(event);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.sendStatus(200);
});

const handlePaymentIntentSucceeded = async (event) => {
  const paymentIntent = event.data.object;
  const items = clearItemsFromPaymentIntent(paymentIntent);

  // Update inventory here
  console.log("Payment success!")
};

const clearItemsFromPaymentIntent = (paymentIntent) => {
  // Clear cart here

  return []; // Return array of purchased items
};



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