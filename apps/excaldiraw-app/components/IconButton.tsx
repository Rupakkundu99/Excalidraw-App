import { ReactNode } from "react";

export function IconButton({
    icon,onClick,activated
}:{
    icon:ReactNode,
    onClick:()=>void,
    activated:boolean
}){
    return <div className={`${activated ? "text-red-400":"text-white"}`} onClick={onClick}>
        {icon}
    </div>
}