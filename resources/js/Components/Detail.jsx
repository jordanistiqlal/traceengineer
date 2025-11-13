import React, { useEffect, useState } from "react"
import { useData } from "../Contexts/DataContext";

const getHourUsed = (start_time, end_time) => {
    if(!start_time || start_time === "") return "";
    const start = new Date(start_time);
    if(isNaN(start)) return "";
    const end = end_time && end_time !== "" ? new Date(end_time) : new Date();
    if(isNaN(end)) return "";

    const diffMs = end - start;

    let seconds = Math.floor(diffMs / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    return `${hours}:${minutes}:${seconds}`;
}

export default function Detail({data}){
    const [Engineer, setEngineer] = useState([])
    const [detailData, setdetailData] = useState({
        name: "", phone: "", image: "", email: "", titik_koordinat: [], project: "", project_name: "", start_time: "", end_time: "",
    })
    const [now, setNow] = useState(Date.now());
    const {selectedData, setSelectedData} = useData()
    const [Visible, setVisible] = useState(false)
    const transitionAnimated = `transition-all duration-100 ease-in-out ${Visible ? 'opacity-100 scale-100' : 'opacity-0 scale-100'}`

    const detailUser = (data) => {
        if (data.name == detailData.name) return

        setVisible(false)

        setTimeout(() => {
            setSelectedData(data)
            setdetailData({
                name: data.name,
                phone: data.phone,
                image: data.image,
                email: data.email,
                titik_koordinat: data.titik_koordinat,
                project: data.project,
                project_name: data.project_name,
                start_time: data.start_time,
                end_time: data.end_time,
            })        

            setVisible(true)
        }, 300)

    }

    useEffect(() =>{
        setEngineer(data)

        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(interval);

    }, [])
    return(
        <>
            {/* DAFTAR ENGINEER */}
            <div className="h-[43vh] flex flex-col px-4">
                <div className="flex items-center justify-center gap-2 mb-5">
                    <span className="font-extrabold text-gray-700 uppercase">Daftar Engineer</span>
                </div>
                <div className="flex-1 overflow-y-auto overflow-hidden gap-5">
                    {Engineer.map((index, i) => (
                        <button 
                            key={i} 
                            onClick={() => detailUser(index)}
                            className={`group relative flex items-center gap-2 text-gray-600 font-bold w-full cursor-pointer hover:text-black transition-all duration-300 ease-in-out rounded-xl 
                            ${detailData.name == index.name 
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md translate-x-1' 
                                : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'}
                            `}
                        >
                            <img src={index.image ? index.image :"data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="} className="rounded-xl m-2" alt="image" height={50} width={50} />
                            {index.name}
                            <span
                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-md transition-all duration-300 
                                    ${detailData.name == index.name  ? "bg-blue-600 scale-y-100" : "bg-transparent scale-y-0 group-hover:bg-blue-300 group-hover:scale-y-100"}
                                `}
                            ></span>
                        </button>
                    ))}
                </div>
            </div>
            
            {/* INFORMASI */}
            <div className={`h-[43vh] px-4`}>
                <div className="flex items-center justify-center gap-2 mb-5">
                    <span className="font-extrabold text-gray-700 uppercase">Informasi</span>
                </div>
                <div className={`flex flex-1 my-5 gap-3 ${transitionAnimated}`}>
                    <img src={detailData.image ? detailData.image :"data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="} className="rounded-sm" alt={detailData.name} height={80} width={80}/>
                    <div>
                        <p className="text-lg">{detailData.name}</p>
                        <p className="text-sm mt-2">
                            {getHourUsed(detailData.start_time, detailData.end_time)}
                        </p>
                    </div>
                </div>
                <div>
                    <div className={`grid grid-cols-2 gap-4 ${transitionAnimated}`}>
                        <div className="font-bold">Name</div>
                        <div>{detailData.name}</div>
                        <div className="font-bold">No. Hp</div>
                        <div>{detailData.phone}</div>
                        <div className="font-bold">Project</div>
                        <div>{detailData.project}</div>
                        <div className="font-bold">Nama Project</div>
                        <div>{detailData.project_name}</div>
                        {/* <div className="font-bold">Waktu Penyelesaian</div>
                        <div>{detailData.start_time} - {detailData.end_time}</div> */}
                    </div>
                </div>
            </div>
        </>
    )
}