<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ResidentRequest;
use App\Models\Resident;
use App\Services\ResidentService;
use App\Http\Controllers\Controller;
use App\Models\UserType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ResidentController extends Controller
{
    public function index(Request $request, ResidentService $residentService): JsonResponse
    {
        return response()->json($residentService->list($request));
    }
    public function show(string $id, ResidentService $residentService): JsonResponse
    {
        $visitor = $residentService->find($id);
        if ($visitor) {
            return response()->json($visitor);
        }
        return response()->json(['messages' => ['Não encontrado.']], 404);
    }
    public function store(ResidentRequest $request, ResidentService $residentService): JsonResponse
    {
        $created = $residentService->create($request);
        if ($created != null) {
            return response()->json(['messages' => ['Cadastrado com sucesso!'], 'resident' => $created], 200);

        }
        return response()->json(['messages' => ['Falha ao incluir.']], 400);
    }
    public function update(ResidentRequest $request, Resident $resident, string $id, ResidentService $residentService): JsonResponse
    {
        $edited = $residentService->update($request, $id);
        if ($edited != null) {
            return response()->json(['messages' => ['Editado com sucesso!'], 'resident' => $edited], 200);
        }
        return response()->json(['messages' => ['Falha ao editar.']], 400);
    }
    public function destroy(string $id, ResidentService $residentService): JsonResponse
    {
        $destroyed = $residentService->destroy($id) !== null;
        if ($destroyed) {
            return response()->json(['messages' => ['Excluído com sucesso'], 'resident' => $destroyed], 200);
        }
        return response()->json(['messages' => ['Não encontrado']], 404);
    }
}
