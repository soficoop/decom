import { gql, useQuery, useMutation } from "@apollo/client";
import { createContext } from "react";
import { Outlet, useParams } from "react-router-dom";
import { addSuggestion as addSuggestionMutation } from "../utils/mutations";
import { Suggestion } from "../types/entities";
import { FetchResult } from "@apollo/client";

export interface SuggestionContext {
  suggestionsData: Suggestion[];
  suggestionsLoading: any;
  addSuggestion: (
    title: string,
    content: string,
    image: any,
    community: number
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  addSuggestionData: any;
  addSuggestionLoading: boolean;
  addSuggestionError: any;
}

const SuggestionsContext = createContext<SuggestionContext>(
  {} as SuggestionContext
);

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

  const [
    addSuggestion,
    {
      data: addSuggestionData,
      loading: addSuggestionLoading,
      error: addSuggestionError,
    },
  ] = useMutation(addSuggestionMutation, {
    refetchQueries: ["suggestions"],
  });

  const state: SuggestionContext = {
    suggestionsData:
      data?.suggestions?.data?.map(
        (suggestion: { attributes: any; id: string }) => ({
          ...suggestion.attributes,
          id: suggestion.id,
          image: suggestion.attributes.image?.data?.attributes?.url ?? "",
        })
      ) || [],
    suggestionsLoading: loading,
    addSuggestion: (title, content, image, community) => {
      return addSuggestion({
        variables: {
          title,
          content,
          image,
          community: commId,
        },
      });
    },
    addSuggestionData,
    addSuggestionLoading,
    addSuggestionError,
  };

  return (
    <SuggestionsContext.Provider value={state}>
      <Outlet />
    </SuggestionsContext.Provider>
  );
}

export { SuggestionsContext, SuggestionsProvider };
