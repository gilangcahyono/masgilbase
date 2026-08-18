import express, { type Express } from "express";
import * as controller from "../account/account.controller.ts";
import { checkToken as mCheckToken } from "../../../middlewares/auth.middleware.ts";

const router: Express = express();

router.post("/login", controller.login);
router.post("/register", controller.register);
router.delete("/logout", mCheckToken, controller.logout);
router.get("/me", mCheckToken, controller.me);

export default router;
