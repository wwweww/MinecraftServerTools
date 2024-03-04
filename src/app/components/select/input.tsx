import React, {useRef} from "react";
import {InputProps} from "@/app/components/select/index";

const Input:React.FC<InputProps> = ({title, onChange, placeholder, className = "", defaultValue}) => {
    const inputElement = useRef<HTMLInputElement | null>(null);
    return (
        <div className={className}>
            <p className="text-[#d8d8d8]">{title}</p>
            <div className="flex border-2 border-[#202020] text-[#7d7d7d] relative rounded-xl py-2 px-4 gap-1">
                <input className="bg-transparent focus:outline-0 w-full"
                       placeholder={placeholder}
                       ref={inputElement}
                       onChange={() => {
                           onChange(inputElement.current!.value)
                       }}
                       defaultValue={defaultValue}
                       type="text"/>
            </div>
        </div>
    )
}

export default Input;