'use client'
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Signin() {
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    async function handleSubmit(){
        if(!email|| !password || !name){
            return alert('please fill all the fields ')
        }
            try {
                const res= await signIn('credentials',{
                    email: email,
                    password: password,
                    Name: name,
                }
            )
           

            } catch (error) {
                console.log("Error in signin  ",error);
                
            }
            
        }
    
    return (
        <div className="m-4 p-4">
            <div className="flex justify-center itmes-center mt-5 p-7">
                Sign Up 
            </div>
            <div className="flex flex-col gap-4  p-2 m-2 justify-center itmes-center p-10 border rounded-lg ">
                <input className="w-1/2 ml-20" onChange={(e)=> {setEmail(e.target.value)}} type="text"  placeholder="email" required/>
                <input className="w-1/2 ml-20" onChange={(e)=> {setPassword(e.target.value)}} type="text"  placeholder="password" required />
                <input className="w-1/2 ml-20" onChange={(e)=> {setName(e.target.value)}} type="text"  placeholder="name" required />
                <button onClick={handleSubmit} className="bg-gray-900 font-xl text-white w-[100px] h-[50px] rounded-xl ml-[150px]">Sign in </button>
            </div>
        </div>
)
}
    