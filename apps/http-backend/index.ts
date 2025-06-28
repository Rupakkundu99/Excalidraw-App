import express from 'express'
import zod from 'zod'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Auth } from './userMiddleware'

const app=express()

app.use(express.json())
dotenv.config()


app.post('/signin',async(req,res)=>{
    const body=req.body

    const signUpschema=zod.object({
        email:zod.string().max(25).min(6),
        password:zod.string().max(25).min(6).regex(/[A-Z]/,"Password must have an uppercase letter")
        .regex(/[a-z]/,"It must have a small letter")
        .regex(/[^A-Za-z0-9]/,"Must have a special character"),
    })

    const parseData=signUpschema.safeParse(body)
    if(!parseData){
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
    const body = req.body;
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
    
})

app.listen(3001)