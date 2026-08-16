import express, { type Express, type Request, type Response } from "express";
import dashboard from "./dashboard.route.ts";

const router: Express = express();

router.use("/dashboard/api", dashboard);

// router.use("/api", auth);
// router.use("/api", storage);

export default router;
