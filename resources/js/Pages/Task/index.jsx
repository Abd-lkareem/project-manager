import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head } from "@inertiajs/react";
import TaksTable  from "@/Components/TaksTable";


export default function Index({auth , Tasks , queryParams = null}){


    return (
        <Authenticated
        user={auth.user}
        header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Tasks
        </h2>}
        >
            <Head title="Tasks"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <TaksTable Tasks={Tasks} queryParams={queryParams} ></TaksTable>
                </div>
            </div>

        </Authenticated>
    )
}