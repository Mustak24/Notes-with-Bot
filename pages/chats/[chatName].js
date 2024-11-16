
import Textarea from "@/Components/Textarea";
import { useRouter } from "next/router";
import { TbSend } from "react-icons/tb";
import { useState } from "react";

export default function () {
    const router = useRouter();
    const [msg, setMsg] = useState('')
    const [chat, setChat] = useState([])

    function sendMsg(){

    }

  return (
    <main className="flex items-center justify-center flex-col w-full h-full px-5 py-20 gap-5">
      <div className="w-full max-w-[1000px] h-full flex flex-col gap-2 items-center shrink-0">
        {chat.map(msg => <MsgBox msg={msg.msg} sender={msg.sender} />)}
      </div>
      <Textarea onChange={(e) => setMsg(e.target.value)} className="max-w-[1000px] min-h-14 gap-1 rounded-full" >
            <TbSend onClick={sendMsg} className="min-w-10 min-h-10 rounded-full relative left-3 p-2 bg-[var(--text)] text-[var(--bg)] opacity-100 sm:hover:opacity-75 active:opacity-75" />
      </Textarea>
    </main>
  );
}


function MsgBox({msg, sender, time=''}){
    return <div className="flex items-center justify-center relative h-10 rounded-[20px] px-5 bg-[var(--text)] text-[var(--bg)] z-[10] group overflow-hidden" 
        style={{alignSelf: sender == 'self' ? 'end' : 'start'}}
    >
        <div className="absolute text-[8px] font-sans font-bold bg-transparent z-[-1] right-4 top-full group-hover:translate-y-[-100%] transition-all duration-200">{time}</div>
        {msg}
    </div>
}