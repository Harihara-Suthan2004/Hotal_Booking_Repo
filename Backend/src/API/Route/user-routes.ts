import { Router } from "express";
import { getallUser,createUsers,loginUser } from "../Controller/user-controller";
import { ValidateRequest } from "../Middleware/validate-request";
import { CreateUserSchema } from "../../validation/user-validation.ts";
import { authorizedRole,verifyToken } from "../Middleware/auth-middleware";

const router=Router();

router.get('/',verifyToken,authorizedRole("Admin"),getallUser);

router.post('/create',ValidateRequest(CreateUserSchema),createUsers);

router.post('/login',loginUser);

export default router;