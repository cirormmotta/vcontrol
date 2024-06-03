<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\VisitorRequest;
use App\Http\Requests\VisitRequest;
use App\Models\Visit;
use App\Http\Controllers\Controller;
use App\Services\VisitService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VisitController extends Controller
{
    public function index(Request $request, VisitService $visitorService): JsonResponse
    {
        return response()->json($visitorService->list($request));
    }
    public function show(string $id, VisitService $visitService): JsonResponse
    {
        $visitor = $visitService->find($id);
        if ($visitor) {
            return response()->json($visitor);
        }
        return response()->json(['messages' => ['Não encontrado.']], 404);
    }
    public function store(VisitRequest $request, VisitService $visitService): JsonResponse
    {
        $created = $visitService->create($request);
        if ($created != null) {
            return response()->json(['messages' => ['Cadastrado com sucesso!'], 'visit' => $created], 200);

        }
        return response()->json(['messages' => ['Falha ao incluir.']], 400);
    }
    public function update(VisitRequest $request, Visit $user, string $id, VisitService $visitService): JsonResponse
    {
        $edited = $visitService->update($request, $id);
        if ($edited != null) {
            return response()->json(['messages' => ['Editado com sucesso!'], 'visit' => $edited], 200);
        }
        return response()->json(['messages' => ['Falha ao editar.']], 400);
    }
    public function destroy(string $id, VisitService $visitService): JsonResponse
    {
        $destroyed = $visitService->destroy($id) !== null;
        if ($destroyed) {
            return response()->json(['messages' => ['Excluído com sucesso'], 'visit' => $destroyed], 200);
        }
        return response()->json(['messages' => ['Não encontrado']], 404);
    }
}
