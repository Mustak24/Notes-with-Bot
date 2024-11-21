
import Textarea from "@/Components/Textarea";
import { useRouter } from "next/router";
import { TbSend } from "react-icons/tb";
import { useContext, useEffect, useState } from "react";
import Navabar from "@/Components/Navbar";
import themeChange from "@/Functions/themeChange";
import { _AppContext } from "@/Contexts/AppContext";
import { verifyUserToken } from "@/Functions/Auth";
import { getChat, updateChat } from "@/Functions/fetch";
import alertMsgs from "@/Functions/alertMsgs";
import gemini from "@/Functions/gemini";


export async function getServerSideProps({req, params}) {
  const token = req.cookies['user-token'];
  const isLogin = token && (await verifyUserToken(token))
  if(!isLogin) return {props: {isLogin}}
  const {chatInfo, miss} = await getChat(token, params.chatId)
  if(!miss) return {redirect: {destination: '/'}, props: {alert: alertMsgs('internal-server-error')}}
  return {
    props: {isLogin, chatInfo}
  }
}

export default function ({isLogin, chatInfo}) {

  const {setAlert} = useContext(_AppContext)

    const [msg, setMsg] = useState('');
    const [chat, setChat] = useState(chatInfo?.chat || []);

    const router = useRouter()

    async function isNotLoginChat(){

      if(!window.navigator.onLine) return setAlert((alerts) => [...alerts, alertMsgs('no-internet')]);

      setChat([...chat, {sender: 'self', msg}])
      scrollChatBox()

      let timer = setTimeout(() => {
        setChat([...chat, {sender: 'self', msg}, {sender: 'bot', msg: <ChatLoaingBox/> }])
        scrollChatBox()
      }, 300)

      const replay = await gemini(msg);
      clearTimeout(timer);

      setChat([...chat, {sender: 'self', msg}, {sender: 'bot', msg: replay }])
      
      return sessionStorage.setItem('user-chat', JSON.stringify([...chat, {sender: 'self', msg}, {sender: 'bot', msg: replay }]))
    }

    async function isLoginChat(){
      
      if(!window.navigator.onLine) return setAlert((alerts) => [...alerts, alertMsgs('no-internet')]);
      
      const {chatId} = router.query

          let res = await updateChat({chatId, newMsg: {sender: 'self', msg}})
          if(!res.miss) return setAlert((alerts) => [...alerts, alertMsgs('fail-to-save-chat')])
          
          setChat(res.chat) 
          scrollChatBox()

          let timer = setTimeout(() => {
            setChat((chat) => [...chat, {sender: 'bot', msg: <ChatLoaingBox/> }])
            scrollChatBox()
          }, 300)

          const replay = await gemini(msg);
          clearTimeout(timer);
          res = await updateChat({chatId, newMsg: {sender: 'bot', msg:replay}})
          if(!res.miss) return setAlert((alerts) => [...alerts, alertMsgs('fail-to-save-chat')])
    
          setChat(res.chat)
          return scrollChatBox()
    }

    function scrollChatBox(){
      const chatBox = document.getElementById('chat-box')
      chatBox.scroll({behavior: 'smooth', top: chatBox.scrollHeight});
    }

    useEffect(() => {
      console.log(!isLogin, sessionStorage.getItem('user-chat'))
      if(!isLogin) setChat(JSON.parse(sessionStorage.getItem('user-chat')))
      scrollChatBox();
    }, [])

  return (<>
    <Navabar isLogin={isLogin} themeChange={themeChange} />
    <main className="flex items-center justify-center flex-col w-full h-full px-5 py-20 gap-5 overflow-hidden">
      <div id="chat-box" className="w-full max-w-[1000px] h-full flex flex-col gap-2 items-center shrink-0 overflow-scroll">
        {(chat || []).map((msgInfo, index) => <MsgBox key={index} msg={msgInfo.msg} sender={msgInfo.sender} time={msgInfo.time} />)}
      </div>
      <Textarea value={msg} onChange={(e) => setMsg(e.target.value)} className="max-w-[1000px] min-h-fit max-h-[200px] gap-1 rounded-full" >
            <button  onClick={isLogin ? isLoginChat : isNotLoginChat} className="bg-transparent">
              <TbSend className="min-w-10 min-h-10 rounded-full relative left-3 p-2 bg-[var(--text)] text-[var(--bg)] opacity-100 sm:hover:opacity-75 active:opacity-75" />
            </button>
      </Textarea>
    </main>
  </>);
}


function MsgBox({msg, sender, time=''}){
    return <pre className="flex text-pretty cursor-default shrink-0 items-center justify-center relative h-fit max-w-[80%] rounded-[20px] px-5 py-2 bg-[var(--text)] text-[var(--bg)] z-[10] group overflow-hidden" 
        style={{alignSelf: sender == 'self' ? 'end' : 'start', animation: 'comeFromBottom 1s'}}
    >
        <div className="absolute text-[8px] font-sans font-bold bg-transparent z-[-1] right-4 top-full group-hover:translate-y-[-100%] transition-all duration-200">{time && time.split('T')[1].split('.')[0]}</div>
        {msg}
    </pre>
}

function ChatLoaingBox(){
  return <div className="flex items-center justify-center gap-2 h-5">
  {[1, 2, 3].map((i) => {
    return (
      <div key={i} className="relative center min-w-3 rounded-full aspect-square bg-sky-500 after:content-[''] after:absolute after:bg-sky-400 after:rounded-full after:w-full after:aspect-square after:animate-ping"></div>
    );
  })}
</div>
}