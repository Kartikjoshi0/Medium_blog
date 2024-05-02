"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Appbar } from "../..//components/Appbar"
import { Card } from '../../components/Card'
import { SideBar } from "../../components/SideBar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


export default  function Page(): any{
  const session =useSession()
  const router=useRouter()
  if(!session.data){
    router.push('/')
  }
  const [posts, setPosts] = useState([]);
  useEffect(() => {
      async function fetchPosts() {
          try {
              const response = await fetch('/api/post');
              const postData=await response.json();
              console.log(postData);
              
              setPosts(postData)
          } catch (error) {
              console.log("Error fetching posts:", error);
          }
      }
      fetchPosts();
      
  }, []);


  return (
   < >
    <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} bgcolor='bg-white' />
    
      

        <div className="flex flex-row">
          <div className=" w-1/2">
          {posts.map(post => (
             
              <Card key={post.id} title={post.title} desc={post.content} date={"1 min ago"} authorName={`${post.author.Name}`} />
            
          ))}
          </div>
          <div className="w-1/2  "><SideBar /></div>
          
        </div>
    </>
  )
}