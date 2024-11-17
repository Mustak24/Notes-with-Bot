export function TypingHeading({text='', className='', speed=100}){
    return <>
        <style jsx>{`
            @keyframes animation-0-to-1-opacity-scale{
              0%{opacity: 0; scale: 0;}
              100%{opacity: 1; scale: 1;}
            }
        `}</style>
        <div className={`${className}`}>
            {text.split('').map((char, index) => <span key={index} className="opacity-0 scale-0 transition-all" style={{
                animation: 'animation-0-to-1-opacity-scale .1s forwards',
                animationDelay: `${index*100}ms`
            }}>{char}</span>)}
        </div>
    </> 
}