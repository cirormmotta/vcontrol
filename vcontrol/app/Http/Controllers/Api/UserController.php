<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserPasswordRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index(Request $request, UserService $userService): JsonResponse
    {
        return response()->json($userService->allUsers());
    }
    public function show(string $id, UserService $userService): JsonResponse
    {
        $user = $userService->findUser($id);
        if($user) {
            return response()->json($user);
        }
        return response()->json(['messages' => ['Usuário não encontrado.']], 404);
    }
    public function store(UserRequest $request, UserService $userService): JsonResponse
    {
        $created = $userService->createUser($request);
        if ($created != null) {
            return response()->json(['messages' => ['Usuário cadastrado com sucesso!'], 'user' => $created], 200);

        }
        return response()->json(['messages' => ['Falha ao incluir usuário']], 400);
    }
    public function update(UserRequest $request, User $user, string $id, UserService $userService): JsonResponse
    {
        $edited = $userService->updateUser($request, $id);
        if ($edited != null) {
            return response()->json(['messages' => ['Usuário editado com sucesso!'], 'user' => $edited], 200);
        }
        return response()->json(['messages' => ['Falha ao editar usuário']], 400);
    }
    public function updatePassword(UserPasswordRequest $request, User $user, string $id, UserService $userService): JsonResponse
    {
        $edited = $userService->updatePasswordUser($request, $id);
        if ($edited != null) {
            return response()->json(['messages' => ['Usuário editado com sucesso!'], 'user' => $edited], 200);
        }
        return response()->json(['messages' => ['Falha ao editar usuário']], 400);
    }
    public function destroy(string $id, UserService $userService): JsonResponse
    {
        $destroyed = $userService->destroy($id) !== null;
        if ($destroyed) {
            return response()->json(['messages' => ['Excluído com sucesso'], 'user' => $destroyed], 200);
        }
        return response()->json(['messages' => ['Usuário não encontrado']], 404);
    }
}
