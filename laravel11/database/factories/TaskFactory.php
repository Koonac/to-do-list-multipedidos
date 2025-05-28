<?php
namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        return [
            'title' => fake()->title(),
            'description' => fake()->paragraph(),
            'due_date' => now()->addDays(rand(1, 10))->toDateString(),
            'is_done' => false,
            'user_id' => User::factory(),
        ];
    }
}
