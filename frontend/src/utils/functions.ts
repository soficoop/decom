import { uploadEndpoint } from "./constants";

export async function uploadFile(file: File) {
  const body = new FormData();
  body.append("files", file);
  const res = await fetch(uploadEndpoint, {
    method: "post",
    body: body,
  });
  const resp = await res.json();
  return resp[0];
}

export function truncateAfterWords(
  text: string,
  maxNumOfWords: number
): string {
  const words = text.split(" ");
  if (words.length <= maxNumOfWords) {
    return text;
  }
  return `${words.slice(0, maxNumOfWords).join(" ")}...`;
}

export function checkIfEmailIsValid(email: string): boolean {
  return !!email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}
