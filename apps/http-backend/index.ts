import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Auth } from './userMiddleware'
import {CreateRoomSchema, CreateUserSchema, SigninSchema} from '@repo/common'
import {prismaClient} from '@repo/db'

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: number | string;
    }
  }
}

dotenv.config()
const app=express()
 
app.use(express.json())



//@ts-ignore
app.post('/signup',async(req,res)=>{
    const body=req.body

    const data=CreateUserSchema.safeParse(body)

    if(!data.success){
        res.json({
            message:"Incorrect signup Credentials"
        })
    }

    if (!data.success || !data.data.email || !data.data.password || !data.data.name) {
        return res.status(400).json({
            message: "Missing required user fields"
        });
    }

    await prismaClient.user.create({
        data: {
            email: data.data.email,
            password: data.data.password,
            name: data.data.name,
            photo: "" // Provide a default value or get it from the request
        }
    })

    res.json({
        message:"User signup Successfull"
    })

})
//@ts-ignore

app.post('/signin', async (req, res, next) => {
    
    const data=SigninSchema.safeParse(req.body)
    if(!data.success){
        res.json({
            message:"Incorrect signin Credentials"
        })
    }

    const user=await prismaClient.user.findFirst({
        where:{
            email:req.body.email,
            password:req.body.password
        }
    })
    
    const jwtSecret = process.env.JWT_SECRET;


    if (!jwtSecret) {
        return res.status(500).json({ 
            message: "JWT secret is not defined in environment variables." 
        });
    }
    

     if (!user) {
        return res.status(500).json({ 
            message: "User not found signUp again to continue" 
        });
    }

    const token = jwt.sign({ 
        userId:user?.id 
    }, jwtSecret);
    
    res.status(200).json({ 
        token: token,
        message: "Sign in successful"
    });

});

app.post('/room',Auth,async(req,res)=>{
    const parsedData=CreateRoomSchema.safeParse(req.body)
    if(!parsedData.success){
        res.json({
            message:"Incorrect room details"
        })
    }

    const userId=req.userId

    const room=await prismaClient.room.create({
        data:{
            slug:parsedData.data?.name||"",
            //@ts-ignore
            adminId:userId
        }
    })

    res.json({
        message:"Room created successfully",
        roomId:room.id
    })
})

app.get('/chats/:roomId',async(req,res)=>{
    const roomId=Number(req.params.roomId)
    const messages=await prismaClient.chat.findMany({
        where:{
            roomId:roomId
        },
        orderBy:{
            id:"desc"
        },
        take:100
    })

    res.json({
        messages
    })
})

app.get("/room/:slug",async(req,res)=>{
    const slug=req.params.slug
    const room=await prismaClient.room.findFirst({
        where:{
            slug
        }
    })

    res.json({
        room
    })
})

app.listen(3001)