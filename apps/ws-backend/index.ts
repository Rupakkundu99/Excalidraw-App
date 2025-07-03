import {WebSocketServer} from 'ws'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const users=[]
const rooms=[]

const wss=new WebSocketServer({port:8080})

function checkUser(token:string):string|null{

    const jwtSecret=process.env.JWT_SECRET
    if(!jwtSecret){
        return null
    }

    const decoded=jwt.verify(token,jwtSecret)
    if(typeof decoded=='string') return null

    if(!decoded || !decoded.userId){
        return null
    }

    return decoded.userId
}

wss.on("connection",function connection(ws,request){
    const url=request.url

    if(!url){
        return
    }
    const queryParams=new URLSearchParams(url.split('?')[1])
    const token=queryParams.get('token')|| ""
    //@ts-ignore
    const userId=checkUser(token)

    if(!userId){
        ws.close
    }



    ws.on('message',function message(data){
        ws.send("PONG")
    })
})

