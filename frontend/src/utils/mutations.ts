import { gql } from "@apollo/client";
// image: { data: { attributes: { url: $image } } }
// $image: ID!
export const addSuggestion = gql`
  mutation createSuggestion(
    $title: String!
    $content: String!
    $community: ID!
  ) {
    createSuggestion(
      data: { title: $title, content: $content, community: $community }
    ) {
      data {
        id
        attributes {
          title
          content

          score

          upvotes
          downvotes
        }
      }
    }
  }
`;
