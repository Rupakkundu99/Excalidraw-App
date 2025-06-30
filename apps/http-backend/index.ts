import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Auth } from './userMiddleware'
import {CreateRoomSchema, CreateUserSchema, SigninSchema} from '@repo/common/types'
import {prismaClient} from '@repo/db'

const app=express()

app.use(express.json())
dotenv.config()



app.post('/signin',async(req,res)=>{
    const body=req.body

    const data=CreateUserSchema.safeParse(body)

    if(!data.success){
        res.json({
            message:"Incorrect signup Credentials"
        })
    }

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

    const userId = 1;
    
    const jwtSecret = process.env.JWT_SECRET;


    if (!jwtSecret) {
        return res.status(500).json({ 
            message: "JWT secret is not defined in environment variables." 
        });
    }
    
    const token = jwt.sign({ userId }, jwtSecret);
    
    res.status(200).json({ 
        token: token,
        message: "Sign in successful",
        jwtToken:token
    });

    
});

app.post('/room',Auth,(req,res)=>{
    const data=CreateRoomSchema.safeParse(req.body)
    if(!data.success){
        res.json({
            message:"Incorrect room details"
        })
    }
    res.json({
        message:"Room created successfully"
    })
})

app.listen(3001)