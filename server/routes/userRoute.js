import express from "express";
import verifyUser from "../middlewares/verifyMiddleware.js";
import { update } from "../controllers/userController.js";

const router = express.Router();

router.put("/update/:userId", verifyUser, update);

export default router;
