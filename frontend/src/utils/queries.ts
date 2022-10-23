import { gql } from "@apollo/client";

export const suggestions = gql`
  query suggestions($commId: ID!) {
    suggestions(
      filters: { community: { id: { eq: $commId } } }
      sort: "score:DESC"
    ) {
      data {
        id
        attributes {
          content
          title
          score
          upvotes
          downvotes
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
