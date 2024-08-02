import Pagination  from "@/Components/pagination";
import TableHeading  from "@/Components/TableHeading";
import TextInput  from "@/Components/TextInput";
import SelectedInput  from "@/Components/SelectedInput";
import {TASK_STATUS_TEXT_MAP ,TASK_STATUS , TASK_STATUS_CLASS_MAP}  from "@/constants.jsx";
import { Link , router} from "@inertiajs/react";


export default function TaksTable({auth , Tasks , queryParams = null , hideProjectNameColumn=false }){

    queryParams = queryParams || {};

    const serachFeildChange =(fieldName , value) => {
        if(value)
            queryParams[fieldName] = value;    
        else
            delete queryParams[fieldName];    

        hitRoute()
      
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
        
        hitRoute()

    }

    const hitRoute = ()=>
    {
        if(hideProjectNameColumn)
            router.get(route('projects.show' , Tasks.data[0].project_id ) , queryParams)  

        else
            router.get(route('tasks.index') , queryParams)  


    }

 return (
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
                                                <TextInput defaultValue={queryParams.name} className="w-full" placeholder="Task Name" 
                                                onBlur={e => serachFeildChange('name' , e.target.value)}
                                                onKeyPress={e => onKeyPress('name' , e)}
                                                />
                                            </th>
                                            
                                            {!hideProjectNameColumn &&  <th className="px-3 py-3"></th>}

                                            <th className="px-3 py-2">
                                                <SelectedInput defaultValue={queryParams.status} className="w-full" children={TASK_STATUS}
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
                                        <tr className="text-nowrap" >
                                            <TableHeading name ="id" chengeMethod={changeSort} sort_feild={queryParams.sort_feild} sort_direction={queryParams.sort_direction}>
                                                ID
                                            </TableHeading>

                                            <th  className="px-3 py-3">Image</th>
                                            
                                            <TableHeading name ="name" chengeMethod={changeSort} sort_feild={queryParams.sort_feild} sort_direction={queryParams.sort_direction}>
                                                Name
                                            </TableHeading>

                                            {!hideProjectNameColumn && <th  className="px-3 py-3">Project Name</th>}

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
                                        {Tasks.data.map((Task =>(
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key= {Task.id}>
                                        <th className="px-3 py-4">{Task.id}</th>
                                        <td className="px-3 py-3"><img src={Task.image_path} alt="" style={{widht:60}} /></td>
                                        <td className="px-3 py-3">{Task.name}</td>
                                        {!hideProjectNameColumn && <td className="px-3 py-3">{Task.project_name}</td>}

                                        <td className="px-3 py-3">
                                            <span className={"px-2 py-1 rounded text-white " +
                                                            TASK_STATUS_CLASS_MAP[Task.status]
                                            }>
                                                {TASK_STATUS_TEXT_MAP[Task.status]}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3">{Task.created_at}</td>
                                        <td className="px-3 py-3">{Task.due_date}</td>
                                        <td className="px-3 py-3">{Task.created_by.name}</td>
                                        <td className="px-3 py-3">
                                            <Link href={route('tasks.edit' , Task.id )} className="font-meduim text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</Link>
                                            <Link href={route('tasks.destroy' , Task.id )} className="font-meduim text-blue-600 dark:text-red-500 hover:underline mx-1">Delete</Link>
                                        </td>


                                        </tr>

                                        )))}

                                    </tbody>
                                </table>
                            </div>

                            <Pagination Links={Tasks.meta.links}>

                            </Pagination>

                    </div>
            </div>
 )
}