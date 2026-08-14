import express, { type Express } from "express";
import * as controller from "../controllers/dashboard.controller.ts";

const router: Express = express();

router.post("/login", controller.login);
router.post("/register", controller.register);

export default router;
