
import { HoverBox } from "@/Components/Smallcss"
import Textarea from "@/Components/Textarea"
import { useState } from "react";
import { TbSend } from "react-icons/tb";
import themeChange from "@/Functions/themeChange";
import alertMsgs from "@/Functions/alertMsgs";
import Navabar from "@/Components/Navbar";
import { TypingHeading } from "@/Components/Smallcss";


export default function Home({setAlert}) {

  const [msg, setMsg] = useState('')

  function sendMsg(){
    if(!msg) return setAlert((alerts) => [...alerts, alertMsgs('empty-msg')])
      
  }

  return <>
    <Navabar themeChange={themeChange}/>
    <main className="flex items-center justify-center flex-col w-full h-full px-5 ">
      <TypingHeading className="font-serif text-2xl text-center my-5" text="What Can I fix ... ?" speed={150} />
      <Textarea onChange={(e)=>setMsg(e.target.value)} className="max-w-[900px] gap-1 rounded-[20px]" required={true}>
        <button onClick={sendMsg}>
          <HoverBox><TbSend className="size-full" /></HoverBox>
        </button>
      </Textarea>
    </main>
  </> 
}
