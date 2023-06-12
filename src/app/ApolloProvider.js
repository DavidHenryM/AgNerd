import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'localhost:3000/api',
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    {/* <MyRootComponent/> */}
  </ApolloProvider>
);

AppRegistry.registerComponent('MyApplication', () => App);