import { createContext, useEffect, useState } from "react";
import {verifyUserToken} from "@/Functions/Auth";
import alertMsgs from "@/Functions/alertMsgs";
import { useRouter } from "next/router";

export const _AppContext = createContext()

export default function AppContextProvider({children}){
    const [test, setTest] = useState('test');
    const [alerts, setAlert] = useState([])
    const [newChat, setNewChat] = useState(null)

    const states = {
        test, setTest,
        alerts, setAlert,
        newChat, setNewChat
    }

    useEffect(() => {
        window.ononline = () => setAlert((alerts) => [...alerts, alertMsgs('on-online')]) 
        window.onoffline = () => setAlert((alerts) => [...alerts, alertMsgs('on-offline')])
    }, [])


    return <_AppContext.Provider value={states}>
        {children}
    </_AppContext.Provider>
}