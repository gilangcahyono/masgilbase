import express, { type Express } from "express";
import * as controller from "../storage/storage.controller.ts";
import * as middleware from "../../../middlewares/upload.middleware.ts";

const router: Express = express();

router.post("/upload", middleware.upload, controller.upload);
router.get("/file/:id", controller.get);
router.delete("/remove/:id", controller.remove);

export default router;
