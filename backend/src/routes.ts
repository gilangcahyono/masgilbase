import express, { type Express, type Request, type Response } from "express";
// import account from "./modules/account/account.route.ts";
import storage from "./modules/storage/storage.route.ts";
// import auth from "./modules/auth/auth.route.ts";

const router: Express = express();

// router.use("/account", account);
router.use("/storage", storage);
// router.use("/auth", auth);

export default router;
