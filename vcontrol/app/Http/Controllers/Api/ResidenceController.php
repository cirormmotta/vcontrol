<?php

namespace App\Http\Controllers\Api;

use App\Models\Residence;
use App\Services\ResidenceService;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\UserType;

class ResidenceController extends Controller
{
    public function index(Request $request, ResidenceService $residenceService): JsonResponse
    {
        return response()->json($residenceService->list($request));
    }
    public function show(string $id, ResidenceService $residenceService): JsonResponse
    {
        $visitor = $residenceService->find($id);
        if ($visitor) {
            return response()->json($visitor);
        }
        return response()->json(['messages' => ['Não encontrado.']], 404);
    }
    public function store(Request $request, ResidenceService $residenceService): JsonResponse
    {
        $created = $residenceService->create($request);
        if ($created != null) {
            return response()->json(['messages' => ['Cadastrado com sucesso!'], 'residence' => $created], 200);

        }
        return response()->json(['messages' => ['Falha ao incluir.']], 400);
    }
    public function update(Request $request, Residence $user, string $id, ResidenceService $residenceService): JsonResponse
    {
        $edited = $residenceService->update($request, $id);
        if ($edited != null) {
            return response()->json(['messages' => ['Editado com sucesso!'], 'residence' => $edited], 200);
        }
        return response()->json(['messages' => ['Falha ao editar.']], 400);
    }
    public function destroy(string $id, ResidenceService $residenceService): JsonResponse
    {
        $user = $residenceService->destroy($id) !== null;
        if ($user) {
            return response()->json(['messages' => ['Excluído com sucesso'], 'residence' => $user], 200);
        }
        return response()->json(['messages' => ['Não encontrado']], 404);
    }
}
