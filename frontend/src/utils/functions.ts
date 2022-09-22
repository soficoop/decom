import { uploadEndpoint } from "./constants";

export async function uploadFile(file: File) {
  console.log("hello");

  const body = new FormData();
  body.append("files", file);
  const res = await fetch(uploadEndpoint, {
    method: "post",
    body: body,
  });
  const resp = await res.json();
  console.log(resp);
  return resp[0];
}
