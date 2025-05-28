<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;

class UserService
{
    /**
     * Repositório de usuários
     * 
     * @var UserRepository $repository
     */
    protected $repository;

    /**
     * UserService constructor
     * 
     * @param UserRepository $repository
     */
    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Cria um usuário
     * 
     * @param array $data
     * @return User
     */
    public function create(array $data): User
    {
        return $this->repository->create($data);
    }

    /**
     * Atualiza um usuário
     * 
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $this->repository->getById($id);

        return $this->repository->update($id, $data);
    }

    /**
     * Deleta uma usuário
     * 
     * @param int $id
     * @return bool
     */
    public function delete(int $id)
    {
        $this->repository->getById($id);

        return $this->repository->delete($id);
    }
}
