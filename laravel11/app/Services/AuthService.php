<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    /**
     * Repositório de usuários
     * 
     * @var UserService $userService
     */
    protected $userService;

    /**
     * AuthService constructor
     * 
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Retorna o usuário autenticado
     * 
     * @return Authenticatable|null
     */
    public function getAutenticatedUser(): ?Authenticatable
    {
        return auth('api')->user();
    }

    /**
     * Registra um usuário
     * 
     * @param array $data
     * @return array
     */
    public function register(array $data): array
    {
        $user = $this->userService->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $token = auth('api')->login($user);
        $tokenArray = $this->formatTokenArray($token);

        return [
            'user' => $user,
            ...$tokenArray
        ];
    }

    /**
     * Loga um usuário
     * 
     * @param array $data
     * @return array
     */
    public function login(array $data): array
    {
        if (!($token = auth('api')->attempt($data))) {
            abort(401, 'Unauthorized');
        }

        return $this->formatTokenArray($token);
    }

    /**
     * Desloga um usuário
     * 
     * @return array
     */
    public function logout(): array
    {
        auth('api')->logout();

        return ['message' => 'Usuário deslogado com sucesso.'];
    }

    /**
     * Renova o token de um usuário autenticado
     * 
     * @return array
     */
    public function refresh(): array
    {
        $token = auth('api')->refresh();
        
        return $this->formatTokenArray($token);
    }

    /**
     * Retorna um array com token.
     *
     * @param string $token
     * @return array
     */
    protected function formatTokenArray($token): array
    {
        return [
            'access_token'  => $token,
            'token_type'    => 'bearer',
            'expires_in'    => auth('api')->factory()->getTTL() * 60
        ];
    }
}
