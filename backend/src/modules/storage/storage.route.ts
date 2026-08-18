import express, { type Express } from "express";
import { upload as mUpload } from "../../../middlewares/storage.middleware.ts";
import { checkApiKey as mCheckApiKey } from "../../../middlewares/auth.middleware.ts";
import {
  store as cStore,
  index as cIndex,
  show as cShow,
  destroy as cDestroy,
} from "../storage/storage.controller.ts";

const router: Express = express();

router.post("/files", mCheckApiKey, mUpload, cStore);
router.get("/files", mCheckApiKey, cIndex);
router.get("/files/:id", mCheckApiKey, cShow);
router.delete("/files/:id", mCheckApiKey, cDestroy);

export default router;
