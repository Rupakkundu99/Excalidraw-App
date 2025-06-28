import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction,Response,Request } from 'express'

dotenv.config()

export function Auth(req:Request,res:Response,next:NextFunction){
    const token=req.headers.authorization

    if(!token){
        res.json({
            message:"Token required for user Authentication"
        })
    }
    //@ts-ignore 
    const decodedToken=jwt.verify(token,process.env.JWT_SECRET)

    if(decodedToken){
        //@ts-ignore
        req.userId=decodedToken.userId

        next()
    }
    else{
        res.json({
            message:"Token Authentication issue"
        })
    }

}