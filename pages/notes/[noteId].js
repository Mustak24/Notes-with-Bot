import Navabar from "@/Components/Navbar";
import {verifyUserToken} from "@/Functions/Auth";
import { TypingHeading } from "@/Components/Heading";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getNote, updateNote } from "@/Functions/fetch";
import { LuClock5 } from "react-icons/lu";
import ShowIf from "@/Components/Helper/ShowIf";
import { TiEdit } from "react-icons/ti";
import { MdOutlineSaveAs } from "react-icons/md";
import { _AppContext } from "@/Contexts/AppContext";

export async function getServerSideProps({req}){
    const token = req.cookies['user-token']
    let isVerify = await verifyUserToken(token, req);
    if(!(token && isVerify)) return {redirect:{destination: '/login'}}
    return {props: {}}
}


export default function (){


    const [note, setNote] = useState({})
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [isEdit, setEdit] = useState(false);
    const [isUpdating, setUpdating] = useState(false);

    const router = useRouter()

    useEffect(() => {
        let noteId = router.query.noteId;
        getNote(noteId).then(res => {
            setNote(res.note);
            setNoteTitle(res.note.title);
            setNoteContent(res.note.content);
        })
    }, []);


    function handleNoteUpdate(e){
        e.preventDefault();
        setUpdating(true)
        updateNote({id: note._id, title: noteTitle, content: noteContent}).then(res => {
            setUpdating(false)
            setEdit(false);
            if(res.miss) setNote(res.note)
        })
    }

    return (<>
        <Navabar isLogin={true}/>
        <ShowIf when={!isEdit}>
            <main className="flex flex-col p-5 pt-10 gap-5">
                <div className="flex items-center h-12 font-sans relative">
                    <TypingHeading className="text-4xl font-semibold">{note?.title || ''}</TypingHeading>
                    <button onClick={()=>setEdit(true)} className="flex  items-center justify-center text-sm gap-2 absolute right-2 bottom-2 opacity-75 sm:hover:opacity-100 max-sm:active:opacity-100">
                        edit <TiEdit className="text-lg" />
                    </button>
                    <div className="text-[12px] absolute top-full right-1 flex items-center">{(note?.time || '').split('T')[0]} <LuClock5 className="px-1 box-content" /></div>
                </div>
                <hr className="border-1 border-[var(--text)] opacity-20"/>
                <pre>{note?.content || ''}</pre>
            </main>
        </ShowIf>
        <ShowIf when={isEdit}>
            <form className="flex flex-col p-5 pt-10 gap-5 w-full h-full overflow-hidden relative">
                <div className="flex items-center h-fit font-sans relative">
                    <input
                        className="text-4xl h-12 font-sans font-semibold outline-none bottom-0 bg-transparent w-full" 
                        value={noteTitle} 
                        placeholder="Title" 
                        required 
                        onChange={(e) => setNoteTitle(e.target.value)}
                    />
                    <button disabled={isUpdating} onClick={handleNoteUpdate} className="flex  items-center justify-center text-sm gap-2 absolute right-2 bottom-2 opacity-75 sm:hover:opacity-100 max-sm:active:opacity-100">
                        {isUpdating ? 'Updating ...' : 'Update'} <MdOutlineSaveAs className="text-lg" />
                    </button>
                    <div className="text-[12px] absolute top-full right-1 flex items-center">
                        {`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`} <LuClock5 className="px-1 box-content" />
                    </div>
                </div>
                <hr className="border-1 border-[var(--text)] opacity-20"/>
                <textarea 
                    value={noteContent} 
                    className="overflow-y-scroll h-full border-0 outline-none bg-transparent w-full" 
                    placeholder="Content ..." 
                    onChange={(e) => setNoteContent(e.target.value)}
                />
            </form>
        </ShowIf>
    </>)
}