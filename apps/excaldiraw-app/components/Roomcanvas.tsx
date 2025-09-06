"use client"
import { WS_BACKEND } from "@/config"
import { initDraw } from "@/Draw"
import { useEffect,useRef,useState } from "react"
import { Canvas } from "./Canvas"


export function RoomCanvas({roomId}:{roomId:string}){
    const [socket,setSocket]=useState<WebSocket|null>(null)

    useEffect(()=>{
        const ws=new WebSocket(`${WS_BACKEND}`)


        ws.onopen=()=>{
            setSocket(ws);
            const data=JSON.stringify({
                type:"join_room",
                roomId
            })
            ws.send(data)
        }
    })

    if(!socket){
        return <div>
            Connecting to server....
        </div>
    }
    return <div>
        <Canvas roomId={roomId} socket={socket} />
    </div>
    
}