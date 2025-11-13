import MainLayout from '@/Layouts/MainLayout';
import { Head, useForm, usePage } from "@inertiajs/react";
import Table from '@/Components/Table';
import Plus from '@/Components/Plus';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

const columnsTicket = [
    { key: 'number', label: 'No', sortable: false, searchable: false, render: (item, index) => index + 1, title: "Ticket List"},
    { key: 'id', label: 'Task', sortable: false, searchable: false},
    { key: 'site', label: 'Site', sortable: true, searchable: true},
    { key: 'problem', label: 'Problem', sortable: true, searchable: true},
    { key: 'tanggal', label: 'Tanggal', sortable: true, searchable: true},
    { key: 'jam', label: 'Jam', sortable: true, searchable: true},
    { key: 'from', label: 'From', sortable: true, searchable: true},
    { key: 'bodyraw', label: 'Body Raw', sortable: true, searchable: true},
];

export default function Maintanance({response=[]}){
    const {data, setData, post, processing, reset, errors, clearErrors } = useForm({ site:"", tanggal: ""})
    const TicketData = response?.tickets
    const [FormVisible, setFormVisible] = useState(false)
    const [sectionForm, setsectionForm] = useState("")
    const { props } = usePage();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

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

    const handleSubmit = (e) =>{
        e.preventDefault()      
    }

    return(
        <>
            <Head title='Maintanance Data'></Head>

            {/* Ticket List */}
            <div className={`${FormVisible && 'hidden'}`}>
                <div className="mb-5 p-6 border-b-2 border-gray-500/20 max-h-max h-[90vh] overflow-y-auto">
                    <Table 
                        data={TicketData || []}
                        columns={columnsTicket}
                        search={true}
                        sort={true}
                        pagination={true}
                        perPage={5}
                        perPageOptions={[5, 10, 25, 50, 100]}
                        searchPlaceholder="Search name or email..."
                        emptyMessage="No users available"
                    />

                    <div className="flex justify-start w-full px-2 mt-5">
                        <button type="button" onClick={() => (addData('ticket'))} className="w-12 h-12 rounded-full text-xl font-extrabold shadow-2xl transform hover:scale-103 transition-all ease-in-out duration-300 tracking-wider bg-black text-white hover:bg-gray-700 ring-4 hover:ring-gray-400/50 p-2"> <Plus/> </button>
                        <p className='text-2xl px-5 mt-2 font-extrabold'> Add Ticket </p>
                    </div>
                </div>
            </div>

            <div className={`${FormVisible & sectionForm == 'ticket'  ? '': 'hidden'}`}>
                <div className="flex justify-between ">
                    <button type="button" onClick={toogleSection} className="w-[10%] h-10 rounded-4xl text-xl font-extrabold transform hover:scale-103 transition-all ease-in-out duration-300 tracking-wider bg-black text-white hover:bg-gray-700 ring-4 hover:ring-gray-400/50">Back</button>

                    {/* <button type="submit" onClick={handleSubmit} className="w-[10%] h-10 rounded-4xl text-xl font-extrabold transform hover:scale-103 transition-all ease-in-out duration-300 tracking-wider bg-[#9AB78F] text-white hover:bg-[#8BA67E] ring-4 hover:ring-green-100/50">
                        <span className="">
                            {processing ? 'Loading...' : 'Add'}
                        </span>
                    </button> */}
                </div>

                <h1 className='text-4xl font-bold pt-5'> Add Engineer</h1>
                <form className='w-full mt-10'>
                    <div className="p-2 flex items-center"> 
                        <label htmlFor="site" className="w-55 text-sm font-medium text-gray-700" >Site</label> 
                        <div className="flex-1 flex flex-col">
                            <input type="text" name="site" id="site" placeholder="Site" className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            {errors.site && <span className="text-red-500 text-sm">{errors.site}</span>}
                        </div>
                    </div>

                    <div className="p-2 flex items-center"> 
                        <label htmlFor="tanggal" className="w-55 text-sm font-medium text-gray-700" >Tanggal</label> 
                        <div className="flex-1 flex flex-col">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="00/00/0000"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                                id="tanggal"
                                name="tanggal"
                                popperPlacement="bottom-start"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                yearDropdownItemNumber={50}
                                scrollableYearDropdown
                            />
                            {errors.tanggal && <span className="text-red-500 text-sm">{errors.tanggal}</span>}
                        </div>
                    </div>

                    <div className="p-2 flex items-center"> 
                        <label htmlFor="jam" className="w-55 text-sm font-medium text-gray-700" >Jam</label> 
                        <div className="flex-1 flex flex-col">
                            <DatePicker
                                selected={selectedTime}
                                onChange={(time) => setSelectedTime(time)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Waktu"
                                dateFormat="HH:mm:ss"
                                placeholderText="00:00:00"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                                id="jam"
                                name="jam"
                                popperPlacement="bottom-start"
                            />
                            {errors.jam && <span className="text-red-500 text-sm">{errors.jam}</span>}
                        </div>
                    </div>

                    <div className="p-2 flex items-center"> 
                        <label htmlFor="userInput" className="w-55 text-sm font-medium text-gray-700" >Dibuat Oleh</label> 
                        <div className="flex-1 flex flex-col">
                            <input type="text" name="userInput" id="userInput" placeholder="ADMIN" value={props.auth.user.username} className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-200" disabled={true}/>
                            <span className="text-gray-500 text-sm">Auto from user auth</span>
                            {errors.userInput && <span className="text-red-500 text-sm">{errors.userInput}</span>}
                        </div>
                    </div>

                    <div className="p-2 flex items-center"> 
                        <label htmlFor="problem" className="w-55 text-sm font-medium text-gray-700" >Problem</label> 
                        <div className="flex-1 flex flex-col">
                            <textarea name="problem" id="problem" placeholder="." className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            {errors.problem && <span className="text-red-500 text-sm">{errors.problem}</span>}
                        </div>
                    </div>

                    <div className="flex items-end justify-end mt-10">
                        <button type="submit" onClick={handleSubmit} className="w-[10%] h-10 rounded-4xl text-lg font-extrabold transform hover:scale-103 transition-all ease-in-out duration-300 tracking-wider bg-[#9AB78F] text-white hover:bg-[#8BA67E] ring-4 hover:ring-green-100/50">
                            <span className="">
                                {processing ? 'Loading...' : 'Add'}
                            </span>
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}

Maintanance.layout = page => <MainLayout children={page} sidebarData={[]} />;