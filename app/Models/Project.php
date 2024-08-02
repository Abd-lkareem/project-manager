<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\projectStatus;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name' ,
        'status' ,
        'image_path' ,
        'description' ,
        'due_date' ,
        'created_by' ,
        'updated_by' ,
        'created_at' ,
        'updated_at' ,
    ];

    protected static function booted()
    {   
        static::creating(function (self $project) {
            $project->created_by = auth()?->user()?->id ?? 5;
            $project->updated_by = auth()?->user()?->id ?? 5;
            $project->status = projectStatus::ON_PROGRESS;
        });
    }
    public function scopeFilter($query)
    {
        // filter 
        $query->when(request()->status , fn($query)=> $query->where('status' , request()->status))
              ->when(request()->name , fn($query)=> $query->where('name' , 'like', "%" .request()->name . "%"));

        // sort 
        $query->orderBy(request('sort_feild', 'id') , request('sort_direction', 'desc') );
    }
    
    public function tasks()
    {
        return $this->hasMany(Task::Class) ;
    }

    public function created_user()
    {
        return $this->belongsTo(User::Class , 'created_by');
    }

    public function updated_user()
    {
        return $this->belongsTo(User::Class , 'updated_by');
    }


}
