import { FetchResult } from "@apollo/client";
import { ImageType } from "react-images-uploading";
export interface ISuggestionContext {
  suggestionsData: ISuggestion[];
  suggestionsLoading: any;
  addSuggestion: (
    title: string,
    content: string,
    image: any
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  addSuggestionData: any;
  addSuggestionLoading: boolean;
  addSuggestionError: any;
}

export interface ISuggestion {
  id?: number;
  title?: string;
  content?: string;
  image?: ImageType;
  score?: number;
  upvotes?: number;
  downvotes?: number;
}
