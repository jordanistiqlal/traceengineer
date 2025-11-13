import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Detail from "../Components/Detail";

import { Menu } from "@/Config/menuConfig"

export default function Sidebar({ data }) {
    const { url } = usePage();
    const [openSubmenu, setOpenSubmenu] = useState({});
    const visibleMenu = Menu.filter(item => item.visible !== false);

    const toggleSubmenu = (index) => {
        setOpenSubmenu((prev) => ({
        ...prev,
        [index]: !prev[index],
        }));
    };

    const isPathActive = (path) => {
        return url === path || url.startsWith(path + "/");
    };

    const hasActiveSubmenu = (submenu) => {
        return submenu?.some((sub) => isPathActive(sub.path));
    };

    return (
        <>

        {/* Detail Sidebar for Track Engineer */}
        <aside className={`w-90 bg-gray-100 py-4 flex flex-col border-r border-gray-300 z-10 transition-all duration-300 ease-in-out ${url != "/track" && "hidden"}`} >
            {url == "/track" && <Detail data={data}></Detail>}
        </aside>

        {/* Main Menu Sidebar */}
        <div className={`${url == "/track" && "hidden"}`}>
            <div className={`pt-25 h-[85vh] ${url == "/track" && "hidden"}`}>
                <aside className="rounded-r-4xl h-full w-90 bg-gradient-to-br from-[#9AB78F] to-[#8BA67E] py-4 flex flex-col border-r border-gray-300 shadow-lg z-10 transition-all duration-300 ease-in-out">
                <div className="flex flex-col pt-10 px-3 overflow-y-auto scrollbar-hide flex-1">
                    {visibleMenu.map((item, i) => {
                    const isActive = isPathActive(item.path);
                    const hasActiveChild = hasActiveSubmenu(item.submenu);
                    const isOpen = openSubmenu[i] || hasActiveChild;

                    return (
                        <div key={i} className="mb-2">
                        <div
                            className={`group relative flex items-center justify-between w-full text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out cursor-pointer
                            ${
                                isActive || hasActiveChild
                                ? "bg-gradient-to-r from-amber-100 to-white shadow-md text-gray-800"
                                : "text-white hover:bg-white/20 hover:shadow-sm"
                            } px-4 py-3`}
                            onClick={() =>
                            item.submenu
                                ? toggleSubmenu(i)
                                : (window.location.href = item.path)
                            }
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xl">
                                    <img className={`transition duration-200 
                                        ${ isActive || hasActiveChild ? 'invert' : '' }
                                    `} src={item.icon} height={25} width={25} />
                                </span>
                                <span className="flex-1">{item.name}</span>
                            </div>

                            {item.submenu && (
                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 transition-transform duration-300 ${ isOpen ? "rotate-180" : "" }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /> </svg>
                            )}

                            <span
                            className={`absolute left-0 w-1 h-8 rounded-r-md transition-all duration-300 
                                ${
                                isActive || hasActiveChild
                                    ? "bg-yellow-300 scale-y-100"
                                    : "bg-transparent scale-y-0 group-hover:bg-yellow-300 group-hover:scale-y-100"
                                }`}
                            ></span>
                        </div>

                        {item.submenu && (
                            <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            }`}
                            >
                            <div className="ml-6 mt-1 space-y-1">
                                {item.submenu.map((subItem, j) => {
                                const isSubActive = isPathActive(subItem.path);
                                return (
                                    <Link
                                    key={j}
                                    href={subItem.path}
                                    className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-200 
                                        ${
                                        isSubActive
                                            ? "bg-white text-gray-800 shadow-sm"
                                            : "text-white/90 hover:bg-white/15 hover:text-white"
                                        }`}
                                    >
                                    <span className="text-lg">{subItem.icon}</span>
                                    <span>{subItem.name}</span>

                                    <span
                                        className={`absolute left-0 w-1 h-6 rounded-r-md transition-all duration-200 
                                        ${
                                            isSubActive
                                            ? "bg-yellow-300"
                                            : "bg-transparent group-hover:bg-yellow-300/50"
                                        }`}
                                    ></span>
                                    </Link>
                                );
                                })}
                            </div>
                            </div>
                        )}
                        </div>
                    );
                    })}
                </div>
                </aside>
            </div>
        </div>

        <div className="absolute bg-[#D9D9D9] h-20 w-90 bottom-0 left-0 rounded-tr-4xl">
            
        </div>
        </>
    );
}