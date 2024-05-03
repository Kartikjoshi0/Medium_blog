import { useRouter } from "next/navigation";
import { Button } from "./Buttons"
import { useSession } from "next-auth/react";
interface AppbarProps {
    user?: {
        name?: string | null;
    },
   
    onSignin: any,
    onSignout: any,
    bgcolor: string
}

export const Appbar =  ({
    user,
    onSignin,
    onSignout,
    bgcolor
}: AppbarProps) => {
    
    const router = useRouter()
    const session=useSession();
    return <div className={`fixed  top-0 left-0 right-0  flex justify-between border-b px-4 ${bgcolor}` }>
        <div className="text-lg flex flex-col justify-center">
            Medium 
        </div>
        <div className="flex  justify-center pt-2">
            <button onClick={() => {
                if(!session.data){
                    alert('please login first ')
                }else{
                    router.push('/create')
                }
                
            }} className="bg-green-500 border rounded-lg hover: bg-green-200 text-white focus:outline-none focus:ring-4 font-medium text-sm px-5 py-2.5 me-2 mb-2">New</button>
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}