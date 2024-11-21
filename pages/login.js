import { Input } from "@/Components/Input";
import { TypingHeading } from "@/Components/Heading";
import Button, { LongWidthBnt } from "@/Components/Button";
import Navabar from "@/Components/Navbar";
import themeChange from "@/Functions/themeChange";
import Link from "next/link";
import { useContext, useState } from "react";
import alertMsgs from "@/Functions/alertMsgs";
import { _AppContext } from "@/Contexts/AppContext";
import { useRouter } from "next/router";
import { verifyUserToken } from "@/Functions/Auth";



export async function getServerSideProps({req}){
    const token = req.cookies['user-token']
    if(!token) return {props: {}}
    if(!(await verifyUserToken(token, req))) return {props: {}}
    return {
        redirect:{
            destination: '/'
        }
    }
}


export default function(){
    const {setAlert} = useContext(_AppContext);

    const [isLoading, setLoading] = useState(false)

    const router = useRouter()

    async function handleSubmit(e){
        e.preventDefault()

        let formData = Object.fromEntries(new FormData(e.target));

        if(!window.navigator.onLine) return setAlert((alerts) => [...alerts, alertMsgs('no-internet')]);

        setAlert((alerts) => [...alerts, alertMsgs('info-send')])

        let res = await fetch(`${window.location.origin}/api/user/login`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {'content-type': 'application/json'}
        });
        res = await res.json();
        
        setLoading(false);

        setAlert((alerts) => [...alerts, res.alert]);
        if(!res.miss) return ;
        document.cookie = `user-token=${res.token}`
        return router.push('/')
    }

    return (<>
        <Navabar navigator="login-page" themeChange={themeChange}/>
        <main className="w-full h-full flex items-center flex-col justify-center p-5">
            <TypingHeading className="font-serif text-2xl my-5">- Login Form -</TypingHeading>
            <form onSubmit={handleSubmit} className="flex items-center flex-col gap-4 max-w-[500px] w-full" >
                <Input required={true} minLength={2} name={'username'} placeholder="Enter Username" />
                <Input required={true} minLength={5} name={'password'} placeholder="Enter Password" type='password' />
                <div className="w-full">
                    <LongWidthBnt isLoading={isLoading} title='Login' className='w-full max-md:hidden' />
                    <Button isLoading={isLoading} title='Login' className='md:hidden w-full border-2' />
                </div>
                <Link href={'/froget-password'} className="text-red-400 opacity-80 active:opacity-100 sm:hover:opacity-100 text-sm">forget - password ? </Link>
                <div className="text-sm">New on Bot ? <Link href={'/signup'} className="text-blue-400 opacity-80 active:opacity-100 sm:hover:opacity-100">Sign-up</Link></div>
            </form>
        </main>
    </>)
}

