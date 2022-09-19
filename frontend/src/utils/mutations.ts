import { gql } from "@apollo/client";

export const addSuggestion = gql`
  mutation createSuggestion(
    $title: String!
    $content: String!
    $image: ID!
    $community: ID!
  ) {
    createSuggestion(
      title: $title
      content: $content
      image: $image
      community: $community
    ) {
      data {
        id
        createdAt
        attributes {
          title
          content
          image
          score
          community
          upvotes
          downvotes
        }
      }
    }
  }
`;
