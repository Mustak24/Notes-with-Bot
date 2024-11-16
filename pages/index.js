
import { HoverBox, TypingHeading } from "@/Components/Smallcss"
import Textarea from "@/Components/Textarea"
import { useEffect, useState } from "react";
import { TbSend } from "react-icons/tb";


export default function Home() {

  const [heading, setHeading] = useState('')

  return <main className="flex items-center justify-center flex-col w-full h-full px-5 ">
    {/* <TypingHeading className="font-serif text-2xl text-center my-5" text="What Can I fix ?" /> */}
    <h1 className="font-serif text-2xl text-center my-5" >What Can I fix ?</h1>
    <Textarea className="max-w-[900px] gap-1">
      <HoverBox>
        <TbSend className="size-full" />
      </HoverBox>
    </Textarea>
  </main>
}
