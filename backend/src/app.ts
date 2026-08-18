import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes.ts";
import { errorHandler } from "../middlewares/error.midleware.ts";
import { createClient } from "../../packages/client/client.ts";
import fs from "node:fs";
import { hashApiKey } from "../lib/auth.ts";
import { randomBytes } from "node:crypto";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api", routes);
app.use(errorHandler);

// app.get("/test", async (req: Request, res: Response) => {
//   const client = createClient({
//     projectId: "project-id-1",
//     apiKey: "key",
//   });
//   //   const buffer = fs.readFileSync("./temp/gambar.jpg");
//   //   const file = buffer.toString("base64");
//   //   console.log(file);
//   const file = new Blob([fs.readFileSync("./temp/ini.jpg")]);
//   console.log(file);
//   const { data, error } = await client.storage.upload(file);
//   res.status(200).json({ data, error });

//   res.status(200).json({
//     key: hashApiKey(randomBytes(32).toString("hex")),
//   });
// });

app.get("/", (req: Request, res: Response) => res.send("Backend OK!"));

export default app;
