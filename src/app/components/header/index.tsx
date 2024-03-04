'use client'
import React, {useEffect, useState} from "react";
import {WebviewWindow} from "@tauri-apps/api/window";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faXmark} from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
    const [appWindow, setAppWindow] = useState<WebviewWindow>()

    useEffect(() => {
        if (typeof window !== "undefined") {
            import("@tauri-apps/api/window").then(res => {
                setAppWindow(res.appWindow)
            })
        }
    }, []);

    const handleMouseDown = () => {
        appWindow?.startDragging().then(r => console.log("开始窗口移动"))
    }
    return (
        <div className="h-[10%] flex p-2 px-4 -z-0 relative select-none">
            <div className="z-0 h-full w-full absolute"
                 onMouseDown={handleMouseDown}
            />
            <div className="flex-1 flex items-center">
                <div className="font-Comfortaa text-2xl text-[#ce9aa5]">Minecra server</div>
            </div>
            <div className="flex items-center gap-4 pr-2 text-[#7f7f7f] z-20">
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        appWindow?.minimize().then(r => {
                            console.log("Minimize window");
                        })
                    }}
                ><FontAwesomeIcon className="text-2xl transform duration-100 hover:text-[#d6d7d7]" icon={faMinus}/></div>
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        console.log("Close app");
                        appWindow?.close()
                    }}
                ><FontAwesomeIcon className="text-2xl transform duration-100 hover:text-[#d6d7d7] -z-10" icon={faXmark}/></div>
            </div>
        </div>
    )
}

export default Header