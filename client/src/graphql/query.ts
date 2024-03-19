import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query Books {
    books {
      title
      author
    }
  }
`;
