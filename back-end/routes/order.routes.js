import { Router } from "express";
import {placeOrder} from "../controllers/order.controllers.js";
import userAuth from "../middlewares/userAuth.middleware.js";
const router = Router();

router.post("/checkout",userAuth,placeOrder);

export default router;
