import express from "express";
import verifyUser from "../middlewares/verifyMiddleware.js";
import { deleteUser, update } from "../controllers/userController.js";

const router = express.Router();

router.put("/update/:userId", verifyUser, update);
router.delete("/delete/:userId", verifyUser, deleteUser);

export default router;
