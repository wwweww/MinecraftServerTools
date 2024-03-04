'use client'
import React, {useState} from "react";
import Header from "@/app/components/header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCode, faGear, faServer} from "@fortawesome/free-solid-svg-icons";
import Making from "@/app/components/making";
import {TabItem} from "@/app/types/propes"
import Server from "@/app/tabs/server";


type TabsProps = TabItem[]

const tabs: TabsProps = [
    {
        key: "Server",
        label: "Server",
        icon: faServer,
        children: <Server />
    },
    {
        key: "Setting",
        label: "Setting",
        icon: faGear,
        children: <Making />
    },
    {
        key: "Script",
        label: "Script",
        icon: faCode,
        children: <Making />
    },
]

export default function Home() {
    const [selector, setSelector] = useState<string | number>("Server");

    return (
        <main className="h-lvh bg-[#242424] overflow-hidden divide-y-2 divide-[#a47c85] text-white">
            <Header />
            <div className="h-[77%] bg-[#171717] flex">
                {tabs.map(i => i.key === selector ? (
                    <div className="h-full w-full" key={i.key}>
                        {i.children}
                    </div>
                ) : null)}
            </div>
            <div className="flex h-[13%] justify-center items-center gap-3">
                {tabs.map(i => (
                    <div
                        key={i.key}
                        className={"max-h-16  rounded-xl shadow-sm px-4 py-2 text-center cursor-pointer transform duration-300 " + (i.key === selector ? "bg-white/5  text-[#d9d9d9] scale-110" : "text-[#7f7f7f]")}
                        onClick={() => {
                            setSelector(i.key)
                        }}
                    >
                        <FontAwesomeIcon className="text-2xl" icon={i.icon}/>
                        <p className="select-none font-Rajdhani font-medium">{i.label}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
