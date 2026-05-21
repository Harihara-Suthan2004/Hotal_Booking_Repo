import { Router } from "express";
import { authorizedRole, verifyToken } from "../Middleware/auth-middleware";
import { getallorders, getDetailSailes } from "../Controller/order-controller";

const route = Router();


route.get('/all-orders', verifyToken, authorizedRole('ADMIN'), getallorders);


route.get('/sales-history', verifyToken, authorizedRole('ADMIN'), getDetailSailes);

export default route;