import { gql, useQuery, useMutation } from "@apollo/client";
import { createContext } from "react";
import { Outlet, useParams } from "react-router-dom";
import { ADD_SUGGESTION } from "../utils/mutations";

export interface Suggestion {
  id?: number;
  title?: string;
  content?: string;
  image?: string;
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

  const [AddSuggestionMutateFunc] = useMutation(ADD_SUGGESTION, {
    refetchQueries: ["suggestions"],
  });

  return (
    <SuggestionsContext.Provider
      value={{
        suggestionsData:
          data?.suggestions?.data?.map(
            (suggestion: { attributes: any; id: string }) => ({
              ...suggestion.attributes,
              id: suggestion.id,
              image: suggestion.attributes.image?.data?.attributes?.url ?? "",
            })
          ) || [],
        suggestionsLoading: loading,
        // AddSuggestionMutateFunc,
      }}
    >
      <Outlet />
    </SuggestionsContext.Provider>
  );
}

export { SuggestionsContext, SuggestionsProvider };
