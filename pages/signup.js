import { Input } from "@/Components/Input";
import { TypingHeading } from "@/Components/Heading";
import Button, { LongWidthBnt } from "@/Components/Button";
import Navabar from "@/Components/Navbar";
import themeChange from "@/Functions/themeChange";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import alertMsgs from "@/Functions/alertMsgs";
import { useRouter } from "next/router";
import { _AppContext } from "@/Contexts/AppContext";
import { verifyUserToken } from "@/Functions/Auth";

export default function(){

    const {setAlert} = useContext(_AppContext);

    const [isLoading, setLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(event){
        event.preventDefault();

        let formData = Object.fromEntries(new FormData(event.target));

        if(!window.navigator.onLine) return setAlert((alerts) => [...alerts, alertMsgs('no-internet')]);

        let res = await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/user/signup`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {'content-type': 'application/json'},
        })
        res = await res.json()

        if(!res.miss) return setAlert((alerts) => [...alerts, res.alert])

        setLoading(false);
        setAlert((alerts) => [...alerts, res.alert]);
        document.cookie = `user-token=${res.token}`
        return router.push('/');
    }


    return (<>
        <Navabar navigator="signup-page" themeChange={themeChange} />
        <main className="w-full h-full flex items-center flex-col justify-center p-5">
            <TypingHeading className="font-serif text-2xl my-5">- Sign Up Form -</TypingHeading>
            <form onSubmit={handleSubmit} className="flex items-center flex-col gap-4 max-w-[500px] w-full" >
                <Input required={true} minLength={2} name='username' placeholder="Enter Username" />
                <Input required={true} minLength={5} name='password' placeholder="Enter Password" type='password' />
                <div className="w-full">
                    <LongWidthBnt isLoading={isLoading} title='Sign Up' className='w-full max-md:hidden' />
                    <Button isLoading={isLoading} title='Sign Up' className='md:hidden w-full border-2' />
                </div>
                <div className="text-sm">Already on Bot ? <Link href={'/login'} className="text-blue-400 opacity-80 active:opacity-100 sm:hover:opacity-100">login</Link></div>
            </form>
        </main>
    </>)
}


export async function getServerSideProps({req}){
    const token = req.cookies['user-token']
    if(!token) return {props: {}}
    if(!(await verifyUserToken(token))) return {props: {}}
    return {
        redirect:{
            destination: '/'
        }
    }
}