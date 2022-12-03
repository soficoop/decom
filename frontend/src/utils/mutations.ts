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

export const createCommunityIdea = gql`
  mutation createCommunityIdea(
    $fullname: String!
    $email: String!
    $phone: String!
    $content: String!
  ) {
    createCommunityIdea(
      data: {
        fullname: $fullname
        email: $email
        phone: $phone
        content: $content
      }
    ) {
      data {
        id
        attributes {
          fullname
          email
          phone
          content
        }
      }
    }
  }
`;

export const joinCommunity = gql`
  mutation joinRequest($fullname: String!, $email: String!, $details: String!) {
    joinRequest(
      data: { fullname: $fullname, email: $email, details: $details }
    ) {
      data {
        id
        attributes {
          fullname
          email
          details
        }
      }
    }
  }
`;
