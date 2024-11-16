
import { HoverBox, TypingHeading } from "@/Components/Smallcss"
import Textarea from "@/Components/Textarea"
import { useState } from "react";
import { TbSend } from "react-icons/tb";
import Link from "next/link";


export default function Home() {

  const [msg, setMsg] = useState('')

  return <main className="flex items-center justify-center flex-col w-full h-full px-5 ">
    <TypingHeading className="font-serif text-2xl text-center my-5" text="What Can I fix ... ?" speed={150} />
    <Textarea onChange={(e)=>setMsg(e.target.value)} className="max-w-[900px] gap-1">
      <Link href={{pathname:'/chats/new', query:{msg}}}>
        <HoverBox><TbSend className="size-full" /></HoverBox>
      </Link>
    </Textarea>
  </main>
}
