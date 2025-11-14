import MainLayout from '@/Layouts/MainLayout';
import { Head, useForm } from "@inertiajs/react";
import Table from '@/Components/Table';
import Swal from 'sweetalert2';
import { useEffect, useRef, useState } from 'react';
import { formatPhone } from '@/Utils/Function';
import Plus from '@/Components/Plus';
import Select from 'react-select';

const columnsEngineer = [
    { key: 'number', label: 'No', sortable: false, searchable: false, render: (item, index) => index + 1, title: "Engineer List"},
    { key: 'user_id', label: 'Id Engineer', sortable: false, searchable: false},
    { key: 'name', label: 'Nama Engineer', sortable: true, searchable: true},
    { key: 'nohp', label: 'Nomor Phone', sortable: true, searchable: true},
    { key: 'email', label: 'Email', sortable: true, searchable: true},
];

const columnsTask = [
    { key: 'number', label: 'No', sortable: false, searchable: false, render: (item, index) => index + 1, title: "Task List"},
    { key: 'id', label: 'Id Task', sortable: false, searchable: false},
    { key: 'task', label: 'Task', sortable: true, searchable: true},
    { key: 'name', label: 'Nama Engineer', sortable: true, searchable: true},
    { key: 'nohp', label: 'Nomor Phone', sortable: true, searchable: true},
    { key: 'email', label: 'Email', sortable: true, searchable: true},
];

const projectOptions = [
    { value: 'project1', label: 'Project 1' },
    { value: 'project2', label: 'Project 2' },
    { value: 'project3', label: 'Project 3' }
];

export default function Engineer({response=[]}){
    const {data, setData, post, processing, reset, errors, clearErrors } = useForm({ name:"", nohp:"", email:"", password:"", role: ""})
    const [FormVisible, setFormVisible] = useState(false)
   
    const EngineerData = response?.engineers
    const TaskData = response?.tasks
    const [sectionForm, setsectionForm] = useState("")

    const handlePhoneChange = (e) => {
        const formatted = formatPhone(e.target.value);
        setData((prev) => ({ ...prev, nohp: formatted }));
    };

    const toogleSection = () => {
        reset()
        if(FormVisible){
            return setFormVisible(false)
        }
        return setFormVisible(true)
    }

    const addData = (section) => {
        setFormVisible(true)
        setsectionForm(section)
    }

    const handleSubmitEngineer = (e) =>{
        e.preventDefault()
        setData('role', 'ENGINEER');
        
        try {
            post(route('user.store'), {
                onSuccess: () =>{
                    Swal.fire({
                        title: "Created Succesfully",
                        icon: "success",
                        draggable: true
                    });

                    reset()
                },
                onError: (errors) =>{
                    const errorMessages = Object.values(errors).flat().join('\n');
                    
                    Swal.fire({
                        text: errorMessages,
                        icon: "error",
                        title: "Oops...",
                        confirmButtonText: 'Close'
                    })

                    reset('password')
                }
            })
        } catch (error) {
            Swal.fire({
                text: error,
                icon: "error",
                title: "Oops...",
            })
        }
    }
    const handleSubmitTask = (e) =>{
        e.preventDefault()
        
        try {
            setData('role', 'ENGINEER');
            post(route('task.store'), {
                onSuccess: () =>{
                    Swal.fire({
                        title: "Created Succesfully",
                        icon: "success",
                        draggable: true
                    });

                    reset()
                },
                onError: (errors) =>{
                    const errorMessages = Object.values(errors).flat().join('\n');
                    
                    Swal.fire({
                        text: errorMessages,
                        icon: "error",
                        title: "Oops...",
                        confirmButtonText: 'Close'
                    })

                    reset('password')
                }
            })
        } catch (error) {
            Swal.fire({
                text: error,
                icon: "error",
                title: "Oops...",
            })
        }
    }

    useEffect(() =>{
        const hasErrors = Object.keys(errors).length > 0;
        
        if(hasErrors){
            setTimeout(() => {
                clearErrors();
            }, 5000);
        }
        
    }, [errors])

    return(
        <>
            <Head title='Engineer'></Head>

            <div className={`${FormVisible && 'hidden'}`}>
                {/* Engineer List */}
                <div className="mb-5 p-6 border-b-2 border-gray-500/20 max-h-max h-[90vh] overflow-y-auto">
                    <Table 
                        data={EngineerData || []}
                        columns={columnsEngineer}
                        search={true}
                        sort={true}
                        pagination={true}
                        perPage={5}
                        perPageOptions={[5, 10, 25, 50, 100]}
                        searchPlaceholder="Search name or email..."
                        emptyMessage="No users available"
                    />
                    <div className="flex justify-start w-full px-2 mt-5">
                        <button type="button" onClick={() => (addData('engineer'))} className="w-12 h-12 rounded-full text-xl font-extrabold shadow-2xl transform hover:scale-103 transition-all ease-in-out duration-300 tracking-wider bg-black text-white hover:bg-gray-700 ring-4 hover:ring-gray-400/50 p-2"> <Plus/> </button>
                        <p className='text-2xl px-5 mt-2 font-extrabold'> Add Engineer </p>
                    </div>
                </div>

                {/* Task List */}
                <div className="mb-5 p-6 border-b-2 border-gray-500/20 max-h-max h-[90vh] overflow-y-auto">
                    <Table 
                        data={TaskData || []}
                        columns={columnsTask}
                        search={true}
                        sort={true}
                        pagination={true}
                        perPage={5}
                        perPageOptions={[5, 10, 25, 50, 100]}
                        searchPlaceholder="Search name or email..."
                        emptyMessage="No users available"
                    />
                    <div className="flex justify-start w-full px-2 mt-5">
                        <button type="button" onClick={() => (addData('task'))} className="w-12 h-12 rounded-full text-xl font-extrabold shadow-2xl transform hover:scale-103 transition-all ease-in-out duration-300 tracking-wider bg-black text-white hover:bg-gray-700 ring-4 hover:ring-gray-400/50 p-2"> <Plus/> </button>
                        <p className='text-2xl px-5 mt-2 font-extrabold'> Add Task </p>
                    </div>
                </div>
            </div>

            <div className={`h-full w-full px-2 mt-5 ${FormVisible & sectionForm == 'engineer' ? '': 'hidden'}`}>
                <div className="flex justify-between ">
                    <button type="button" onClick={toogleSection} className="w-[10%] h-10 rounded-4xl text-xl font-extrabold transform hover:scale-103 transition-all ease-in-out duration-300 tracking-wider bg-black text-white hover:bg-gray-700 ring-4 hover:ring-gray-400/50">Back</button>

                    <button type="submit" onClick={handleSubmitEngineer} className="w-[10%] h-10 rounded-4xl text-xl font-extrabold transform hover:scale-103 transition-all ease-in-out duration-300 tracking-wider bg-[#9AB78F] text-white hover:bg-[#8BA67E] ring-4 hover:ring-green-100/50">
                        <span className="">
                            {processing ? 'Loading...' : 'Add'}
                        </span>
                    </button>
                </div>

                <h1 className='pt-5 text-4xl font-semibold'>Add Engineer</h1>
                <form className='mt-10 w-[70%]'>
                    <div className="p-2 flex items-center"> 
                        <label htmlFor="name" className="w-55 text-sm font-medium text-gray-700" > Name </label> 
                        <div className="flex-1 flex flex-col">
                            <input type="text" name="name" id="name" placeholder="Joko W." className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={data.name} onChange={(e) => setData('name', e.target.value)}/>
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>
                    </div>

                    <div className="p-2 flex items-center"> 
                        <label htmlFor="nohp" className="w-55 text-sm font-medium text-gray-700" > No Handphone </label>

                        <div className="flex-1 flex flex-col">
                            <input type="text" name="nohp" id="nohp" placeholder="0000-0000-0000"className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={handlePhoneChange} onKeyDown={(e) => { if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") e.preventDefault(); }} value={data.nohp} />
                            {errors.nohp && <span className="text-red-500 text-sm">{errors.nohp}</span>}
                        </div>
                    </div>

                    <div className="p-2 flex items-center"> 
                        <label htmlFor="email" className="w-55 text-sm font-medium text-gray-700" > Email </label> 

                        <div className="flex-1 flex flex-col">
                            <input type="email" name="email" id="email" placeholder="jowikododo45@gmail.com" className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={data.email} onChange={(e) => setData('email', e.target.value)}/>
                            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                        </div>
                    </div>

                    <div className="p-2 flex items-center"> 
                        <label htmlFor="password" className="w-55 text-sm font-medium text-gray-700" > Password </label> 
                        <div className="flex-1 flex flex-col">
                            <input type="password" name="password" id="password" placeholder="⦁⦁⦁⦁⦁" className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={data.password} onChange={(e) => setData('password', e.target.value)}/> 
                            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                        </div>
                    </div>

                    <button type="submit" onClick={handleSubmitEngineer} className="w-[10%] h-10 rounded-4xl text-xl font-extrabold transform hover:scale-103 transition-all ease-in-out duration-300 tracking-wider bg-[#9AB78F] text-white hover:bg-[#8BA67E] ring-4 hover:ring-green-100/50 hidden">
                        <span className="">
                            {processing ? 'Loading...' : 'Add'}
                        </span>
                    </button>
                </form>
            </div>

            <div className={`${FormVisible & sectionForm == 'task'  ? '': 'hidden'}`}>
                <div className="flex justify-between ">
                    <button type="button" onClick={toogleSection} className="w-[10%] h-10 rounded-4xl text-xl font-extrabold transform hover:scale-103 transition-all ease-in-out duration-300 tracking-wider bg-black text-white hover:bg-gray-700 ring-4 hover:ring-gray-400/50">Back</button>

                    <button type="submit" onClick={handleSubmitTask} className="w-[10%] h-10 rounded-4xl text-xl font-extrabold transform hover:scale-103 transition-all ease-in-out duration-300 tracking-wider bg-[#9AB78F] text-white hover:bg-[#8BA67E] ring-4 hover:ring-green-100/50">
                        <span className="">
                            {processing ? 'Loading...' : 'Add'}
                        </span>
                    </button>
                </div>
                <h1 className='pt-5 text-4xl font-semibold'>Add Task for Engineer</h1>
                <form className='mt-10 w-[70%]'>

                    <div className="p-2 flex items-center"> 
                        <label htmlFor="name" className="w-55 text-sm font-medium text-gray-700" > Nama Task </label> 
                        <div className="flex-1 flex flex-col">
                            <input type="text" name="name" id="name" placeholder="Project Name" className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={data.name} onChange={(e) => setData('name', e.target.value)}/>
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>
                    </div>
                    
                    {/* Task Input */}
                    <div className="p-2 flex items-center"> 
                        <label htmlFor="name" className="w-55 text-sm font-medium text-gray-700" > Tipe Task </label> 
                        <div className="flex-1 flex flex-col">
                            <Select
                                id="name" name="name" placeholder="Select Task"
                                value={projectOptions.find(option => option.value === data.name)}
                                onChange={(selectedOption) => setData('name', selectedOption?.value || '')}
                                options={projectOptions}
                                className="flex-1"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        borderColor: '#d1d5db',
                                        boxShadow: 'none',
                                        '&:hover': { borderColor: '#d1d5db' }
                                    })
                                }}
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>
                    </div>

                    {/* Project Input */}
                    <div className="p-2 flex items-center"> 
                        <label htmlFor="name" className="w-55 text-sm font-medium text-gray-700" > Project </label> 
                        <div className="flex-1 flex flex-col">
                            <Select
                                id="name" name="name" placeholder="Select Project"
                                value={projectOptions.find(option => option.value === data.name)}
                                onChange={(selectedOption) => setData('name', selectedOption?.value || '')}
                                options={projectOptions}
                                className="flex-1"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        borderColor: '#d1d5db',
                                        boxShadow: 'none',
                                        '&:hover': { borderColor: '#d1d5db' }
                                    })
                                }}
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>
                    </div>
                    
                    {/* Engineer Input */}
                    <div className="p-2 flex items-center"> 
                        <label htmlFor="name" className="w-55 text-sm font-medium text-gray-700" > Engineer </label> 
                        <div className="flex-1 flex flex-col">
                            <Select
                                id="name" name="name" placeholder="Select Engineer"
                                value={projectOptions.find(option => option.value === data.name)}
                                onChange={(selectedOption) => setData('name', selectedOption?.value || '')}
                                options={projectOptions}
                                className="flex-1"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        borderColor: '#d1d5db',
                                        boxShadow: 'none',
                                        '&:hover': { borderColor: '#d1d5db' }
                                    })
                                }}
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>
                    </div>

                    <button type="submit" onClick={handleSubmitTask} className="w-[10%] h-10 rounded-4xl text-xl font-extrabold transform hover:scale-103 transition-all ease-in-out duration-300 tracking-wider bg-[#9AB78F] text-white hover:bg-[#8BA67E] ring-4 hover:ring-green-100/50 hidden">
                        <span className="">
                            {processing ? 'Loading...' : 'Add'}
                        </span>
                    </button>
                </form>
            </div>
        </>
    )
}

Engineer.layout = page => <MainLayout children={page} sidebarData={[]} />;