"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import prisma from '../../prisma/index'



export async function createBlog(title: string, desc: string)  {
    
    const session = await getServerSession(authOptions)
    if(!session?.user ){
        console.log("not allowed");
        return 
    }
    try {
        const userId =Number(session.user.id)
        const post = await prisma.post.create({
            data: {
                title,
                content:desc,
                published: false,
                authorId: userId
            }
        });
        console.log("Blog post created:", post);
    } catch (error) {
        console.error("Error creating blog post:", error);
    }
        
}
export default createBlog