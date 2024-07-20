<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'abdulkareem',
        //     'email' => 'abdulkareem@example.com',
        //     'password' => bcrypt('123456789'),
        //     'email_verified_at' => time(),
        // ]);

        \App\Models\Project::factory()
        ->count(30)
        ->hasTasks(30)
        ->create();


    }
}
