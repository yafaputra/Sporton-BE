import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middlewre";
import { createTransaction, getTransactions, getTransactionById, updateTransactionStatus } from "../controllers/transaction.controller";

const router = Router();

router.post("/checkout", upload.single("image"), createTransaction);
router.get("/", authenticate, getTransactions);
router.get("/:id", authenticate, getTransactionById);
router.patch("/:id", authenticate, updateTransactionStatus);

export default router;