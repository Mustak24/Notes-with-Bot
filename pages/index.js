
import { HoverBox } from "@/Components/Smallcss"
import Textarea from "@/Components/Textarea"
import { useContext, useState } from "react";
import { TbSend } from "react-icons/tb";
import themeChange from "@/Functions/themeChange";
import alertMsgs from "@/Functions/alertMsgs";
import Navabar from "@/Components/Navbar";
import { TypingHeading } from "@/Components/Heading";
import { _AppContext } from "@/Contexts/AppContext";
import { useRouter } from "next/router";
import { verifyUserToken } from "@/Functions/Auth";
import { createChat } from "@/Functions/fetch";
import { cookies } from "@/Functions/halper";
import gemini from "@/Functions/gemini";


export async function getServerSideProps({req}){
  const token = req.cookies['user-token'];
  const isLogin = Boolean(token && (await verifyUserToken(token, req)))
  return {props: {isLogin}};
}

export default function ({isLogin, alert}) {
  
  const {setAlert} = useContext(_AppContext)

  const [prompt, setPrompt] = useState('');
  const [isLoading, setLoading] = useState(false);

  const router = useRouter()

  if(alert) setAlert((alerts) => [...alerts, alert])

  async function sendMsg(){
    if(!prompt) return setAlert((alerts) => [...alerts, alertMsgs('empty-msg')]);

    if(!window.navigator.onLine) return setAlert((alerts) => [...alerts, alertMsgs('no-internet')]);

    setLoading(true)
    setAlert((alerts) => [...alerts, {type: 'info', title: 'your Massege will be Send.'}])

    try{

      if(!isLogin){ 
        let replay = await gemini()
        setLoading(false)
        sessionStorage.setItem('user-chat', JSON.stringify([
          {sender: 'self', msg: prompt}, {sender: 'bot', msg: replay}
        ]))
        return router.push(`/chats/new`)
      }
      
      createChat(cookies('user-token'), {sender: 'self', msg: prompt}).then(res => {
        setLoading(false)
        if(!res.miss) return setAlert((alerts) => [...alerts, res.alert]);
        router.push(`/chats/${res.chatId}`);
      });
    } catch(e){
      setLoading(false)
    }

  }

  return <>
    <Navabar isLogin={isLogin} themeChange={themeChange}/>
    <main className="flex items-center justify-center flex-col w-full h-full px-5 ">
      <TypingHeading className="font-serif text-2xl text-center my-5" speed={150} >What Can I fix ... ?</TypingHeading>
      <Textarea className="max-w-[900px] gap-1 rounded-[20px]" required={true}
        onChange={(e) => setPrompt(e.target.value)}
      >
        <button disabled={isLoading} onClick={sendMsg}>
          <HoverBox><TbSend className="size-full" /></HoverBox>
        </button>
      </Textarea>
    </main>
  </> 
}


