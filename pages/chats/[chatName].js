import { useRouter } from "next/router"

export default function(){
    const router = useRouter();
    return <main className="flex items-center justify-center flex-col w-full h-full px-5 ">
        {router.query.chatName}
    </main>
}