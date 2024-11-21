import { TypingHeading } from "@/Components/Heading";
import Navabar from "@/Components/Navbar"
import { _AppContext } from "@/Contexts/AppContext";
import themeChange from "@/Functions/themeChange"
import { useRouter } from "next/router";

export default function({isLogin=false}){


    return(<>
        <Navabar isLogin={isLogin} themeChange={themeChange}/>      
        <main className="w-full h-full flex items-center flex-col justify-center p-5">
            <TypingHeading className="text-2xl font-serif">- Documentation -</TypingHeading>
        </main>
    </>)
}