import express, { type Express, type Request, type Response } from "express";
import auth from "./auth.route.ts";

const router: Express = express();

router.use("/dashboard", auth);

export default router;
