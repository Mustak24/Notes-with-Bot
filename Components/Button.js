

export function NormalBtn({children, className='', onClick=()=>{}, title=''}){
    return <button className={`${className} rounded-md opacity-80 hover:opacity-100 bg-[var(--bgSec)] px-4 h-9 text-sm font-semibold transition-all duration-200 flex items-center gap-1 cursor-pointer`}
        onClick={onClick}
    >
        {title}
        {children}
    </button>
}