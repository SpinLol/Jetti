import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.API_URL || 'http://localhost:4545/graphql';

export const apiClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Basic ${process.env.API_TOKEN}`,
  },
});

export const mockUserIds = [
  '182283273259974656',
  '182383273259974656',
  '182483273259974656',
  '182583273259974656',
  '182683273259974656',
];
