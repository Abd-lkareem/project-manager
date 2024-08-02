<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id , 
            'name' => $this->name , 
            'description' => $this->description ,
            'project' => new ProjectResource($this->project) ,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d') ,
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d') ,
            'status' => $this->status ,
            'priority' => $this->priority ,
            'image_path' => $this->image_path ,
            'created_by' => new UserResource($this->created_user),
            'updated_by' => new UserResource($this->updated_user) ,
            'project_name' => $this->project->name ,
            'project_id' => $this->project->id

         ];
    }
}
