import { Request, Response } from "express";
import prisma from "../../config/db";
import { number, success } from "zod";
import { Param } from "../../generated/prisma/runtime/library";

export const createProducts = async (req: Request, res: Response) => {
    try {
        const { name, description, price, image, category, is_available } = req.body;

        const newFood = await prisma.foodItem.create({
            data: {
                name,
                description,
                price,
                image,
                category,
                is_available: is_available ?? true,
                
            },
        });
        res.status(201).json({
            success:true,
            message:"Food Item added successfully",
            data:newFood
        });
    }
    catch(e){
        console.log(e);
        res.status(500).json({success:false,message:"internal server error"});
    }
}

export const deleteProduct=async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const foodItem=await prisma.foodItem.findUnique({
            where:{id:Number(id)}
        });
        if(!foodItem){
            res.status(404).json({
                success:false,
                message:"Food not Found"
            })
        }
        await prisma.foodItem.delete({
            where:{id:Number(id)}
        })
        res.status(200).json({
            success:true,
            message:"food item deleted successfully"
        });
    }
    catch(e){
        console.error(e);
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}

export const getallProducts=async (req:Request,res:Response)=>{
    try{
        const food=await prisma.foodItem.findMany({
            select:{
                id:true,
                name:true,
                description:true,
                price:true,
                category:true,
                image:true,
                is_available:true
            }
        })
        res.status(202).json({success:true,message:"got all products",food})
    }
    catch(e){
        console.log("fooditem listing error",e)
        res.status(500).json({success:true,message:"failed to list all food items"})
    }
}