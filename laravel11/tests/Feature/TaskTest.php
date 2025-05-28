<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Usuário cadastrado
     * 
     * @var Users $user
     */
    protected $user;

    /**
     * accessToken JWT
     * 
     * @var string $accessToken
     */
    protected $accessToken;

    /**
     * Função nativa para setar variáveis em ambiente de teste
     * 
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $user = User::factory()->create();

        $this->user = $user;
        $this->accessToken = auth('api')->login($user);
    }

    /**
     * Teste de criação de tarefa pelo usuário
     * 
     * @return void
     */
    public function test_user_can_create_task()
    {
        $response = $this->postJson('/api/tasks', [
            'title'     => 'Tomar banho',
            'due_date'  => now()->addDay()->toDateString(),
        ], ['Authorization' => "Bearer {$this->accessToken}"]);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'title' => 'Tomar banho',
                'user_id' => $this->user->id
            ]);
    }

    /**
     * Teste de atualização de tarefa pelo usuário
     * 
     * @return void
     */
    public function test_user_can_update_task()
    {
        $dueDate = now()->addDays(2)->toDateString();

        $task = Task::factory()->create([
            'user_id'       => $this->user->id,
            'title'         => 'Tarefa antiga',
            'description'   => 'Alguma descrição aqui',
            'due_date'      => $dueDate,
        ]);

        $response = $this->putJson("/api/tasks/{$task->id}", [
            'title' => 'Tarefa nova',
        ], ['Authorization' => "Bearer {$this->accessToken}"]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('tasks', [
            'id'            => $task->id,
            'user_id'       => $this->user->id,
            'title'         => 'Tarefa nova',
            'description'   => 'Alguma descrição aqui',
            'due_date'      => $dueDate,
        ]);
    }

    /**
     * Teste de exclusão de tarefa pelo usuário
     * 
     * @return void
     */
    public function test_user_can_delete_own_task()
    {
        $task = Task::factory()->create(['user_id' => $this->user->id]);

        $response = $this->deleteJson("/api/tasks/{$task->id}", [], ['Authorization' => "Bearer {$this->accessToken}"]);
        $response->assertStatus(200);
    }

    /**
     * Testando se o usuário NÃO pode atualizar tasks de outro usuário
     * 
     * @return void
     */
    public function test_user_cannot_access_others_task()
    {
        $otherUser = User::factory()->create();

        $task = Task::factory()->create(['user_id' => $otherUser->id]);

        $response = $this->putJson("/api/tasks/{$task->id}", [
            'title' => 'Invasão',
        ], ['Authorization' => "Bearer {$this->accessToken}"]);

        $response->assertStatus(403);
    }
}
