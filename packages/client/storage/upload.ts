import { Config, File } from "../../types/storage";
import { request } from "../request";

export const upload = async (config: Config, file: File) => {
  const formData = new FormData();
  formData.append("file", file.file);

  return request("/upload", "POST", {
    headers: { "Content-Type": "multipart/form-data", apiKey: config.apiKey },
    body: formData,
  });
};
