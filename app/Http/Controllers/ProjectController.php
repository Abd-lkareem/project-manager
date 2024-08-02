<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;

class ProjectController extends Controller
{
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
            'success' => session('success')
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
        $file = isset($data['image']) ?  $data['image'] : null;

        if($file)
            $path = $file->store('images', 'public'); 
        
        Project::create([
            ...$data ,
            'image_path' => $path ?? null
        ]);

        return to_route('projects.index')->with('success' , 'Project Was Created');
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
