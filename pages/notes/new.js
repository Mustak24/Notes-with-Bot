
import Navabar from "@/Components/Navbar";
import { _AppContext } from "@/Contexts/AppContext";
import { verifyUserToken } from "@/Functions/Auth";
import { useContext, useState } from "react";
import { createNote } from "@/Functions/fetch";
import { useRouter } from "next/router";
import { cookies } from "@/Functions/halper";
import { MdOutlineSaveAs } from "react-icons/md";
import { LuClock5 } from "react-icons/lu";

export async function getServerSideProps({req}) {
    const token = req.cookies['user-token']
    if(!(token && (await verifyUserToken(token, req)))) return { redirect: { destination: '/login' } }
    return {props: {}}
}

export default function(){

    const {setAlert} = useContext(_AppContext)
    const router = useRouter()

    const [isUpdating, setUpdating] = useState(false);

    async function addNewNote(e){
        e.preventDefault()
        setUpdating(true)
        const note = Object.fromEntries(new FormData(e.target))
        let res = await createNote(cookies('user-token'), note)
        setAlert((alerts) => [...alerts, res.alert])
        setUpdating(false);
        if(res.miss) router.push('/notes')
    }

    return (<>
        <Navabar isLogin={true} />
        <form onSubmit={addNewNote} className="flex flex-col p-5 pt-10 gap-5 w-full h-full overflow-hidden relative">
            <div className="flex items-center h-fit max-h-16 font-sans relative">
                <input 
                    name="title" 
                    className="text-4xl h-12 font-sans font-semibold outline-none bottom-0 bg-transparent w-full" 
                    placeholder="Title" 
                    required 
                />
                <button className="flex items-center justify-center text-sm gap-2 absolute right-2 bottom-2 opacity-75 sm:hover:opacity-100 max-sm:active:opacity-100">
                    {isUpdating ? 'Saving ...' : 'Save'} <MdOutlineSaveAs className="text-lg" />
                </button>
                <div className="text-[12px] absolute top-full right-1 flex items-center">
                    {`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`} <LuClock5 className="px-1 box-content" />
                </div>
            </div>
            <hr className="border-1 border-[var(--text)] opacity-20"/>
            <textarea 
                name="content" 
                className="overflow-y-scroll h-full border-0 outline-none bg-transparent w-full" 
                placeholder="Content ..." 
            />
        </form>
    </>)
}