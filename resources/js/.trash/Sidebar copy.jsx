import React, { useEffect, useState } from "react";
import Detail from "../Components/Detail";
import MasterData from "../Components/MasterData";
import { Link, usePage } from "@inertiajs/react";

export default function Sidebar({data}){
    const {url} = usePage()

    const [Menu] = useState([
        { icon: '', name: "Home", path: "/" },
        { icon: '', name: "Project", path: "/", submenu: [
            { icon: '', name: "Instalasi", path: "/" },
            { icon: '', name: "Maintanance", path: "/" },
        ] },
        { icon: '', name: "Engineer", path: "/" },
        { icon: '', name: "Master Data", path: "/", submenu:[
            { icon: '', name: "New Engineer", path: "/newengineer" },
            { icon: '', name: "User", path: "/user" },
            { icon: '', name: "Project", path: "/project" },
            { icon: '', name: "Ticket", path: "/ticket" },
        ] },
    ]);
    
    return (
        <>
            <aside className="w-15 bg-gradient-to-l from-gray-100 to-gray-300 p-2 flex flex-col gap-3 border-r-3 border-gray-200 z-10 transition-all duration-100 ease-in-out">
                <Link href={'/track'} className={`cursor-pointer pt-1 ${url.startsWith('/track') && 'bg-blue-500'} rounded-xl p-1 transition-all duration-300 ease-in-out`} title="Tracker">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill={`${url.startsWith('/track') ? 'white' : 'gray'}`}><path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/></svg>
                </Link>

                <Link href={'/masterdata/user'} className={`cursor-pointer bg-auto rounded-xl p-1 ${url.startsWith('/masterdata') && 'bg-blue-500'} transition-all duration-300 ease-in-out`} title="Master Data">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill={`${url.startsWith('/masterdata') ? 'white' : 'gray'}`}><path d="M352 224L352 320L480 320L480 224L352 224zM288 224L160 224L160 320L288 320L288 224zM96 384L96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 384zM480 384L352 384L352 480L480 480L480 384zM288 480L288 384L160 384L160 480L288 480z"/></svg>
                </Link>

                <Link href={'/'} className={`cursor-pointer bg-auto rounded-xl p-1 ${url == '/' && 'bg-blue-500'} transition-all duration-300 ease-in-out`} title="Dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill={`${url == '/' ? 'white' : 'gray'}`}><path d="M128 128C128 110.3 113.7 96 96 96C78.3 96 64 110.3 64 128L64 464C64 508.2 99.8 544 144 544L544 544C561.7 544 576 529.7 576 512C576 494.3 561.7 480 544 480L144 480C135.2 480 128 472.8 128 464L128 128zM534.6 214.6C547.1 202.1 547.1 181.8 534.6 169.3C522.1 156.8 501.8 156.8 489.3 169.3L384 274.7L326.6 217.4C314.1 204.9 293.8 204.9 281.3 217.4L185.3 313.4C172.8 325.9 172.8 346.2 185.3 358.7C197.8 371.2 218.1 371.2 230.6 358.7L304 285.3L361.4 342.7C373.9 355.2 394.2 355.2 406.7 342.7L534.7 214.7z"/></svg>
                </Link>
            </aside>
            <aside className={`w-90 bg-gray-100 py-4 flex flex-col border-r border-gray-300 z-10 transition-all duration-300 ease-in-out ${url != '/track' && 'hidden'}`}>
                {url == '/track' && <Detail data={data}></Detail>}
            </aside>

            {/* <div className="py-10 h-[90%]">
                <aside className={`rounded-r-4xl h-full w-90 bg-[#9AB78F] py-4 flex flex-col border-r border-gray-300 z-10 transition-all duration-300 ease-in-out ${url == '/track' && 'hidden'}`}>
                    {url.startsWith('/masterdata') && <MasterData></MasterData>}
                </aside>
            </div> */}
            <div className="py-10 h-[90%]">
                <aside className={`rounded-r-4xl h-full w-90 bg-[#9AB78F] py-4 flex flex-col border-r border-gray-300 z-10 transition-all duration-300 ease-in-out ${url == '/track' && 'hidden'}`}>
                    <div className="flex flex-col pt-10 overflow-x-auto scrollbar-hide overflow-auto">
                        {Menu.map((item, i) => {
                        const isActive = url.endsWith(item.path);
                        return (
                            <Link
                            key={i}
                            href={`${item.path}`}
                            className={`group relative flex w-3/4 md:w-2/3 lg:w-10/10 text-lg font-semibold rounded-sm transition-all duration-300 ease-in-out 
                                ${isActive
                                ? "bg-gradient-to-r from-amber-200 to-white shadow-md translate-x-1 text-black"
                                : "text-gray-600 hover:bg-amber-100 hover:text-gray-600 text-white"
                                } px-4 py-3 mb-2`}
                            >
                            <span className="flex-1">{item.name}</span>
                
                            {/* indicator animasi */}
                            <span
                                className={`absolute left-0 w-1 h-8 rounded-r-md transition-all duration-300 
                                ${isActive ? "bg-white scale-y-100" : "bg-transparent scale-y-0 group-hover:bg-yellow-300 group-hover:scale-y-100"}
                                `}
                            ></span>
                            </Link>
                        );
                        })}
                    </div>
                </aside>
            </div>
        </>
    )
}