import {Response} from 'express'
import prisma from '../../config/db'
import {AuthRequest} from '../Middleware/auth-middleware'

export const addtoCart=async (req:AuthRequest,res:Response)=>{
    try{
        const {food_item_id}=req.body;
        const userId=req.user?.id

        if(!userId){
            return res.status(401).json({success:false,message:"unauthorized user"})
        }

        const cartItem = await prisma.cartItem.upsert({
            where:{
                userId_food_item_id:{
                    userId:userId,
                    food_item_id:Number(food_item_id),
                },
            },
            update:{
                quantity:{increment:1},
            },
            create:{
                userId:userId,
                food_item_id:Number(food_item_id),
                quantity:1
            },
            include:{
                food_item:true
            }
        });
        res.status(200).json({
            success:true,
            message:"successfully added to cart",
            data:cartItem
        })
    }
    catch(e){
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}