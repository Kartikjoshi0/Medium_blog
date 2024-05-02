import { Link } from "lucide-react";


export function SideBar(){
    function handleSearch(){
        return alert('Under devlopment ')
    }
    return (
        <div className="flex h-full w-1/2 mt-14 fixed ">
            <div className="w-full bg-gray-100 dark:bg-gray-800 p-4">
                <div className="grid grid-cols-3 gap-4 mt-10 p-3">
                      <button onClick={handleSearch} className="block p-2 rounded-md bg-white  hover:bg-gray-200 transition-colors">Sports</button>
                      <button className="block p-2 rounded-xl bg-white  hover:bg-gray-200 transition-colors">News</button>
                      <button className="block p-2 rounded-xl bg-white  hover:bg-gray-200 transition-colors">Science</button>
                      <button className="block p-2 rounded-xl bg-white  hover:bg-gray-200 transition-colors">Programing</button>
                      <button className="block p-2 rounded-xl bg-white  hover:bg-gray-200 transition-colors">Writing</button>
                      <button className="block p-2 rounded-xl bg-white  hover:bg-gray-200 transition-colors">Politics</button>
                      <button className="block p-2 rounded-xl bg-white  hover:bg-gray-200 transition-colors">Relationships</button>
                      <button className="block p-2 rounded-xl bg-white  hover:bg-gray-200 transition-colors">Technology</button>
                      <button className="block p-2 rounded-xl bg-white  hover:bg-gray-200 transition-colors">Productivity</button>

                </div>
                <div className="mt-20 ml-10 grid grid-cols-4 gap-4">
                    <div>help</div>
                    <div>About</div>
                    <div>Privacy</div>
                    <div>terms</div>



                </div>
            </div>
            

        </div>
    )
}