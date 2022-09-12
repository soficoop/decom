import { gql } from "@apollo/client";

export const ADD_SUGGESTION = gql`
  mutation createSuggestion(
    $title: String!
    $content: String!
    $image: ID!
    $score: Float!
    $community: ID!
    $upvotes: Int!
    $downvotes: Int!
  ) {
    createSuggestion(
      title: $title
      content: $content
      image: $image
      score: $score
      community: $community
      upvotes: $upvotes
      downvotes: $downvotes
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
