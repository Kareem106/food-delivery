import { Router } from "express";
import multer from "multer";
const router = Router();
import { user_login, user_signup } from "../controllers/user.controllers.js";
const upload = multer();
router.post("/login", upload.none(), user_login);
router.post("/signup", upload.none(), user_signup);
export default router;
