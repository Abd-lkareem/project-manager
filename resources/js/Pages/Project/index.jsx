import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head , Link , router } from "@inertiajs/react";
import { forwardRef, useEffect, useRef } from 'react';

import Pagination  from "@/Components/pagination";
import TableHeading  from "@/Components/TableHeading";
import TextInput  from "@/Components/TextInput";
import SelectedInput  from "@/Components/SelectedInput";
import {PROJECT_STATUS_TEXT_MAP ,PROJECT_STATUS , PROJECT_STATUS_CLASS_MAP}  from "@/constants.jsx";

export default function Index({auth , projects  , result ,  queryParams = null}){
    queryParams = queryParams || {};


    useEffect (() => {
        setTimeout(function(){
            document.getElementById("message").style.display = "none"; 
           }, 3000);


    })

    const serachFeildChange =(fieldName , value) => {
        if(value)
            queryParams[fieldName] = value;    
        else
            delete queryParams[fieldName];    


        router.get(route('projects.index') , queryParams)        
    }

    const onKeyPress = (fieldName , e)=>{
        if(e.key !== 'Enter') return ;

        serachFeildChange (fieldName , e.target.value);
    }

    const changeSort = (fieldName , e)=>{

        if(fieldName == queryParams.sort_feild) {
            if(queryParams.sort_direction == 'desc')
            {  
                queryParams.sort_direction = 'asc';
            }
            else
            {
                queryParams.sort_direction = 'desc';
            }
        }   
            
        else
        {
            queryParams.sort_feild = fieldName;
            queryParams.sort_direction = 'desc';
        }
        
        router.get(route('projects.index') , queryParams)        

    }

    const DeleteProject = (project , e)=>{
        if(!window.confirm('are you sure ?'))
            return ;
        
        router.delete(route('projects.destroy' , project.id ))
    }

    
    return (
        <Authenticated
        user={auth.user}
        header={
        <div className="flex justify-between ">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Projects
            </h2>

            <Link href={route('projects.create')} className="bg-emerald-500 py-2 px-6
             rounded shadow transition-all  text-white hover:bg-emerald-600">
            Add New 
            </Link>
        </div>
        }
        >
            <Head title="Projects"/>

            <div className="py-12" >
                <div className="max-w-7xl  mx-auto sm:px-6 lg:px-8">
                {result && <div  id="message" style={{ margin : 'auto', marginBottom : 20, width : '50%'}} className={" text-center rounded py-5 mb-5 px-4 text-white " + (result['status'] ? "bg-emerald-500 " : "bg-red-400 ") }>{result['message']}</div>
                }


                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">    
                        <div className="p-6 text-gray-900 dark:text-gray-100">   
                            <div className="overflow-auto">
                                <table className = "w-full text-sm text-left rtl:text-right text-gray-400 dark:text-gray-300 ">
                                    
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 
                                        dark:text-gray-300 border-b-2 border-gray-500"
                                        >
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-2">
                                                <TextInput defaultValue={queryParams.name} className="w-full" placeholder="Project Name" 
                                                onBlur={e => serachFeildChange('name' , e.target.value)}
                                                onKeyPress={e => onKeyPress('name' , e)}
                                                />
                                            </th>
                                            <th className="px-3 py-2">
                                                <SelectedInput defaultValue={queryParams.status} className="w-full" children={PROJECT_STATUS}
                                            onChange={e=>serachFeildChange('status' , e.target.value)}
                                            />
                                            </th>
                                            <th className="px-3 py-2"> </th>
                                            <th className="px-3 py-2"> </th>
                                            <th className="px-3 py-2"> </th>
                                            <th className="px-3 py-2"></th>
                                        </tr>
                                    </thead>

                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 
                                        dark:text-gray-300 border-b-2 border-gray-500"
                                        >
                                        <tr className="text-nowrap">
                                            <TableHeading name ="id" chengeMethod={changeSort} sort_feild={queryParams.sort_feild} sort_direction={queryParams.sort_direction}>
                                                ID
                                            </TableHeading>

                                            <th  className="px-3 py-3">Image</th>
                                            
                                            <TableHeading name ="name" chengeMethod={changeSort} sort_feild={queryParams.sort_feild} sort_direction={queryParams.sort_direction}>
                                                Name
                                            </TableHeading>

                                            <th onClick={(e) =>changeSort('status')} className="px-3 py-2">Status</th>

                                            <TableHeading name ="created_at" chengeMethod={changeSort} sort_feild={queryParams.sort_feild} sort_direction={queryParams.sort_direction}>
                                                Created Date
                                            </TableHeading>

                                            <TableHeading name ="due_date" chengeMethod={changeSort} sort_feild={queryParams.sort_feild} sort_direction={queryParams.sort_direction}>
                                                Due Date
                                            </TableHeading>
                                            
                                            <th onClick={(e) =>changeSort('ceated_at')} className="px-3 py-2">Created By</th>
                                            <th  className="px-3 py-2">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {projects.data.map((project =>(
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key= {project.id}>
                                        <th className="px-3 py-4">{project.id}</th>
                                        <td className="px-3 py-3"><img src={project.image_path} alt="" style={{widht:60}} /></td>

                                        <td className="px-3 py-3 text-gray-100 text-nowrap hover:underline">
                                            <Link  href={route('projects.show' , project.id )}>{project.name}</Link>
                                            
                                        </td>

                                        <td className="px-3 py-3 text-nowrap">
                                            <span className={"px-2 py-1 rounded text-white " +
                                                            PROJECT_STATUS_CLASS_MAP[project.status]
                                            }>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3">{project.created_at}</td>
                                        <td className="px-3 py-3">{project.due_date}</td>
                                        <td className="px-3 py-3">{project.created_by.name}</td>
                                        <td className="px-3 py-3 text-nowrap">
                                            <Link href={route('projects.edit' , project.id )} className="font-meduim text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</Link>
                                            <button onClick={(e)=>DeleteProject(project)} className="font-meduim text-blue-600 dark:text-red-500 hover:underline mx-1">Delete</button>
                                        </td>


                                        </tr>

                                        )))}

                                    </tbody>
                                </table>
                            </div>

                            <Pagination Links={projects.meta.links}>

                            </Pagination>

                        </div>
                    </div>
                </div>
            </div>

        </Authenticated>
    )
}