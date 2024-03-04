import React, {useState} from "react";
import Beginning from "@/app/tabs/server/components/beginning";

const Server: React.FC = () => {
    const [servers, setServers] = useState<string[]>([])

    return (
        <div className="w-full h-full">
            {servers.length !== 0 ? (<div></div>) : (<Beginning />)}
        </div>
    )
}

export default Server;