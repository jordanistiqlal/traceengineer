import MainLayout from '@/Layouts/MainLayout';
import { Head, useForm } from "@inertiajs/react";

export default function Portal({errors}){
    return(
        <>
            <Head title='Portal Data'></Head>
        </>
    )
}

Portal.layout = page => <MainLayout children={page} sidebarData={[]} />;