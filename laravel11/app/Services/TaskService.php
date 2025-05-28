<?php

namespace App\Services;

use App\Models\Task;
use App\Repositories\TaskRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class TaskService
{
    /**
     * Repositório de tarefas
     * 
     * @var TaskRepository $repository
     */
    protected $repository;

    /**
     * TaskService constructor
     * 
     * @param TaskRepository $repository
     */
    public function __construct(TaskRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Lista as tarefas do usuário logado
     * 
     * @return Collection<int, Task>
     */
    public function listUserTasks(): Collection
    {
        return $this->repository->getAllByUser(Auth::id());
    }

    /**
     * Retorna uma determinada tarefa
     * 
     * @param int $id
     * @return Task
     */
    public function find(int $id): Task
    {
        $task = $this->repository->getById($id);

        $this->authorize($task);

        return $task;
    }

    /**
     * Cria uma tarefa por usuário logado
     * 
     * @param array $data
     * @return Task
     */
    public function create(array $data): Task
    {
        $data['user_id'] = Auth::id();
        return $this->repository->create($data);
    }

    /**
     * Atualiza uma tarefa
     * 
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $task = $this->repository->getById($id);

        $this->authorize($task);

        return $this->repository->update($id, $data);
    }

    /**
     * Deleta uma tarefa
     * 
     * @param int $id
     * @return bool
     */
    public function delete(int $id)
    {
        $task = $this->repository->getById($id);

        $this->authorize($task);

        return $this->repository->delete($id);
    }

    /**
     * Verifica se o usuário percente a uma determinada tarefa
     * 
     * @param Task $task
     * @return void
     */
    protected function authorize(Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }
    }
}
