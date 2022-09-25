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
