import express from "express";
import verifyUser from "../middlewares/verifyMiddleware.js";
import {
  deleteUser,
  deleteUsers,
  getUsers,
  update,
} from "../controllers/userController.js";

const router = express.Router();

router.put("/update/:userId", verifyUser, update);
router.delete("/delete/:userId", verifyUser, deleteUser);
router.delete("/deleteusers/:userId", verifyUser, deleteUsers);
router.get("/getusers", verifyUser, getUsers);

export default router;
