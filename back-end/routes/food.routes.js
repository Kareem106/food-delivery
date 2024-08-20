import express from "express";
import multer from "multer";
const router = express.Router();
const upload = multer();
import {
  food_get,
  food_post,
  food_delete,
} from "../controllers/food.controllers.js";
router.get("/", food_get);
router.post("/", upload.single("image"), food_post);
router.delete("/:id", food_delete);
export default router;
