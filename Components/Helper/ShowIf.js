import { createContext, useContext } from "react"

export const ShowContext = createContext();

export default function({children, when=true}){
    return <ShowContext.Provider value={{when}}>
        {when ? children : null} 
    </ShowContext.Provider>
}


export function ShowElse({children}){
    const {when} = useContext(ShowContext)
    return <>
        {when ? null : children}
    </>
}