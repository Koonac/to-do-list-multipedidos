<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Serviço de autenticação
     * 
     * @var AuthService $service
     */
    protected $service;

    /**
     * AuthController constructor
     * 
     * @param AuthService $service
     */
    public function __construct(AuthService $service)
    {
        $this->middleware('jwt')->except(['login', 'register']);
        $this->service = $service;
    }

    /**
     * Captura o usuário autenticado
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $authenticatedUser = $this->service->getAuthenticatedUser();
        return response()->json($authenticatedUser);
    }

    /**
     * Registra um novo usuário
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $authUser = $this->service->register($request->all());
        return response()->json($authUser);
    }

    /**
     * Loga o usuário
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $login = $this->service->login($request->all());
        return response()->json($login);
    }

    /**
     * Desloga um usuário
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $logout = $this->service->logout();
        return response()->json($logout);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        $refresh = $this->service->refresh();
        return response()->json($refresh);
    }
}
