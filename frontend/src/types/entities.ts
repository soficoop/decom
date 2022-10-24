export interface Community {
  name: string | undefined;
  id: string | undefined;
  description: string | undefined;
  image: string | undefined;
  suggestions?: Suggestion[];
  password: string | undefined;
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
