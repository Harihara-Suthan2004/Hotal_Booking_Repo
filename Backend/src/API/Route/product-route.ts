import { Router } from "express";
import {createProducts,deleteProduct,getallProducts} from "../Controller/product-controller"
import { verifyToken,authorizedRole } from "../Middleware/auth-middleware"; 
import { createProductSchema } from "../../validation/product-validation.ts";
import { ValidateRequest } from "../Middleware/validate-request.ts";

const router=Router();

router.post(
    '/',
    verifyToken,
    authorizedRole('ADMIN'),
    ValidateRequest(createProductSchema),
    createProducts
)

router.delete(
    '/:id',
    verifyToken,
    authorizedRole('ADMIN'),
    deleteProduct
)

router.get(
    "/",
    getallProducts
)

export default router