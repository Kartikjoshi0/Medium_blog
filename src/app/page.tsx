'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import { Appbar } from "./components/Appbar"
import HomeCard from "./components/HomeCard";
import { Card } from "./components/Card";
import Signin from "./components/Signin";
import Quote from "./components/Quote";
import { Button } from "./components/Buttons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Page(){
  const session=useSession();
  const router = useRouter()
  if(session.data){
    router.push('/home')
  }
  const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

  const handleScrollToSignin = () => {
    // Scroll to the Signin component
    const signinElement = document.getElementById('signin');
    if (signinElement) {
        signinElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    // Add scroll event listener when component mounts
    window.addEventListener('scroll', handleScroll);
    
    // Remove scroll event listener when component unmounts
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);
// bgcolor={scrollY> 440 ?  'blue' : '#eab308'}
  return <div>
    <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} bgcolor={scrollY> 440 ?  'bg-white' : 'bg-yellow-500'}/> 
   
    
    
    <HomeCard onClick={()=>{handleScrollToSignin()}}/>
    
    <div className="">
      <div className="font-semibold m-4">Trending on Medium
       </div>
      <div className="grid grid-cols-2">
      <Card  author='kai' title="let go " id="1" desc={"exited to be here"} date={"12 hours ago"} />
      <Card  author='max' title="tesla" id="1" desc={"cyber truck is superb "} date={"8 hours ago "} />
      <Card  author='kaven' title="save me" id="1" desc={"save the environment"} date={"4 hours ago"} />
      <Card  author='shibam' title="dm" id="1" desc={"Dm me ,job for freshers  "} date={"29 min ago"} />
      <Card  author='kaven' title="save me" id="1" desc={"save the environment"} date={"4 min ago"} />
      <Card  author='shivam' title="dm" id="1" desc={"Dm me ,job for freshers  "} date={"29 min ago"} />
    </div>
  </div>
  <div className="grid grid-cols-2">

       <div id="signin"><Signin /></div> 
       <div className="bg-black flex justify-center items-center"><Quote /></div>
  </div>
  </div>
}