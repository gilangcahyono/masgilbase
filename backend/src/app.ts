import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.ts";
import { errorHandler } from "../middlewares/error.midleware.ts";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", routes);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => res.send("Backend OK!"));

export default app;
