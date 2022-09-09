import { gql } from "@apollo/client";

export const ADD_SUGGESTION = gql`
  mutation createSuggestion {
    createSuggestion(data: { title: $title, content: $content }) {
      data {
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
