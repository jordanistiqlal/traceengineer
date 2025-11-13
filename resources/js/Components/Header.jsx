import Logo from "@/Assets/img/logo.png"
import PersonalIcon from "@/Assets/icons/personal-icon.png"
import MenuIcon from "@/Assets/icons/menu-icon.png"
import { usePage } from "@inertiajs/react"
import { getActiveMenu } from "@/Config/menuConfig"

export default function Header({data}){
    const { url, props } = usePage();
    const activeMenu = getActiveMenu(url);

    return (
        <>
           <header className="absolute top-0 left-0 w-full h-[95px] bg-white z-0">
                <div className="flex flex-1 pt-3">

                    {/* Icon */}
                    <div className="px-11 lg:w-[25%] md:w-[40%]">
                        <img className="h-[77px] w-[100px]" src={Logo} alt="Logo" />
                    </div>
                    
                    {/* Menu Section */}
                    <div className="lg:w-[60%] md:w-[35%] flex items-center px-6">
                        <div className="flex items-center gap-4">
                            
                            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                                <img src={activeMenu.icon} alt={activeMenu.name} className="w-8 h-8 brightness-0" />
                            </div>
                            
                            <div className="flex flex-col uppercase">
                                {activeMenu.isSubmenu ? ( <> <span className="text-black/80 text-xs font-medium uppercase tracking-wider"> {activeMenu.parentName} </span> <span className="text-black text-2xl font-bold"> {activeMenu.name} </span> </> ) : ( <span className="text-black text-2xl font-bold"> {activeMenu.name} </span> )}
                            </div>
                            
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="lg:w-[25%] md:w-[25%] flex justify-end items-center p-4 gap-2">
                        <button className="flex items-center gap-2 border border-[#9AB78F] text-black px-4 py-1.5 rounded-full bg-white hover:bg-green-50 transition-all duration-200 cursor-pointer">
                            <span className="text-sm font-medium uppercase">{props.auth.user.username}</span>
                            <img src={PersonalIcon} alt="profile" className="w-5 h-5" />
                        </button>
                        <button className="flex items-center py-1.5 px-3 transition-all duration-200 cursor-pointer">
                            <img src={MenuIcon} alt="menu" className="w-5 h-5 cursor-pointer"/>
                        </button>
                    </div>
                </div>
           </header>
        </>
    )
}