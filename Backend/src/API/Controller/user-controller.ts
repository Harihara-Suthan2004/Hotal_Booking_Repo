import jwt  from "jsonwebtoken";
import { Request,Response } from "express";
import prisma from "../../config/db.ts";
import bcrypt from 'bcrypt'
import { AuthRequest } from "../Middleware/auth-middleware";

export const getallUser=async (req:Request,res:Response)=>{
    try{
    const users=await prisma.user.findMany({
        select:{
            id:true,
            name:true,
            email:true,
            role:true,
            created_at:true
        }
    });
    res.status(202).json(users)
}
catch(e){
    res.status(500).json({
        message:"Failed to fetch all users"
    })
}
}

//create users

export const createUsers=async (req:AuthRequest,res:Response):Promise<void>=>{
    try{
        const {name,email,password,role} = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const salt= await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);

        const newUser=await prisma.user.create({
            data:{
                name,
                email,
                password:hashedpassword,
                role:role ? role.toUpperCase() : "USER",
                created_by:req.user? req.user.id:null
            },
            select:{
                id:true,
                name:true,
                email:true,
                role:true,
                created_by:true,
                created_at:true
            }
        });
        res.status(201).json({
            message:"User Created Successfully",
            user:newUser
        })
    }
    catch(e:any){
        console.log("error creating user",e)
        if (e.code === 'P2002') {
            res.status(409).json({ message: 'Email already in use' });
            return;
        }
        res.status(500).json({
            message:"Failed to create user"
        })
    }
}

export const loginUser=async (req:Request,res:Response):Promise<void>=>{
    try{
        const {email,password}=req.body;

        const user= await prisma.user.findUnique({
            where:{email:email}
        })
        if(!user){
            res.status(401).json({
                message:"Invalid email or password"
            })
            return;
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            res.status(401).json({message:"Invalid email or password"});
            return;
        }
        const token= jwt.sign(
            {id:user.id,role:user.role},
            process.env.JWT_SECRET as string,
            {expiresIn: '1d'}
        );
        res.status(200).json({
            message:"login Successful",
            token:token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
    }
    catch(e){
        res.status(500).json({message:"Failed to login"})
    }
}

