<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserRepository
{
    /**
     * Retorna um determinado usuário
     * 
     * @param int $id
     * @return User|null
     */
    public function getById(int $id): ?User
    {
        return User::findOrFail($id);
    }

    /**
     * Cria uma usuário
     * 
     * @param array $data
     * @return User
     */
    public function create(array $data): User
    {
        return User::create($data);
    }

    /**
     * Atualiza uma usuário
     * 
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        return User::where('id', $id)->update($data);
    }

    /**
     * Deleta uma usuário
     * 
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return User::where('id', $id)->delete();
    }
}
