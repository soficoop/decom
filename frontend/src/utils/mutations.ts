import { gql } from "@apollo/client";

export const addSuggestion = gql`
  mutation createSuggestion(
    $title: String!
    $content: String!
    $community: ID!
    $image: ID
  ) {
    createSuggestion(
      data: {
        title: $title
        content: $content
        image: $image
        community: $community
      }
    ) {
      data {
        id
        attributes {
          title
          content
          image {
            data {
              attributes {
                url
              }
            }
          }
          score
          upvotes
          downvotes
        }
      }
    }
  }
`;

export const updateSuggestion = gql`
  mutation updateSuggestion($id: ID!, $upvotes: Int!, $downvotes: Int!) {
    updateSuggestion(
      id: $id
      data: { upvotes: $upvotes, downvotes: $downvotes }
    ) {
      data {
        id
      }
    }
  }
`;
