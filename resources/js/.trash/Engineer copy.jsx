import MainLayout from '@/Layouts/MainLayout';
import { Head, useForm } from "@inertiajs/react";
import Table from '@/Components/Table';
import Swal from 'sweetalert2';

function AddEngineer(){
    // Swal.fire({
    //         title: "Add Engineer",
    //         html: `
    //             <input id="name" class="swal2-input" placeholder="Engineer Name">
    //             <input id="position" class="swal2-input" placeholder="Position">
    //             <input id="email" class="swal2-input" placeholder="Email">
    //         `,
    //         focusConfirm: false,
    //         showCancelButton: true,
    //         confirmButtonText: "Add",
    //         cancelButtonText: "Cancel",
    //         width: "640px",
    //         customClass: {
    //             popup: "rounded-2xl shadow-xl",
    //         },
    //         preConfirm: () => {
    //             const name = document.getElementById("name").value;
    //             const position = document.getElementById("position").value;
    //             const email = document.getElementById("email").value;

    //             if (!name || !position || !email) {
    //             Swal.showValidationMessage("Please fill all fields!");
    //             return false;
    //         }

    //         return { name, position, email };
    //     },
    //     }).then((result) => {
    //     if (result.isConfirmed) {
    //         const { name, position, email } = result.value;
    //         console.log("New Engineer:", name, position, email);

    //         Swal.fire({
    //             icon: "success",
    //             title: "Engineer Added!",
    //             text: `${name} (${position}) has been added successfully.`,
    //             timer: 2000,
    //             showConfirmButton: false,
    //         });
    //     }
    // });
}

export default function Engineer({response= [],errors}){
    const EngineerData = response?.engineer
    const TaskData = response?.task
    const TicketData = response?.ticket

    const columnsEngineer = [
        { key: 'number', label: 'No', sortable: false, searchable: false, render: (item, index) => index + 1, title: "Engineer List"},
        { key: 'id', label: 'Id Engineer', sortable: false, searchable: false},
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

    const columnsTicket = [
        { key: 'number', label: 'No', sortable: false, searchable: false, render: (item, index) => index + 1, title: "Ticket List"},
        { key: 'id', label: 'Task', sortable: false, searchable: false},
        { key: 'site', label: 'Site', sortable: true, searchable: true},
        { key: 'problem', label: 'Problem', sortable: true, searchable: true},
        { key: 'tanggal', label: 'Tanggal', sortable: true, searchable: true},
        { key: 'jam', label: 'Jam', sortable: true, searchable: true},
        { key: 'from', label: 'From', sortable: true, searchable: true},
        { key: 'bodyrow', label: 'Body Row', sortable: true, searchable: true},
    ];

    return(
        <>
            <Head title='Engineer'></Head>

            {/* Engineer List */}
            {/* <div className="bg-white mb-5 rounded-2xl shadow-xl border border-gray-800/20 p-6 max-h-max h-[90vh] overflow-y-auto"> */}
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
                    <button type="button" onClick={AddEngineer} className="w-12 h-12 rounded-full text-xl font-extrabold shadow-2xl transform hover:scale-103 transition-all ease-in-out duration-300 tracking-wider bg-black text-white hover:bg-gray-700 ring-4 hover:ring-gray-400/50 p-2"> + </button>
                    <p className='text-2xl px-5 mt-2 font-extrabold'> Add Engineer </p>
                </div>
            </div>


            {/* Task List */}
            {/* <div className="bg-white mb-5 rounded-2xl shadow-xl border border-gray-800/20 p-6 max-h-max h-[90vh] overflow-y-auto"> */}
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
            </div>

            {/* Ticket List */}
            {/* <div className="bg-white mb-5 rounded-2xl shadow-xl border border-gray-800/20 p-6 max-h-max h-[90vh] overflow-y-auto"> */}
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
            </div>
        </>
    )
}

Engineer.layout = page => <MainLayout children={page} sidebarData={[]} />;