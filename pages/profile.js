import { TypingHeading } from "@/Components/Heading";
import Navabar from "@/Components/Navbar";
import { _AppContext } from "@/Contexts/AppContext";
import { verifyUserToken } from "@/Functions/Auth";


export async function getServerSideProps({req}) {
    const token = req.cookies['user-token']
    if(!(token && (await verifyUserToken(token, req)))) return { redirect: { destination: '/login' } }
    return {props: {}}
}

export default function({}){

    return(<>
        <Navabar isLogin={true} />
        <TypingHeading className="text-center text-2xl font-serif my-5">- Hello -</TypingHeading>
        <main className="w-full h-full flex flex-col items-center gap-10 p-5 relative">

        </main>
    </>)
}


