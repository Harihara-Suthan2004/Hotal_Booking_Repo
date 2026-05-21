import { Request,Response,NextFunction } from "express";
import { ZodType,ZodError, file } from "zod";

export const ValidateRequest=(schema:ZodType<any>)=>{
    return (req:Request,res:Response,next:NextFunction):void=>{
        try{
            schema.parse(
                req.body,
               );
            next();
        }
        catch(error){
            if(error instanceof ZodError){
                res.status(400).json({
                    message:"validation failed",
                    error:error.issues.map(err=>({field:err.path[1] || err.path[0],message:err.message}))
                });
            }
            else{
                res.status(500).json({message:"Internal server error during validation"})
            }
        }
    }
}