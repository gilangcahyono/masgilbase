import express, { type Express } from "express";
import * as controller from "../storage/storage.controller.ts";

const router: Express = express();

router.post("/upload", controller.upload);
router.delete("/remove/:id", controller.remove);
router.get("/file/:id", controller.get);

export default router;
