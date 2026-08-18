import { Config, File } from "../../types/storage";
import { request } from "../request";

export const upload = async (config: Config, file: any) => {
  const formData = new FormData();
  formData.append("file", file);

  return request("/upload", "POST", {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-api-key": config.apiKey,
    },
    body: formData,
  });
};
