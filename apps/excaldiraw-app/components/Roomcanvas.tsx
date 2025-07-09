"use client"

import { WS_BACKEND } from "@/config"
import { initDraw } from "@/Draw"
import { useEffect,useRef,useState } from "react"
import { Canvas } from "./Canvas"


export function RoomCanvas({roomId}:{roomId:string}){
    const [socket,setSocket]=useState<WebSocket|null>(null)

    useEffect(()=>{
        const ws=new WebSocket(``)
    })
}