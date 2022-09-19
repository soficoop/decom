import { gql, useQuery, useMutation } from "@apollo/client";
import { createContext } from "react";
import { Outlet, useParams } from "react-router-dom";
import { addSuggestion as addSuggestionMutation } from "../utils/mutations";
import { ISuggestionContext } from "../types/contexts";

const SuggestionsContext = createContext<ISuggestionContext>(
  {} as ISuggestionContext
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

  const state: ISuggestionContext = {
    suggestionsData:
      data?.suggestions?.data?.map(
        (suggestion: { attributes: any; id: string }) => ({
          ...suggestion.attributes,
          id: suggestion.id,
          image: suggestion.attributes.image?.data?.attributes?.url ?? "",
        })
      ) || [],
    suggestionsLoading: loading,
    addSuggestion: (title, content, image) => {
      return addSuggestion({
        variables: {
          title,
          content,
          image,
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
