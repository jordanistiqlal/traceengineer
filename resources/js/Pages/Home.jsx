import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from "@inertiajs/react";
import MapImage from '@/Assets/img/map.png';
import { useEffect, useState } from 'react';

export default function Dashboard({response=[]}){
    const [totalEngineer, setTotalEngineer] = useState(0);
    const [activeEngineer, setActiveEngineer] = useState(0);
    const [ongoingProjects, setOngoingProjects] = useState(0);

    useEffect(() => {
        setTotalEngineer(response.total_engineers || 0);
        setActiveEngineer(response.active_engineers || 0);
        setOngoingProjects(response.ongoing_projects || 0);
    }, [totalEngineer, activeEngineer, ongoingProjects]);


    return(
        <>
            <Head title='Home'></Head>
            
            <div className='grid grid-cols-5 gap-2 max-w-5xl mx-auto my-10 text-white font-sans'>
                {/* Daftar Engineer Terdaftar */}
                <div className='h-[35vh] rounded-4xl bg-[#9AB78F] p-6 flex items-center justify-between col-span-2 hover:bg-[#8BA67E] cursor-pointer transition-all duration-300 ease-in-out overflow-auto scrollbar-hide'>
                    <div className='flex flex-col flex-1 w-full h-full m-2 items-center justify-center text-center'>
                        <h1 className='uppercase text-4xl font-normal mb-5'>total engineer terdaftar</h1>
                        <h1 className='uppercase text-6xl font-extrabold'>{totalEngineer}</h1>
                    </div>
                </div>

                {/* Total Engineer yang bekerja */}
                <div className='h-[35vh] rounded-4xl bg-[#9AB78F] p-6 flex items-center justify-between col-span-3 hover:bg-[#8BA67E] cursor-pointer transition-all duration-300 ease-in-out overflow-auto scrollbar-hide'>
                    <div className='flex w-full h-full m-5'>
                        <div className='mr-10'>
                            <img src={MapImage} alt="Map Image" className='w-100 h-full object-contain rounded-2xl'/>
                        </div>
                        <div className='mr-auto my-auto justify-center items-center'>
                            <h1 className='uppercase text-3xl font-bold mb-5'>total engineer yang bekerja</h1>
                            <h2 className='text-4xl font-extrabold mb-2'>{activeEngineer+'/'+totalEngineer}</h2>
                        </div>
                    </div>
                </div>

                {/* Mulai Lacak Engineer */}
                <a 
                    href={'/track'} 
                    target="_blank" 
                    className='h-[35vh] rounded-4xl bg-[#9AB78F] p-6 flex items-center justify-between col-span-3 hover:bg-[#8BA67E] cursor-pointer transition-all duration-300 ease-in-out overflow-auto scrollbar-hide'
                >
                    <div className='flex w-full h-full m-5'>
                        <div className='mr-auto my-auto justify-center items-center'>
                            <h2 className='text-4xl font-extrabold mb-2'>Mulai Lacak Engineer</h2>
                        </div>
                        <div className='ml-4'>
                            <img src={MapImage} alt="Map Image" className='w-full h-full object-contain rounded-2xl'/>
                        </div>
                    </div>
                </a>

                {/* Project Berjalan */}
                <div className='h-[35vh] rounded-4xl bg-[#9AB78F] p-6 flex items-center justify-between col-span-2 hover:bg-[#8BA67E] cursor-pointer transition-all duration-300 ease-in-out overflow-auto scrollbar-hide'>
                    <div className='flex w-full h-full mx-1 items-center justify-center'>
                        <h1 className='uppercase text-4xl font-bold'>project berjalan</h1>
                        <h1 className='uppercase text-6xl font-extrabold mr-5'>{ongoingProjects}</h1>
                    </div>
                </div>
            </div>

        </>
    )
}

Dashboard.layout = page => <MainLayout children={page} sidebarData={[]} />;