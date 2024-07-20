<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'name' => fake()->sentence() ,
            'description' => fake()->realText() ,
            'due_date' => fake()->dateTimeBetween('now' , '+1 year') ,
            'status' => fake()->randomElement(['pending' , 'on_progress' , 'completed']) ,
            'priority' => fake()->randomElement(['low' , 'medium' , 'high']) ,
            'image_path' => fake()->imageUrl() ,
            'assinged_user_id' => 5 ,
            'created_by' => 5 ,
            'updated_by' => 5 ,

        ];
    }
}
