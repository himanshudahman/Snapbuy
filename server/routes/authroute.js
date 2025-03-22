import express from "express";
import {
  loginController,
  registerController,
  testController,
  forgotpasswordController,
  updateProfileController,
} from "../controllers/authContoller.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/forgot-password", forgotpasswordController);

router.get("/test", requireSignIn, isAdmin, testController);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update route
router.put("/profile", requireSignIn, updateProfileController);

export default router;
