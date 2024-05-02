import { getSession, useSession } from "next-auth/react"
import { CreateBlog } from "../../../lib/actions/createBlog"
import { Button } from "./Buttons"
import { authOptions } from "../../../lib/actions/auth"
import { getServerSession } from "next-auth"


export const Dashboard=  ()=>{
    const session=useSession();

    if(session?.data?.user){
        return <div>
        want to write something
        
        <Button onClick={CreateBlog}>Create</Button>
    </div>
    }
    else 
    return <div>
        get started
    </div>
    
}