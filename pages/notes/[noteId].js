import Navabar from "@/Components/Navbar";
import {verifyUserToken} from "@/Functions/Auth";
import { TypingHeading } from "@/Components/Heading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getNote } from "@/Functions/fetch";
import { LuClock5 } from "react-icons/lu";

export async function getServerSideProps({req}){
    const token = req.cookies['user-token']
    if(!(token && (await verifyUserToken(token, req)))) return { redirect: { destination: '/login' } }
    return {props: {}}
}


export default function (){

    const [note, setNote] = useState({})

    const router = useRouter()

    useEffect(() => {
        let noteId = router.query.noteId;
        getNote(noteId).then(res => {
            console.log(res)
            setNote(res.note);
        })
    }, [])

    return (<>
        <Navabar isLogin={true}/>
        <main className="flex flex-col p-5 pt-10 gap-5">
            <div className="flex items-center h-10 font-sans relative">
                <TypingHeading className="text-4xl font-semibold">{note?.title || ''}</TypingHeading>
                <div className="text-[12px] absolute top-full right-1 flex items-center">{(note?.time || '').split('T')[0]} <LuClock5 className="px-1 box-content" /></div>
            </div>
            <hr className="border-1 border-[var(--text)] opacity-20"/>
            <pre>{note?.content || ''}</pre>
        </main>
    </>)
}