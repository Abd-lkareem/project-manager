import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head , Link , router, useForm} from "@inertiajs/react";
import InputLabel  from "@/Components/InputLabel";
import TextInput  from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import {PROJECT_STATUS_TEXT_MAP , PROJECT_STATUS }  from "@/constants.jsx";
import SelectedInput  from "@/Components/SelectedInput";


export default function Edit({auth , project}){

    const {data , setData , post , errors , reset} = useForm({
        image : null ,
        name : project.name || '' ,
        status : project.status || '' ,
        description : project.description || '' ,
        due_date : project.due_date || '' ,
        _method : 'PUT' ,

    })

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(data)
        post(route('projects.update' , project.id) )
    }

    return (
        <Authenticated
        user={auth.user}
        header={
        <div className="flex justify-between ">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit The Project Info :
            </h2>

        </div>
        }
        >
            <Head title="Projects"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="mb-10" >
                    <img src={project.image_path} alt=""  />
                </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <form onSubmit={onSubmit}  className="shadow sm-rounded-lg p-4 sm:p-8 bg-white dark:bg-gray-800">
                                <div>
                                    <InputLabel
                                     value="Project Image"
                                     htmlFor="project_image_path"/>


                                    <TextInput 
                                        id="project_image_path"
                                        type="file"
                                        name="image"
                                        className="mt-5 w-full"
                                        onChange={e => setData('image' , e.target.files[0])}
                                    />

                                    <InputError message = {errors.image} className="mt-2"/>
                                </div>

                                <div className="mt-5">

                                    <InputLabel
                                     value="Project Name"
                                     htmlFor="project_Name"
                                    />


                                    <TextInput 
                                        id="project_Name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        isFocused={true}
                                        className="mt-1 w-full"
                                        onChange={e => setData('name' , e.target.value)}
                                    />
                                    <InputError message = {errors.name} className="mt-2"/>
                                </div>

                                <div className="mt-5">

                                    <InputLabel
                                     value="Project description"
                                     htmlFor="project_Description"
                                    />


                                    <TextAreaInput
                                        id="project_Description"
                                        type="text"
                                        name="name"
                                        value={data.description}
                                        isFocused={true}
                                        className="mt-1 w-full"
                                        onChange={e => setData('description' , e.target.value)}
                                    />
                                    <InputError message = {errors.description} className="mt-2"/>
                                </div>

                                <div className="mt-5">

                                    <InputLabel
                                     value="Project DeadLine"
                                     htmlFor="Due_Date"
                                    />


                                    <TextAreaInput
                                        id="Due_Date"
                                        type="text"
                                        name="Due_Date"
                                        value={data.due_date}
                                        isFocused={true}
                                        className="mt-1 w-full"
                                        onChange={e => setData('due_date' , e.target.value)}
                                    />
                                    <InputError message = {errors.due_date} className="mt-2"/>
                                </div>

                                <div className="mt-5">

                                    <SelectedInput defaultValue={project.status} className="w-full m-0" children={PROJECT_STATUS}
                                        onChange={e=>serachFeildChange('status' , e.target.value)}
                                    />


                                    <InputError message = {errors.status} className="mt-2"/>
                                </div>

                                <div className="mt-4 text-right">
                                    <Link href={route('projects.index')} className="bg-gray-100 py-2 px-4 text-gray-800 rounded shadow trasition-all hover:bg-gray-200 mr-2 ">
                                        Cancel
                                    </Link>

                                    
                                    <button  className="bg-emerald-500 px-4 rounded shadow transition-all  text-white hover:bg-emerald-600 " style={{paddingTop : 6 , paddingBottom : 6 ,  paddingRight : 16 , paddingLeft :16 }} >
                                        Edit
                                    </button>
                                </div>


                            </form>
                        
                    </div>
                </div>
            </div>

        </Authenticated>
    )
}