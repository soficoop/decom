import { gql, useQuery } from "@apollo/client";
import { createContext, useContext, useState } from "react";
import { CommunitiesContext } from "./communities";
export interface Suggestion {
  id: number | undefined;
  title: string | undefined;
  content: string | undefined;
  image: string | undefined;
  score: number | undefined;
  upvotes: number | undefined;
  downvotes: number | undefined;
}

const SuggestionsContext = createContext<{
  suggestionsData: Suggestion[];
  suggestionsLoading: boolean;
  selectedSuggestion: Suggestion | undefined;
  setSelectedSuggestion: (sug: Suggestion) => void;
}>({
  suggestionsData: [],
  suggestionsLoading: false,
  selectedSuggestion: {
    id: undefined,
    title: undefined,
    content: undefined,
    image: undefined,
    score: undefined,
    upvotes: undefined,
    downvotes: undefined,
  },
  setSelectedSuggestion: (sug: Suggestion) => {},
});

function SuggestionsProvider({ children }: { children: JSX.Element }) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<
    Suggestion | undefined
  >();
  const { selectedCommunity } = useContext(CommunitiesContext);
  const { data, loading } = useQuery(
    gql`
      query suggestions($communityId: ID!) {
        suggestions(filters: { community: { id: { eq: $communityId } } }) {
          data {
            id
            attributes {
              content
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
    // { variables: { communityId: selectedCommunity?.id } }
    { variables: { communityId: 1 } }
  );

  const FetchSuggestionBySelectedCommunityId = () => {
    const { data, loading } = useQuery(
      gql`
        query suggestions($communityId: ID!) {
          suggestions(filters: { community: { id: { eq: $communityId } } }) {
            data {
              id
              attributes {
                content
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
      { variables: { communityId: selectedCommunity?.id } }
    );
  };

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

        selectedSuggestion: selectedSuggestion,
        setSelectedSuggestion: setSelectedSuggestion,
      }}
    >
      {children}
    </SuggestionsContext.Provider>
  );
}

export { SuggestionsContext, SuggestionsProvider };
