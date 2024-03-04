import React, {useRef} from "react";
import {invoke} from "@tauri-apps/api";
import {once} from "@tauri-apps/api/event";
import {SelectProps} from "@/app/components/select/index";

const SelectFile:React.FC<SelectProps> = ({title, onChange, placeholder, icon, className = "", extensions, windowTitle}) => {
    const SelectFileInputElement = useRef<HTMLInputElement | null>(null);
    return (
        <div className={className}>
            <p className="text-[#d8d8d8]">{title}</p>
            <div className="flex border-2 border-[#202020] text-[#7d7d7d] relative rounded-xl py-2 px-4 gap-1">
                <input className="bg-transparent focus:outline-0 w-full"
                       placeholder={placeholder}
                       ref={SelectFileInputElement}
                       onChange={() => {
                           console.log(SelectFileInputElement.current!.value)
                           onChange(SelectFileInputElement.current!.value)
                       }}
                       type="text"/>
                <button
                    className="text-[#555555] shadow-sm"
                    onClick={() => {
                        invoke("plugin:file|open_file_dialog", {extensions: extensions, title: windowTitle}).then(res => {
                            once<string>("select-jar-file", (res) => {
                                // console.log(res.payload);
                                onChange(res.payload)
                                SelectFileInputElement.current!.value = res.payload
                            }).then()
                        })
                    }}>
                    {icon}
                </button>
            </div>
        </div>
    )
}

export default SelectFile;