import { createContext, useContext } from "react"

export const ShowContext = createContext();

export default function ShowIf({children, when=true, showElse=null}){
    return <ShowContext.Provider value={{when}}>
        {when ? children : showElse}
    </ShowContext.Provider>
}

export function ShowElse({children}){
    const {when} = useContext(ShowContext)
    return <>
        {when ? null : children}
    </>
}