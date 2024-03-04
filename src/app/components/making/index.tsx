'use client'
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPersonDigging} from "@fortawesome/free-solid-svg-icons";

const Making: React.FC = () => {
    return (
        <div className="h-full w-full flex items-center text-[#bebebe]/60 select-none scale-110">
            <div className="w-lvw text-center">
                <div className="text-5xl">
                    <FontAwesomeIcon icon={faPersonDigging}/>
                </div>
                <p className="text-2xl">Working</p>
            </div>
        </div>
    )
}

export default Making;