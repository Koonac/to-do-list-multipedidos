<?php

namespace App\Http\Controllers;

use App\Services\TaskService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    /**
     * Serviço de tarefas
     * 
     * @var TaskService $service
     */
    protected $service;

    /**
     * TaskService constructor
     * 
     * @param TaskService $service
     */
    public function __construct(TaskService $service)
    {
        $this->middleware('jwt');
        $this->service = $service;
    }

    /**
     * Retorna todas as tarefas do usuário
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function all()
    {
        return response()->json($this->service->listUserTasks());
    }

    /**
     * Retorna uma determinada tarefa
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function find(Request $request, $id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        return response()->json($this->service->find($request->id));
    }

    /**
     * Cadastra uma nova tarefa
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'due_date' => 'required|date|after:today',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $task = $this->service->create($request->all());
        return response()->json($task, 201);
    }

    /**
     * Atualiza uma tarefa
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make([...$request->all(), 'id' => $id], [
            'id' => 'required|integer',
            'title' => 'sometimes|string',
            'due_date' => 'sometimes|date|after:today',
            'description' => 'nullable|string',
            'is_done' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $this->service->update($request->id, $request->all());

        return response()->json();
    }

    /**
     * Deleta uma tarefa
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request, $id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $this->service->delete($request->id);

        return response()->json();
    }
}
