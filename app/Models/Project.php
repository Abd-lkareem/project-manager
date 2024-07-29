<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    public function scopeFilter($query)
    {
        // filter 
        $query->when(request()->status , fn($query)=> $query->where('status' , request()->status))
              ->when(request()->name , fn($query)=> $query->where('name' , 'like', "%" .request()->name . "%"));

        // sort 
        $query->orderBy(request('sort_feild', 'id') , request('sort_direction', 'asc') );
    }
    
    public function tasks()
    {
        return $this->hasMany(Task::Class);
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
