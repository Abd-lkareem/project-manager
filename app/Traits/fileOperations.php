<?php

namespace App\Traits;
use Illuminate\Support\Facades\Storage;


trait fileOperations{
 
    public function storeFile($file , $dir ="images" , $custom_name=null)
    {
        $filename = $this->getFileName($file , $custom_name);
        $file = $file->storeAs($dir , $filename, 'public');

        return $file;
    
    }

    public function deleteFile($path)
    {
        return Storage::delete($path);
    }

    private function getFileName($file , $name)
    {
        $extension = $file->getClientOriginalExtension();
        if($name)
            if (!Storage::disk('local')->has('public/images/' . $name)) 
                return "$name.$extension";
    
        return time() . '_' . uniqid() . '.' . $extension;
    }

}