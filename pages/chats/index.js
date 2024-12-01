import Navbar from "@/Components/Navbar";
import { _AppContext } from "@/Contexts/AppContext";
import { useContext, useEffect, useState } from "react"
import { deleteChat, fetchAllChats } from "@/Functions/fetch"
import { verifyUserToken } from "@/Functions/Auth"
import { TypingHeading } from "@/Components/Heading"
import Link from "next/link"
import { MdOutlineDeleteForever } from "react-icons/md";
import { cookies } from "@/Functions/halper"
import alertMsgs from "@/Functions/alertMsgs"

export async function getServerSideProps({req}){
    const token = req.cookies['user-token'];
    if(!(token && (await verifyUserToken(token, req)))) return {redirect:{destination: '/login'}}
    return { props: {} }
}

export default function (){
    
    const {setAlert} = useContext(_AppContext);

    const [chats, setChats] = useState([])

    function handleChatDelete(chatId, index, title){
      if(!confirm(`Did you want to delete chat that: \nid: ${chatId} \nname: ${title}`)) return;
      setAlert((alerts) => [...alerts, alertMsgs('info-send')])
      deleteChat(chatId).then(res => {
        setAlert((alerts) => [...alerts, res.alert]);
        if(res.miss) setChats((chats) => [...chats.slice(0, index), ...chats.slice(index+1)])
      })
    }

    useEffect(() => {
      fetchAllChats(cookies('user-token')).then(res => {
        setChats(res?.chats || [])
      })
    }, [])
    
    return(<>
        <Navbar isLogin={true} />
        <main className="flex items-center justify-center flex-col w-full h-full px-5 ">
            <TypingHeading className="my-10 font-serif text-2xl">- All Old Chats -</TypingHeading>
            <div className="flex w-full h-full flex-wrap gap-2 justify-center">
            {chats.map((chat, index) => <Card01 key={index} index={index} title={chat.name} id={chat._id} handleChatDelete={handleChatDelete} />)}
            </div>
        </main>
    </>)
}


export function Card01({title, dec='Description ..', id, handleChatDelete, index}) {

    return (
      <>
        <div className="flex items-center relative h-fit group overflow-hidden">
          <Link href={`/chats/${id}`}
            className="center overflow-hidden w-[200px] h-[100px] rounded-[12px] bg-[var(--bgSec)] after:border-2 after:border-sky-500 after:h-[85px] hover:after:left-[10px] after:left-[8px] after:duration-100 after:transition-all after:rounded-full before:size-[1px] before:bg-[var(--text)] before:rounded-full before:left-0 before:top-0 hover:before:shadow-[0_0_100px_30px_var(--text)] before:transition-all duration-[1s]"
            >
            <div className="flex flex-col w-full h-full gap-[5px] px-[20px] py-[10px]">
              <div className="text-sky-500 text-lg font-semibold transition-all duration-200 group-hover:translate-x-[2px]">
                {title}
              </div>
              <p className="text-sm transition-all duration-300 line-clamp-2 group-hover:translate-x-[3px]">{dec} </p>
            </div>
          </Link>
          <button onClick={()=>handleChatDelete(id, index, title)} className="absolute top-2 right-2 translate-x-10 group-hover:translate-x-0 transition-all">
            <MdOutlineDeleteForever className="size-6 text-red-500 hover:drop-shadow-[0_0_20px_crimson]" />
          </button>
        </div>
      </>
    );
  }



