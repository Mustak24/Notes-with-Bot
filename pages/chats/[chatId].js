
import Textarea from "@/Components/Textarea";
import { useRouter } from "next/router";
import { TbSend } from "react-icons/tb";
import { useContext, useEffect, useState } from "react";
import Navabar from "@/Components/Navbar";
import themeChange from "@/Functions/themeChange";
import { _AppContext } from "@/Contexts/AppContext";
import { verifyUserToken } from "@/Functions/Auth";
import { getChat } from "@/Functions/fetch";
import alertMsgs from "@/Functions/alertMsgs";

export async function getServerSideProps({req, params}) {
  const token = req.cookies['user-token'];
  const isLogin = token && (await verifyUserToken(token))
  if(!isLogin) return {props: {isLogin}}
  const {chatInfo, miss} = await getChat(token, params.chatId)
  console.log(chatInfo)
  if(!miss) return {redirect: {destination: '/'}, props: {alert: alertMsgs('internal-server-error')}}
  return {
    props: {isLogin, chatInfo}
  }
}

export default function ({isLogin, chatInfo}) {

    const [msg, setMsg] = useState('');
   
    const [chat, setChat] = useState(chatInfo?.chat || []);


    function sendMsg(){
      if(!isLogin){
        const chat = JSON.parse(sessionStorage.getItem('user-chat'))
        setChat((chat) => [...chat, {sender: 'self', msg}])
        sessionStorage.setItem('user-chat', JSON.stringify([...chat, {sender: 'self', msg}]))
      } else{

      }
    }


  return (<>
    <Navabar isLogin={isLogin} themeChange={themeChange} />
    <main className="flex items-center justify-center flex-col w-full h-full px-5 py-20 gap-5">
      <div className="w-full max-w-[1000px] h-full flex flex-col gap-2 items-center shrink-0">
        {(chat || []).map(msgInfo => <MsgBox msg={msgInfo.msg} sender={msgInfo.sender} time={msgInfo.time} />)}
      </div>
      <Textarea value={msg} onChange={(e) => setMsg(e.target.value)} className="max-w-[1000px] min-h-14 gap-1 rounded-full" >
            <TbSend onClick={sendMsg} className="min-w-10 min-h-10 rounded-full relative left-3 p-2 bg-[var(--text)] text-[var(--bg)] opacity-100 sm:hover:opacity-75 active:opacity-75" />
      </Textarea>
    </main>
  </>);
}


function MsgBox({msg, sender, time=''}){
    return <div className="flex cursor-default items-center justify-center relative h-10 rounded-[20px] px-5 bg-[var(--text)] text-[var(--bg)] z-[10] group overflow-hidden" 
        style={{alignSelf: sender == 'self' ? 'end' : 'start'}}
    >
        <div className="absolute text-[8px] font-sans font-bold bg-transparent z-[-1] right-4 top-full group-hover:translate-y-[-100%] transition-all duration-200">{time.split('T')[1].split('.')[0]}</div>
        {msg}
    </div>
}