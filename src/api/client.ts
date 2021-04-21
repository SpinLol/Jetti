import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.API_URL || 'http://localhost:4545/graphql';

export const apiClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Basic ${process.env.API_TOKEN}`,
  },
});
