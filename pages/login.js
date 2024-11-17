import { Input } from "@/Components/Input";
import { TypingHeading } from "@/Components/Heading";
import Button, { LongWidthBnt } from "@/Components/Button";
import Navabar from "@/Components/Navbar";
import themeChange from "@/Functions/themeChange";

export default function(){
    return (<>
        <Navabar navigator="login-page" themeChange={themeChange}/>
        <main className="w-full h-full flex items-center flex-col justify-center p-5">
            <TypingHeading text='- Login Form -' className="font-serif text-2xl my-5" />
            <form className="flex items-center flex-col gap-4 max-w-[1000px] w-full" >
                <Input placeholder="Enter Username" />
                <Input placeholder="Enter Password" type='password' />
                <div className="w-full">
                    <LongWidthBnt title='Login' className='w-full max-md:hidden' />
                    <Button title='Login' className='md:hidden w-full border-2' />
                </div>
            </form>
        </main>
    </>)
}