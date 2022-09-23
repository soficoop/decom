import { uploadEndpoint } from "./constants";
import axios from "axios";

export async function uploadFile(file: File) {
  try {
    const formData = new FormData();
    formData.append("files", file);
    const res = await axios.post(
      "https://decom-kallh.ondigitalocean.app/_api/upload",
      formData
    );
    // const res = await axios.post(uploadEndpoint, formData);
    console.log(res);
    return res.data[0].id;
  } catch (err) {
    console.log(err);
  }
}
