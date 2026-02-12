import { Router } from "express";
import { signin, initializeAdmin } from "../controllers/auth.controller";

const router = Router();

router.post("/signin", signin);
router.post("/initialize-admin-user", initializeAdmin);

export default router;



