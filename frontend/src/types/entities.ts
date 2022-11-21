export interface Community {
  name?: string;
  id: string;
  description?: string;
  image?: string;
  suggestions?: Suggestion[];
  password?: string;
  suggestionCount?: number;
  requiresPassword?: boolean;
}

export interface Suggestion {
  id?: number;
  title?: string;
  content?: string;
  image?: string;
  score?: number;
  upvotes?: number;
  downvotes?: number;
  existingVote: "up" | "down" | "";
}
