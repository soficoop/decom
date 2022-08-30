import { gql, useQuery } from "@apollo/client";
import { createContext, useContext, useState } from "react";

interface Suggestion {
  id: number | undefined;
  title: string | undefined;
  content: string | undefined;
  image: string | undefined;
  score: number | undefined;
  upvotes: number | undefined;
  downvotes: number | undefined;
}

interface Community {
  name: string | undefined;
  id: string | undefined;
  description: string | undefined;
  image: string | undefined;
  suggestions?: Suggestion[];
  password: string | undefined;
}

const CommunitiesContext = createContext<{
  data: Community[];
  loading: boolean;
  selectedCommunity: Community | undefined;
  setSelectedCommunity: (com: Community) => void;
}>({
  data: [],
  loading: false,
  selectedCommunity: {
    id: undefined,
    name: undefined,
    description: undefined,
    image: undefined,
    password: undefined,
  },
  setSelectedCommunity: (com: Community) => {},
});

function CommunitiesProvider({ children }: { children: JSX.Element }) {
  const [selectedCommunity, setSelectedCommunity] = useState<
    Community | undefined
  >();

  const { data, loading } = useQuery(gql`
    query {
      communities {
        data {
          id
          attributes {
            name
            description
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
  `);

  return (
    <CommunitiesContext.Provider
      value={{
        data:
          data?.communities?.data?.map(
            (community: { attributes: any; id: string }) => ({
              ...community.attributes,
              image: community.attributes.image?.data?.attributes?.url ?? "",
              id: community.id,
            })
          ) || [],
        loading,
        selectedCommunity: selectedCommunity,
        setSelectedCommunity: setSelectedCommunity,
      }}
    >
      {children}
    </CommunitiesContext.Provider>
  );
}

const SuggestionsContext = createContext<{
  data: Suggestion[];
  loading: boolean;
  selectedSuggestion: Suggestion | undefined;
  setSelectedSuggestion: (sug: Suggestion) => void;
}>({
  data: [],
  loading: false,
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
    { variables: { communityId: selectedCommunity?.id } }
  );

  return (
    <SuggestionsContext.Provider
      value={{
        data:
          data?.suggestions?.data?.map(
            (suggestion: { attributes: Suggestion; id: string }) => ({
              ...suggestion.attributes,
              id: suggestion.id,
            })
          ) || [],
        loading,

        selectedSuggestion: selectedSuggestion,
        setSelectedSuggestion: setSelectedSuggestion,
      }}
    >
      {children}
    </SuggestionsContext.Provider>
  );
}

export {
  CommunitiesContext,
  CommunitiesProvider,
  SuggestionsContext,
  SuggestionsProvider,
};
