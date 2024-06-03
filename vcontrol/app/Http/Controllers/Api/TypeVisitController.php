<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TypeVisit;
use App\Services\TypeVisitService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\TypeVisitRequest;

class TypeVisitController extends Controller
{
    public function index(Request $request, TypeVisitService $typeVisitService): JsonResponse
    {
        return response()->json($typeVisitService->list());
    }
    public function show(string $id, TypeVisitService $typeVisitService): JsonResponse
    {
        $typeVisit = $typeVisitService->find($id);
        if ($typeVisit) {
            return response()->json($typeVisit);
        }
        return response()->json(['messages' => ['Não encontrado.']], 404);
    }
    public function store(TypeVisitRequest $request, TypeVisitService $typeVisitService): JsonResponse
    {
        $created = $typeVisitService->create($request);
        if ($created != null) {
            return response()->json(['messages' => ['Cadastrado com sucesso!'], 'typeVisit' => $created], 200);

        }
        return response()->json(['messages' => ['Falha ao incluir.']], 400);
    }
    public function update(TypeVisitRequest $request, TypeVisit $user, string $id, TypeVisitService $typeVisitService): JsonResponse
    {
        $edited = $typeVisitService->update($request, $id);
        if ($edited != null) {
            return response()->json(['messages' => ['Editado com sucesso!'], 'typeVisit' => $edited], 200);
        }
        return response()->json(['messages' => ['Falha ao editar.']], 400);
    }
    public function destroy(string $id, TypeVisitService $typeVisitService): JsonResponse
    {
        $destroyed = $typeVisitService->destroy($id) !== null;
        if ($destroyed) {
            return response()->json(['messages' => ['Excluído com sucesso'], 'typeVisit' => $destroyed], 200);
        }
        return response()->json(['messages' => ['Não encontrado']], 404);
    }
}
