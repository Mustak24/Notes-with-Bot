import Navbar from "@/Components/Navbar"
import { _AppContext } from "@/Contexts/AppContext"
import themeChange from "@/Functions/themeChange"
import { useContext } from "react"
import { fetchAllChats } from "@/Functions/fetch"
import { verifyUserToken } from "@/Functions/Auth"
import { TypingHeading } from "@/Components/Heading"
import Link from "next/link"

export async function getServerSideProps({req}){
    const token = req.cookies['user-token'];
    if(!(token && (await verifyUserToken(token)))) return {redirect:{destination: '/login'}}
    const {chats, miss} = await fetchAllChats(token);
    return { props: {chats, miss} }
}

export default function ({chats=[]}){
    
    const {setAlert} = useContext(_AppContext);
    
    return(<>
        <Navbar isLogin={true} themeChange={themeChange}/>
        <main className="flex items-center justify-center flex-col w-full h-full px-5 ">
            <TypingHeading className="my-10 font-serif text-2xl">- All Old Chats -</TypingHeading>
            <div className="flex w-full h-full flex-wrap gap-2 justify-center">
            {chats.map((chat, index) => <Card01 key={index} title={chat.name} id={chat._id} />)}
            </div>
        </main>
    </>)
}


export function Card01({title, dec='Description ..', id}) {
    return (
      <>
        <Link href={`/chats/${id}`}
          className="center overflow-hidden w-[200px] h-[100px] rounded-[12px] bg-[var(--bgSec)] after:border-2 after:border-sky-500 after:h-[85px] hover:after:left-[10px] after:left-[8px] after:duration-100 after:transition-all after:rounded-full before:size-[1px] before:bg-[var(--text)] before:rounded-full before:left-0 before:top-0 hover:before:shadow-[0_0_100px_50px_var(--text)] before:transition-all duration-[1s] group"
        >
          <div className="flex flex-col w-full h-full gap-[5px] px-[20px] py-[10px]">
            <div className="text-sky-500 text-lg font-semibold transition-all duration-200 group-hover:translate-x-[2px]">
              {title}
            </div>
            <p className="text-sm transition-all duration-300 line-clamp-2 group-hover:translate-x-[3px]">{dec} </p>
          </div>
        </Link>
      </>
    );
  }



