import React, {StrictMode} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  uri: "graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
    </ApolloProvider>
  </StrictMode>
);
