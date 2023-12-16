import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const apiEndpoint = `${process.env.API_HOST}:${process.env.API_PORT}/api`
console.log(apiEndpoint)
const httpLink = createHttpLink({
  uri: apiEndpoint
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `${process.env.API_AUTH_TOKEN}`
    }
  };
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
  });
});

