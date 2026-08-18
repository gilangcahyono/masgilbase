import express, { type Express } from "express";
import * as controller from "../project/project.controller.ts";
import { checkToken as mCheckToken } from "../../../middlewares/auth.middleware.ts";

const router: Express = express();

router.get("/projects", mCheckToken, controller.index);
router.post("/projects", mCheckToken, controller.store);
router.get("/projects/:id", mCheckToken, controller.show);
// router.put("/projects", controller.update);
router.delete("/projects/:id", mCheckToken, controller.destroy);

export default router;
