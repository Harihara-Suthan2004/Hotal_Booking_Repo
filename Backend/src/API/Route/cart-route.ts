import { Router } from "express";
import { addtoCart } from "../Controller/cart-controller";
import { verifyToken } from "../Middleware/auth-middleware";
import { getmycart } from "../Controller/mycart-controller";
import { checkout } from "../Controller/order-controller";

const router=Router();

router.post("/add",verifyToken,addtoCart);
router.get('/myCart',verifyToken,getmycart)

router.get('/checkout',verifyToken,checkout);

export default router;