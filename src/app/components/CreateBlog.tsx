"use client"

import { Button } from "./Buttons";
import { createBlog } from "../../../lib/actions/createBlog";
import { useState } from "react";
import { useRouter } from "next/navigation";



export function CreateBlog(){
    const router = useRouter()
    const [title,setTitle]=useState('')
    const [desc,setDesc]=useState('')
    return <div className="flex m-3 p-6 gap-2 justify-center">
        <svg className="w-5 h-9 font-3xl" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
 <div className="flex-col">
 <div className="flex flex-col  gap-2 ">
    <input onChange={(e)=>{
        setTitle(e.target.value)
    }} type="text" placeholder="Title" className="text-4xl border rounded" />
    <input onChange={(e)=>{
        setDesc(e.target.value)
    }} type="text" placeholder="whats on ur mind !!" className=" border rounded h-20" />
    </div>
    <Button  onClick={async ()=> {await createBlog(title,desc)
        router.push('/home')
    }}>Create</ Button>
 </div> 
  </div>
}






