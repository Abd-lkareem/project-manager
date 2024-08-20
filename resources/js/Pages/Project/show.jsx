import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head } from "@inertiajs/react";
import {PROJECT_STATUS_TEXT_MAP  , PROJECT_STATUS_CLASS_MAP}  from "@/constants.jsx";
import TaksTable  from "@/Components/TaksTable";


export default function show({auth , project  , tasks , queryParams = null}){
    
    return (
        <Authenticated
        user={auth.user}
        header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
           project :  <span>{project.name}</span>
        </h2>}
        >
            <Head title={"Project : " + project.name}/>
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div>
                                <img src={project.image_path} alt="project Image" 
                                    className="w-full h-64 object-cover "/> 
                            </div>

                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">

                                <div className="grid gap-1 grid-cols-2 mt-4">
                                     
                                    <div>
                                        <div>
                                            <label className="font-bold text-lg" >Project Id</label>
                                            <p className="text-gray-300" >{project.id}</p>
                                        </div>
                                        
                                        <div className="mt-4">
                                            <label className="font-bold text-lg" >Project Name</label>
                                            <p className="text-gray-300" >{project.name}</p>
                                        </div>

                                        <div className="mt-4">
                                            <label className="font-bold text-lg" >Project Status</label>
                                            <p className="mt-2">
                                                <span className={"rounded text-white py-2 px-2 " + PROJECT_STATUS_CLASS_MAP[project.status]}>{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <label className="font-bold text-lg" >Created By</label>
                                            <p className="text-gray-300" >{project.created_by.name}</p>
                                        </div>
                                        

                                        

                                    </div>

                                    <div>
                                        <div className="mt-4">
                                            <label className="font-bold text-lg" >Created At</label>
                                            <p className="text-gray-300 no-wrap" >{project.created_at}</p>
                                        </div>

                                        <div className="mt-4">
                                            <label className="font-bold text-lg" >Due date</label>
                                            <p className="text-gray-300 no-wrap" >{project.due_date}</p>
                                        </div>

                                        <div className="mt-4">
                                            <label className="font-bold text-lg" >Updated By</label>
                                            <p className="text-gray-300 no-wrap" >{project.updated_by.name}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                        <label className="font-bold text-lg" >Description</label>
                                        <p className="text-gray-300 no-wrap" >{project.description}</p>
                                </div>

                                
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TaksTable hideProjectNameColumn={true} Tasks={tasks} queryParams={queryParams} ></TaksTable>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
