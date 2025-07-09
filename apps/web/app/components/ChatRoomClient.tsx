"use client"

import { useEffect, useState } from "react"
import { useSocket } from "../hooks/useSocket"

export function ChatRoom({messages,id}:{
    messages:{message:string}[],
    id:string
}){
    const[chats,setChats]=useState(messages)
    const {socket,loading}=useSocket()
    const[currentmessage,setcurrentMessage]=useState("")

    useEffect(()=>{
        if(socket && !loading){

            socket.send(JSON.stringify({
                type:"join_room",
                roomId:id
            }))

            socket.onmessage=(event)=>{
                const parsedData=JSON.parse(event.data)
                if(parsedData.type==='chat'){
                    setChats(c=> [...c,parsedData.message])
                }
            }
        }
    })

    return <div>
        {messages.map(m=><div>
            {m.message}
        </div>)}

        <input type="text" value={currentmessage}
        onChange={e=>{
            setcurrentMessage(e.target.value)
        }}
        />
        <button
        onClick={()=>{
            socket?.send(JSON.stringify({
                type:"chat",
                roomId:id,
                message:currentmessage
            }))
        }}
        ></button>

    </div>
}