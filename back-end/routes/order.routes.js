import { Router } from "express";
import {all_orders_get, order_status_put, placeOrder, user_orders_get, verify_order} from "../controllers/order.controllers.js";
import userAuth from "../middlewares/userAuth.middleware.js";
import adminAuth from "../middlewares/adminAuth.middleware.js";
const router = Router();

router.post("/checkout",userAuth,placeOrder);
router.get("/",userAuth,user_orders_get);
router.get("/admin",adminAuth,all_orders_get);
router.put("/admin/:id",adminAuth,order_status_put);
router.get("/:id/verify",userAuth,verify_order);
export default router;
