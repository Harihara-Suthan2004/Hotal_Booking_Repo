import { Response } from "express";
import { AuthRequest } from "../Middleware/auth-middleware";
import prisma from "../../config/db";

export const getmycart=async (req:AuthRequest,res:Response)=>{
    try{
        const userId=req.user?.id;
        const cartItem=await prisma.cartItem.findMany({
            where:{userId:userId},
            include:{
                food_item:{
                    select:{
                        name:true,
                        price:true,
                        image:true,
                        category:true
                    }
                }
            }
        });

        const Amount=cartItem.reduce((acc,item)=>{
            return acc + (item.quantity * item.food_item.price);
        },0)
        res.status(200).json({
            totalAmount:Number(Amount.toFixed(2)),
            data:cartItem
        })
    }
    catch(e){
        res.status(500).json({success:false,message:"Error fetching cart"})
    }
}