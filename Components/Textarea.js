export default function({name=null, placeholder='Enter Text ...', required=false, afterTextarea='', beforeTextarea='', className='', children, onChange=()=>{}, value }){
    return (<>
        <div className={`${className} border-2 has-[.textarea:invalid:not(:placeholder-shown)]:border-red-500 has-[.textarea:valid:not(:placeholder-shown)]:border-green-500 border-[var(--text)] relative has-[.textarea:focus]:border-sky-500 overflow-hidden min-w-[200px] w-full h-16 px-5 py-1 flex items-center`}>
            {beforeTextarea}
            <textarea
                name={name}
                placeholder={placeholder}
                required={required}
                value={value}
                className="textarea bg-transparent font-[700] placeholder:font-[500] placeholder:opacity-75 placeholder:text-[var(--text)] text-sm w-full h-full outline-none resize-none"
                style={{ scrollbarWidth: "none" }}
                onChange={onChange}
            ></textarea>
            {afterTextarea}
            {children}
        </div>
    </>)
}