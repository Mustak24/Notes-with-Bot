import Link from "next/link"
import { useEffect, useState } from "react";
import { NormalBtn } from "./Button";
import { CgProfile } from "react-icons/cg";
import { UnderlineBox, Navicon, HoverBox } from "./Smallcss"
import Popover, {TargetBox} from '@/Components/Popover'
import { IoLogoGithub } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { TbBrandHeadlessui } from "react-icons/tb";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";



const navigation = {
    'user': [
        {title: 'Home', href: '/'},
        {title: 'Docs', href: '/docs'},
        {title: 'Notes', href: '/notes'},
        {title: 'Chats', href: '/chats'},
    ],
    'login-page': []
}

export default function Navabar({navigator='user', title='Chat-Bot', logo=<TbBrandHeadlessui className="size-full" />, darkMode=true, themeChange=()=>{}}){

    const [isDarkMode, setDarkMode] = useState(darkMode)
    const [isNavOpen, setNavOpen] = useState(false)

    function handleDarkMode(){
        themeChange(!isDarkMode);
        setDarkMode(!isDarkMode);
    }

    useEffect(() => {
        setDarkMode(window.matchMedia('(prefer-color-schema: dark)').matches)
    }, [])

    return <div className="sticky z-[500] top-0 w-full flex items-center justify-between px-5 h-16 font-sans text-sm shadow-[0_0_1px] backdrop-blur-sm bg-transparent">
        <div>
            {/* For Pc */}
            <div className="flex items-center gap-5 max-sm:hidden">
                <Link href={'/'} className="font-bold text-mg flex items-center gap-2 opacity-90 active:opacity-100 md:hover:opacity-100 transition-all cursor-pointer">
                    <div className="size-6 flex items-center justify-center"> {logo} </div>
                    <div className="pb-[1px] max-md:hidden">{title}</div>
                </Link>
                <div className="flex gap-2 font-semibold">
                    {navigation[navigator].map((element, index) => (<Link key={index} href={element.href} className="opacity-70 hover:opacity-100">
                        <UnderlineBox innerText={element.title} />
                    </Link>))}
                </div>
            </div>
            {/* For Mobile */}
            <button onClick={()=>setNavOpen(!isNavOpen)}  className="sm:hidden"><Navicon/></button>  

            <div className="flex items-end z-[-1] justify-center w-[100vw] h-[100vh] fixed left-0 transition-all duration-300 origin-center"
                style={{
                    opacity: isNavOpen ? '1' : '0',
                    visibility: isNavOpen ? 'visible' : 'hidden',
                    top: isNavOpen ? '0vh' : '100vh',
                    scale: isNavOpen ? '1' : '0'
                }}
            >
                <div className="relative flex flex-col items-start gap-3 w-full h-[70vh] rounded-lg border-[1px] border-[var(--bgSec)] after:content-[''] after:absolute after:top-3 after:w-[100px] after:border-2 after:border-[var(--bgSec)] after:self-center after:rounded-full pt-5 px-5">
                {navigation[navigator].map((element, index) => (<Link key={index} href={element.href} className="opacity-70 hover:opacity-100 font-semibold w-full">
                        <UnderlineBox className='' innerText={element.title} />
                    </Link>))}
                </div>
            </div>
        </div>
        
        <div className="flex gap-2">
            {navigator == 'user' && <>
                <NormalBtn className="max-sm:hidden"><span className="text-nowrap text-clip">Search Documentation ...</span></NormalBtn>
                <button><HoverBox className="sm:hidden"><IoSearchSharp className="size-full" /></HoverBox></button>
            </>}

            <Popover>
                <HoverBox><IoLogoGithub className="size-full" /></HoverBox>
                <TargetBox>Git-Hub</TargetBox>
            </Popover>

            <Popover>
                <HoverBox><CgProfile className="size-full" /></HoverBox>
                <TargetBox>
                    <Link href={'/login'} className="w-full h-full bg-[var(--text)] text-[var(--bg)] active:opacity-90 sm:hover:opacity-90 px-5 py-2 rounded-lg">Login</Link>
                </TargetBox>
            </Popover>

            {darkMode && <div onClick={handleDarkMode}>
            <Popover>
                <HoverBox>
                    {isDarkMode ? <MdOutlineLightMode className="size-full" /> : <MdOutlineDarkMode className="size-full" />}
                </HoverBox>
                <TargetBox className='right-4'>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</TargetBox>
            </Popover>
            </div>}

        </div>
    </div>
}