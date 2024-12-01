
import Navabar from "@/Components/Navbar"
import { _AppContext } from "@/Contexts/AppContext";

export default function({isLogin=false}){


    return(<>
        <Navabar isLogin={isLogin}/>      
        <main className="w-full h-full flex items-center flex-col p-5 relative gap-10">
            <div className="flex items-center justify-center">
            </div>
            <div className="max-w-[1000px]">
                <h1 className="font-serif text-xl my-5">Introduction :</h1>
                <p className="text-[var(--textSec)] text-sm text-pretty">A note management system integrated with a bot offers more than just a space to write and store notes. It acts as an intelligent assistant</p>

                <h1 className="font-serif text-xl mt-20 mb-5">Helping Users To :</h1>
                <ol className="text-sm text-[var(--textSec)] gap-5 flex flex-col">
                    <li>
                        <b>Organize notes: </b>
                        Automatically categorize and tag notes based on their content.
                    </li>
                    <li>
                        <b>Search efficiently: </b>
                        Use natural language queries to retrieve specific notes or information.
                    </li>
                    <li>
                        <b>Set reminders: </b>
                        Use natural language queries to retrieve specific notes or information.
                    </li>
                </ol>
            </div>
        </main>
    </>)
}