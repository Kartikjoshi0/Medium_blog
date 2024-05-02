'use client'
import { useRouter } from "next/router";
import { Button } from "./Buttons";


export default function HomeCard({onClick}: {onClick: any}){


    return <div className="w-screen h-[600px] bg-yellow-500 flex flex-col justify-center items-center">
    <h1 className="text-4xl md:text-7xl tracking-wide font-extrabold text-center md:text-left">Stay Curious.</h1>
    <h6 className="text-2xl md:text-4xl tracking-wide font-extralight text-center md:text-left py-6">Discover stories, thinking, and expertise from writers on any topic.</h6>
    <Button onClick={onClick} >Take a Dive</Button>
    </div>
     
}