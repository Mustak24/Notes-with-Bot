import { createContext, useContext, useState } from "react";

export const PopoverContext = createContext();

export default function ({className="", children}) {
  const [isHover, setHover] = useState(false);

  const states = { isHover };

  return (
    <PopoverContext.Provider value={states}>
      <div
        className={`${className} flex items-center justify-center relative flex-col  after:constent-[''] after:absolute after:bg-transparent after:w-full after:h-2 after:top-full`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export function TargetBoxInHover({ children, className }) {
  const { isHover } = useContext(PopoverContext);
  return (
    <div
      className={`${className} whitespace-nowrap flex items-center justify-center absolute transition-all duration-200 top-full bg-[var(--bgSec)] p-2 px-4 rounded-lg`}
      style={{
        scale: isHover ? "1" : ".8",
        opacity: isHover ? "1" : "0",
        visibility: isHover ? "visible" : "hidden",
      }}
    >
      {children}
    </div>
  );
}

