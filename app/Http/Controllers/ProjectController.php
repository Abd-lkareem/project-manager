<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Enums\projectStatus;
use Illuminate\Support\Facades\Storage;
use App\Traits\fileOperations;



class ProjectController extends Controller
{
    use fileOperations ;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        $projects = $query->Filter()->latest('id')->paginate(10);

        return inertia('Project/index' ,[
            'projects' => ProjectResource::collection($projects) ,
            'queryParams' => count(request()->query()) > 0 ?request()->query() :  null ,
            'result' => session('result') ,
            
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {       

        $data = $request->validated();

        $project = Project::create($data);

        $image_path = isset($data['image']) ?  $this->storeFile($data['image'] ,'images/projects' , 'project_' . $project->id) : null;

        $project->update([
            'image_path' => $image_path

        ]);

        return to_route('projects.index')->with('result' , [ 'message' => 'Project Was Created' , 'status' => true] );

    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $tasks = $project->tasks()->Filter()->paginate(10);
    
        return inertia('Project/show' , [
            
            'project' => new ProjectResource($project) ,
            'tasks' => TaskResource::collection($tasks) ,
            'queryParams' => count(request()->query()) > 0 ?request()->query() :  null

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/edit' , [ 'project' => new ProjectResource($project) ,  ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data  = $request->validated();
        $image = $data['image'] ?? null; 

        if($image)
        {
            if($project->image_path)
                $this->deleteFile($project->image_path);

            $data['image_path'] = $this->storeFile($image , 'images/projects' , 'project_'.$project->id);

        }

        $project->update($data);

        return to_route('projects.index')->with('result' , [ 'message' => 'Project Was Updated' , 'status' => true] );

        

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if($project->isCompleted())
            return to_route('projects.index')->with('result' , [ 'message' => 'you can not delete completed project' , 'status' => false] );

        $project->delete_project();
        return to_route('projects.index')->with('result' , [ 'message' => 'the project was deleted successfully' , 'status' => true] );

        
    }
}
