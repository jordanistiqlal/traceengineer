import MainLayout from '@/Layouts/MainLayout';
import { Head, useForm } from "@inertiajs/react";

export default function Dashboard({errors}){
    return(
        <>
            <Head title='Home'></Head>
        </>
    )
}

Dashboard.layout = page => <MainLayout children={page} sidebarData={[]} />;