import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request{
   user?: {id:number,role:string};
}

export const verifyToken=(req:AuthRequest,res:Response,next:NextFunction):void=>{
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({success:false,message:"Access Denied"})
        return;
    }

    const token=authHeader?.split(' ')[1];

    if(!token){
        res.status(404).json({
            success:false,
            message:"Access Denied"
        })
        return;
    }

    try{
        const secret= process.env.JWT_SECRET as string
        const decode=jwt.verify(token,secret) as unknown as{id:number;role:string};
        req.user=decode;
        next();
    }
    catch(e){
        console.log("jwt verify token error",e);
        res.status(404).json({
            success:false,
            message:"invalid"
        })
        return;
    }
}

export const authorizedRole=(...allowedRole:string[])=>{
    return(req: AuthRequest,res:Response,next:NextFunction):void=>{
        if(!req.user){
            res.status(401).json({message:"unauthorized person. please login first"})
            return;
        }
        if (!allowedRole.map(r => r.toLowerCase()).includes(req.user.role.toLowerCase())){
            res.status(403).json({success:false,message:"Access Denied"})
            return;
        }
        next();
    }
}