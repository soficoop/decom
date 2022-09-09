import { gql, useQuery } from "@apollo/client";
import { createContext, useContext, useState } from "react";
import { CommunitiesContext } from "./communities";
import { Outlet, useParams } from "react-router-dom";

export interface Suggestion {
  id?: number;
  title?: string;
  content?: string;
  image?: any;
  score?: number;
  upvotes?: number;
  downvotes?: number;
}

const SuggestionsContext = createContext<{
  suggestionsData: Suggestion[];
  suggestionsLoading: boolean;
}>({
  suggestionsData: [],
  suggestionsLoading: false,
});

function SuggestionsProvider() {
  const { communityId } = useParams();
  const commId = communityId && parseInt(communityId);

  const { data, loading } = useQuery(
    gql`
      query suggestions($commId: ID!) {
        suggestions(filters: { community: { id: { eq: $commId } } }) {
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
    `,
    { variables: { commId } }
  );
  console.log(data);

  return (
    <SuggestionsContext.Provider
      value={{
        suggestionsData:
          data?.suggestions?.data?.map(
            (suggestion: { attributes: Suggestion; id: string }) => ({
              ...suggestion.attributes,
              id: suggestion.id,
            })
          ) || [],
        suggestionsLoading: loading,
      }}
    >
      <Outlet />
    </SuggestionsContext.Provider>
  );
}

export { SuggestionsContext, SuggestionsProvider };
