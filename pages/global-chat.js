
import Textarea from "@/Components/Textarea";
import { TbSend } from "react-icons/tb";
import { useContext, useEffect, useState, useTransition } from "react";
import Navabar from "@/Components/Navbar";
import { _AppContext } from "@/Contexts/AppContext";
import { verifyUserToken } from "@/Functions/Auth";
import { io } from "socket.io-client";
import { getUser } from "@/Functions/fetch";
import { cookies } from "@/Functions/halper";

export async function getServerSideProps({req}) {
    const token = req.cookies['user-token'];
    let isVerify = await verifyUserToken(token, req);
    if(!(token && isVerify)) return {redirect:{destination: '/login'}}
    return { props: {} }
}

let socket;

export default function () {

    const [msg, setMsg] = useState('');
    const [chat, setChat] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [username, setUsername] = useState('');


    function sendMsg(){
        let time = `${new Date().getHours()}:${new Date().getMinutes()}`
        socket.emit('message', msg, username, time);
        setChat((pre) => [...pre, {msg, sender: 'self', sender: username, time}]);
        setMsg('');
    }

    useEffect(() => {

        getUser(cookies('user-token')).then(res => {
            if(res.miss) setUsername(res.user.username);
        })

      socket = io('/global-chat', {path: '/api/socket'});

      socket.on('connect', () => {
      })

      socket.on('message', (message, sender, time) => {
        setChat((pre) => [...pre, {msg: message, sender, time}])
      })

      socket.on('disconnet', (id) => {
      })

      return () => {
        socket.disconnect();
      }
    }, [])

    

  return (<>
    <Navabar isLogin={true} />
    <main className="flex items-center justify-center flex-col w-full h-full px-5 py-20 gap-5 overflow-hidden">
        <div id="chat-box" className="w-full max-w-[1000px] h-full flex flex-col gap-2 items-center shrink-0 overflow-scroll">
            {(chat || []).map((msgInfo, index) => <MsgBox key={index} msg={msgInfo.msg} sender={msgInfo.sender} time={msgInfo.time} username={username} />)}
        </div>
        <Textarea onEnter={sendMsg} value={msg} onChange={(e) => setMsg(e.target.value)} className="max-w-[1000px] min-h-fit max-h-[200px] gap-1 rounded-lg py-2" >
        <button disabled={isLoading} onClick={sendMsg} className="bg-transparent">
            <TbSend className="min-w-10 min-h-10 rounded-lg relative left-3 p-2 bg-[var(--text)] text-[var(--bg)] opacity-100 sm:hover:opacity-75 active:opacity-75" />
        </button>
      </Textarea>
    </main>
  </>);
}


function MsgBox({msg, sender, time='', username}){
    return (
        <div 
            className="flex flex-col group" 
            style={{
                animation: 'comeFromBottom 1s', 
                alignSelf: sender == username ? 'end' : 'start',
                alignItems: sender == username ? 'end' : 'start'
            }}
        >
            <pre 
                className="flex text-pretty cursor-default shrink-0 items-center justify-center relative h-fit max-w-[80%] rounded-[20px] px-5 py-2 bg-[var(--text)] text-[var(--bg)] z-[10]" 
                >
                <div className="absolute text-[8px] font-sans font-bold bg-transparent z-[-1] right-4 opacity-0 group-hover:opacity-100 top-full group-hover:translate-y-[-100%] transition-all duration-200">{time}</div>
                {msg}
            </pre>
            <div className="text-xs px-1">{sender}</div>
        </div>
    )
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
