import express from 'express'
import zod from 'zod'

const app=express()

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


app.listen(3001)