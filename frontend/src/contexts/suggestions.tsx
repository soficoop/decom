import { useQuery, useMutation } from "@apollo/client";
import { createContext } from "react";
import { Outlet, useParams } from "react-router-dom";
import {
  addSuggestion as addSuggestionMutation,
  updateSuggestion as updateSuggestionMutation,
} from "../utils/mutations";
import { suggestions as suggestionsQuery } from "../utils/queries";
import { Suggestion } from "../types/entities";
import { FetchResult } from "@apollo/client";

export interface SuggestionContext {
  addSuggestion: (
    title: string,
    content: string,
    image: number
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  addSuggestionData: any;
  addSuggestionError: any;
  addSuggestionLoading: boolean;
  suggestionsData: Suggestion[];
  suggestionsLoading: any;
  updateSuggestion: (
    id: number,
    upvotes: number,
    downvotes: number
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
}

const SuggestionsContext = createContext<SuggestionContext>(
  {} as SuggestionContext
);

function SuggestionsProvider() {
  const { communityId } = useParams();
  const commId = communityId && parseInt(communityId);

  const { data, loading } = useQuery(suggestionsQuery, {
    variables: { commId },
  });

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

  const [updateSuggestion] = useMutation(updateSuggestionMutation, {
    refetchQueries: ["suggestions"],
  });

  const state: SuggestionContext = {
    addSuggestion: (title, content, image) => {
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
    addSuggestionError,
    addSuggestionLoading,
    suggestionsData:
      data?.suggestions?.data?.map(
        (suggestion: { attributes: any; id: string }) => ({
          ...suggestion.attributes,
          id: suggestion.id,
          image: suggestion.attributes.image?.data?.attributes?.url ?? "",
        })
      ) || [],
    suggestionsLoading: loading,
    updateSuggestion: (id, upvotes, downvotes) => {
      return updateSuggestion({
        variables: {
          id,
          upvotes,
          downvotes,
        },
      });
    },
  };

  return (
    <SuggestionsContext.Provider value={state}>
      <Outlet />
    </SuggestionsContext.Provider>
  );
}

export { SuggestionsContext, SuggestionsProvider };
