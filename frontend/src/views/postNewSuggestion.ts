import { gql } from "@apollo/client";

export const ADD_SUGGESTION = gql`
  mutation AddSuggestion($title: String!) {
    addSuggestion(title: $title) {
      id
      title
      description
    }
  }
`;
