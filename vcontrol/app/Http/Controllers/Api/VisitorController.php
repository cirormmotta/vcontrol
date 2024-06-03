<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\VisitorRequest;
use App\Models\Visitor;
use App\Services\TypeUserService;
use App\Http\Controllers\Controller;
use App\Models\UserType;
use App\Services\VisitorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VisitorController extends Controller
{
    public function index(Request $request, VisitorService $visitorService): JsonResponse
    {
        return response()->json($visitorService->list($request->page, $request->limit, $request));
    }
    public function show(string $id, VisitorService $visitorService): JsonResponse
    {
        $visitor = $visitorService->find($id);
        if ($visitor) {
            return response()->json($visitor);
        }
        return response()->json(['messages' => ['Não encontrado.']], 404);
    }
    public function store(VisitorRequest $request, VisitorService $visitorService): JsonResponse
    {
        $created = $visitorService->create($request);
        if ($created != null) {
            return response()->json(['messages' => ['Cadastrado com sucesso!'], 'visitor' => $created], 200);

        }
        return response()->json(['messages' => ['Falha ao incluir.']], 400);
    }
    public function update(VisitorRequest $request, Visitor $user, string $id, VisitorService $visitorService): JsonResponse
    {
        $edited = $visitorService->update($request, $id);
        if ($edited != null) {
            return response()->json(['messages' => ['Editado com sucesso!'], 'visitor' => $edited], 200);
        }
        return response()->json(['messages' => ['Falha ao editar.']], 400);
    }
    public function destroy(string $id, VisitorService $visitorService): JsonResponse
    {
        $destroyed = $visitorService->destroy($id) !== null;
        if ($destroyed) {
            return response()->json(['messages' => ['Excluído com sucesso'], 'visitor' => $destroyed], 200);
        }
        return response()->json(['messages' => ['Não encontrado']], 404);
    }
}
