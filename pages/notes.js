import { LongWidthBnt } from "@/Components/Button";
import { TypingHeading } from "@/Components/Heading";
import { Input } from "@/Components/Input";
import Navabar from "@/Components/Navbar";
import Textarea from "@/Components/Textarea";
import { _AppContext } from "@/Contexts/AppContext"
import alertMsgs from "@/Functions/alertMsgs";
import { verifyUserToken } from "@/Functions/Auth";
import { createNote, deleteNote, fetchAllNotes } from "@/Functions/fetch";
import { cookies } from "@/Functions/halper";
import themeChange from "@/Functions/themeChange";
import { useContext, useEffect, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";


export async function getServerSideProps({req}) {
    const token = req.cookies['user-token']
    if(!(token && (await verifyUserToken(token, req)))) return { redirect: { destination: '/login' } }
    return {props: {}}
}

export default function({}){

    const {setAlert} = useContext(_AppContext)

    const [notes, setNotes] = useState([])

    async function addNewNote(e){
        e.preventDefault()
        setAlert((alerts) => [...alerts, alertMsgs('info-send')])
        const note = Object.fromEntries(new FormData(e.target))
        let res = await createNote(cookies('user-token'), note)
        setAlert((alerts) => [...alerts, res.alert])
        setNotes((notes) => [...notes, res.note])
    }

    function handleNoteDelete(noteId, index, title){
        if(!confirm(`Did you want to delete note that: \nid: ${noteId} \nname: ${title}`)) return;
        setAlert((alerts) => [...alerts, alertMsgs('info-send')])
        deleteNote(noteId).then(res => {
          setAlert((alerts) => [...alerts, res.alert]);
          if(res.miss) setNotes((notes) => [...notes.slice(0, index), ...notes.slice(index+1)])
        })
      }

    useEffect(() => {
        fetchAllNotes(cookies('user-token')).then(res => setNotes(res?.notes || []))
    }, [])

    return(<>
        <Navabar isLogin={true} themeChange={themeChange}/>
        <TypingHeading className="text-center text-2xl font-serif my-5"> - Your All Notes -</TypingHeading>
        <main className="w-full h-full flex flex-col items-center gap-10 p-5">
            <form onSubmit={addNewNote} className="max-w-[1000px] flex flex-col items-center my-2 w-full gap-2">
                <Input name={'title'} className='w-full' placeholder="Enter Note title ..." />
                <Textarea name={'content'} className='w-full rounded-2xl' placeholder="Enter your note ..." />
                <LongWidthBnt className="w-full" title="Save" />
            </form>
            <div className="flex flex-wrap gap-2 justify-center w-full">
                {notes.map((note, index) => <NotesCard index={index} id={note._id} handleNoteDelete={handleNoteDelete} key={index} title={note.title} content={note.content}  />)}
            </div>
        </main>
    </>)
}

function NotesCard({title, content, index, handleNoteDelete, id}){
    return (
        <div className="flex items-center relative group overflow-hidden">
            <div
                className="center overflow-hidden w-[200px] h-[100px] rounded-[12px] bg-[var(--bgSec)] after:border-2 after:border-sky-500 after:h-[85px] hover:after:left-[10px] after:left-[8px] after:duration-100 after:transition-all after:rounded-full before:size-[1px] before:bg-[var(--text)] before:rounded-full before:left-0 before:top-0 hover:before:shadow-[0_0_100px_50px_var(--text)] before:transition-all duration-[1s]"
            >
                <div className="flex flex-col w-full h-full gap-[5px] px-[20px] py-[10px]">
                  <div className="text-sky-500 text-lg font-semibold transition-all duration-200 group-hover:translate-x-[2px]">
                    {title}
                  </div>
                  <p className="text-sm transition-all duration-300 line-clamp-2 group-hover:translate-x-[3px]">{content} </p>
                </div>
            </div>
            <button onClick={()=>handleNoteDelete(id, index, title)} className="absolute top-2 right-2 translate-x-10 group-hover:translate-x-0 transition-all">
                <MdOutlineDeleteForever className="size-6 text-red-500 hover:drop-shadow-[0_0_20px_crimson]" />
            </button>
        </div>
    )
}

