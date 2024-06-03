<?php

namespace App\Http\Controllers\Api;

use App\Services\TypeUserService;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserTypeRequest;
use App\Models\UserType;
use App\Configs\UserTypeConfig;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserTypeController extends Controller
{
    public function index(Request $request, TypeUserService $typeUserService): JsonResponse
    {
        return response()->json($typeUserService->allUserTypes());
    }
    public function show(string $id, TypeUserService $typeUserService): JsonResponse
    {
        $user = $typeUserService->findUserType($id);
        if ($user) {
            return response()->json($user);
        }
        return response()->json(['messages' => ['Não encontrado.']], 404);
    }
    public function store(UserTypeRequest $request, TypeUserService $userService): JsonResponse
    {
        $created = $userService->createUserType($request);
        if ($created != null) {
            return response()->json(['messages' => ['Cadastrado com sucesso!'], 'userType' => $created], 200);

        }
        return response()->json(['messages' => ['Falha ao incluir.']], 400);
    }
    public function update(UserTypeRequest $request, UserType $user, string $id, TypeUserService $userService): JsonResponse
    {
        $edited = $userService->updateUserType($request, $id);
        if ($edited != null) {
            return response()->json(['messages' => ['Editado com sucesso!'], 'userType' => $edited], 200);
        }
        return response()->json(['messages' => ['Falha ao editar.']], 400);
    }
    public function destroy(string $id, TypeUserService $typeUserService): JsonResponse
    {
        $destroyed = $typeUserService->destroy($id) !== null;
        if ($destroyed) {
            return response()->json(['messages' => ['Excluído com sucesso'], 'userType' => $destroyed], 200);
        }
        return response()->json(['messages' => ['Não encontrado']], 404);
    }
    public function abilitiesList(): JsonResponse
    {
        return response()->json(UserTypeConfig::ABILITIES);
    }
}
