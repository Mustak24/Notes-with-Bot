import Button from "@/Components/Button";
import Navabar from "@/Components/Navbar";
import { _AppContext } from "@/Contexts/AppContext";
import { verifyUserToken } from "@/Functions/Auth";
import { useContext } from "react";
import { createNote } from "@/Functions/fetch";
import { useRouter } from "next/router";
import alertMsgs from "@/Functions/alertMsgs";
import { cookies } from "@/Functions/halper";

export async function getServerSideProps({req}) {
    const token = req.cookies['user-token']
    if(!(token && (await verifyUserToken(token, req)))) return { redirect: { destination: '/login' } }
    return {props: {}}
}

export default function(){

    const {setAlert} = useContext(_AppContext)
    const router = useRouter()

    async function addNewNote(e){
        e.preventDefault()
        setAlert((alerts) => [...alerts, alertMsgs('info-send')])
        const note = Object.fromEntries(new FormData(e.target))
        let res = await createNote(cookies('user-token'), note)
        if(res.miss) router.push('/notes')
        setAlert((alerts) => [...alerts, res.alert])
    }

    return (<>
        <Navabar isLogin={true} />
        <form onSubmit={addNewNote} className="flex flex-col p-5 pt-10 gap-5 w-full h-full overflow-hidden relative">
            <input name="title" className="text-4xl h-10 font-sans font-semibold outline-none bottom-0 bg-transparent w-full" placeholder="Title" required />
            <hr className="border-1 border-[var(--text)] opacity-20"/>
            <textarea name="content" className="overflow-y-scroll h-full border-0 outline-none bg-transparent w-full" placeholder="Content ..." />
            <div className="absolute right-10 bottom-10 opacity-50 transition-all duration-200 hover:opacity-100 max-sm:active:opacity-100">
                <Button text="royalblue" scale={70} title="Save" />
            </div>
        </form>
    </>)
}