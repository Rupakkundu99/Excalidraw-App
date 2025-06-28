import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction,Response,Request } from 'express'

dotenv.config()

function Auth(req:Request,res:Response,next:NextFunction){
    const token=req.headers.authorization

    if(!token){
        res.json({
            message:"Token required for user Authentication"
        })
    }

    const decodedToken=jwt.verify(token,process.env.JWT_SECRET)

    if(decodedToken){
        res.json({
            message:"User Authenticated Successfully"
        })
        next()
    }
    else{
        res.json({
            message:"Token Authentication issue"
        })
    }

}