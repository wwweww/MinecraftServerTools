'use client'
import {invoke} from "@tauri-apps/api";
import React, {useEffect, useState} from "react";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SelectFile from "@/app/components/select/selectFile";
import Input from "@/app/components/select/input";

const ImportPage = () => {
    return (
        <div className="flex flex-col w-full items-center gap-4 py-6">
            <Input
                className="w-80"
                title="服务器名称"
                onChange={(value) => {
                    console.log(value);
                }}
                placeholder={"服务器名称"}/>
            <SelectFile
                className="w-80"
                title="选择服务端"
                onChange={(val) => {
                    console.log("Test", val);
                }}
                placeholder="选择服务端"
                extensions={["jar", "jre"]}
                windowTitle="选择服务端"
                icon={<FontAwesomeIcon icon={faFolderOpen}/>}/>
            <div className="box-border w-80 flex gap-2">
                <Input className="" title="最大内存(MB)" onChange={()=>{}} placeholder="单位是Mb哦" defaultValue="1024"/>
                <Input title="最小内存(MB)" onChange={()=>{}} placeholder="单位是Mb哦" defaultValue="4096"/>
            </div>

            <Input
                className="w-80"
                title="更多启动参数"
                onChange={(value) => {
                    console.log(value);
                }}
                placeholder={"不填则没有"}/>
            <SelectFile
                className="w-80"
                title="Java文件选择"
                onChange={()=>{}} placeholder={"不填则使用全局配置"}
                extensions={["exe"]}
                windowTitle="选择Java"
                icon={<FontAwesomeIcon icon={faFolderOpen}/>} />
            <button
                className="w-80 rounded-xl border-2 text-[#7d7d7d] border-[#202020] py-2 hover:border-[#343434] hover:shadow-xl hover:text-[#e8e8e8]"
            >
                导入
            </button>
        </div>
    )
}

const Newly = () => {
    const [disks, setDisks] = useState<string[]>([])
    const [paths, setPaths] = useState<string[]>([])
    const [disk, setDisk] = useState<string>("")
    const [currentPath, setCurrentPath] = useState<string>("")

    useEffect(() => {
        invoke<string[]>("plugin:file|get_drives").then(res => {
            setDisks(res)
            setDisk(res[0])
        })
    }, []);

    useEffect(() => {
        invoke<string[]>("plugin:file|get_files", {path: disk}).then(res => {
            setPaths(res)
        })
    }, [disk]);


    useEffect(() => {
        invoke<string[]>("plugin:file|get_files", {path: currentPath}).then(res => {
            setPaths(res)
        })
    }, [currentPath]);

    const select_file = (key: number) => {
        setCurrentPath(paths[key])
        console.log(currentPath);
    }

    const backref = () => {
        let idx = currentPath.slice(0, currentPath.length - 1).lastIndexOf("\\")
        if (idx > 0) {
            setCurrentPath(currentPath.slice(0, idx + 1))
        }
    }

    return (
        <div className="h-full w-full flex items-center justify-around gap-10 p-10">
            <div
                className="basis-1/2 h-5/6 rounded-xl shadow-sm shadow-black  divide-y-2 divide-[#a47c85] border-[#232323] border bg-[#1c1c1c] overflow-y-hidden">
                <header
                    className="top-0 w-full bg-[#242424] h-[10%] rounded-t-xl px-3 flex items-center text-[#e3e3e3]">
                    <div className="flex-1">选择路径</div>
                    <div>{currentPath}</div>
                </header>
                <div>
                    <div
                        className="flex items-center text-[#787878] py-2 text-sm border-2 border-[#212121] m-2 rounded-lg">
                        {disks.map((i, idx) => (
                            <div onClick={() => {
                                setDisk(i);
                                setCurrentPath(i)
                            }}
                                 className={"border-r border-[#323232] px-5 cursor-pointer " + (i === disk ? "text-[#c996a1]" : "")}
                                 key={idx}>
                                {i}
                            </div>
                        ))}
                    </div>
                    <div className="bar h-[16.7rem] overflow-x-hidden rounded-b-xl px-2 text-sm text-[#c7c7c7]">
                        <div className="cursor-pointer" onClick={backref}>
                            \..
                        </div>
                        {paths.map((e, idx) => (
                            <div
                                className="cursor-pointer py-1 px-2 hover:bg-white/5"
                                onClick={() => {
                                    select_file(idx)
                                }} key={idx}>
                                {e.slice(e.lastIndexOf("\\") + 1, e.length)}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div
                className="basis-1/2 h-5/6 rounded-xl shadow-sm shadow-black  divide-y-2 divide-[#a47c85] border-[#232323] border">
                <header
                    className="top-0 w-full bg-[#242424] h-[10%] rounded-t-xl px-3 flex items-center text-[#e3e3e3]">下载服务端
                </header>
                <div className="bg-[#1c1c1c] overflow-y-auto overflow-x-hidden"></div>
            </div>
        </div>
    )
}

type InitProps = {
    setSelector: any
}
const Init: React.FC<InitProps> = ({setSelector}) => {
    // invoke("plugin:file|open_file_dialog")
    return (
        <div className="h-full w-full">
            <div
                className="absolute top-0 left-0 right-0 p-8 text-5xl text-center pt-16 text-[#777777]">暂时还没有服务器呢，你选择
            </div>
            <div className="h-full w-full flex items-center justify-center gap-24 select-none">
                <button
                    onClick={() => {
                        setSelector("create")
                    }}
                    className="text-2xl bg-[#171717] p-3 text-[#777777] border-[#232323] border rounded-xl shadow-sm shadow-black transform duration-300 hover:p-4 hover:text-[#c3929c]">
                    创建服务器
                </button>
                <button
                    onClick={() => {
                        setSelector("import")
                    }}
                    className="text-2xl bg-[#171717] p-3 text-[#777777] border-[#232323] border rounded-xl shadow-sm shadow-black transform duration-300 hover:p-4 hover:text-[#c3929c]">
                    导入服务器
                </button>
            </div>
        </div>
    )
}

const Beginning = () => {
    const [selector, setSelector] = useState<string>("none")

    const GetPage = () => {
        if (selector === "none") {
            return <Init setSelector={setSelector}/>
        } else if (selector === "create") {
            return <Newly/>
        } else {
            return (
                <ImportPage/>
            )
        }
    }

    return (
        <div className="h-full w-full relative select-none">
            <GetPage/>
        </div>
    )
}

export default Beginning;