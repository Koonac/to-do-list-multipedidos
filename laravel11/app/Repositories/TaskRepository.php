<?php

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;

class TaskRepository
{
    /**
     * Lista todas as tarefas de um usuário
     * 
     * @param int $userId
     * @return Collection<int, Task>
     */
    public function getAllByUser(int $userId): Collection
    {
        return Task::where('user_id', $userId)->get();
    }

    /**
     * Retorna uma determinada tarefa de um usuário
     * 
     * @param int $id
     * @return Task|null
     */
    public function getById(int $id): ?Task
    {
        return Task::findOrFail($id);
    }

    /**
     * Cria uma tarefa
     * 
     * @param array $data
     * @return Task
     */
    public function create(array $data): Task
    {
        return Task::create($data);
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
        return Task::where('id', $id)->update($data);
    }

    /**
     * Deleta uma tarefa
     * 
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return Task::where('id', $id)->delete();
    }
}
