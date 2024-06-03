<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthPasswordRequest;
use App\Services\AuthService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request, AuthService $authService): JsonResponse
    {
        $plainTextToken = $authService->login($request->email, $request->password);
        if ($plainTextToken) {
            return response()->json(['token' => $plainTextToken], 200);
        }
        return response()->json(['messages' => ['Usuário ou senha inválidos.']], 400);
    }
    public function logout(Request $request, AuthService $authService): JsonResponse
    {
        try {
            $authService->logout();
            return response()->json(['messages' => ['Logout realizado com sucesso.']], 200);
        } catch (Exception $e) {
            return response()->json(['messages' => ['Falha ao realizar o logout.']], 400);
        }
    }
    public function profile(Request $request, AuthService $authService): JsonResponse
    {
        try {
            $user = $authService->currentUser();
            return response()->json($user, 200);
        } catch (Exception $e) {
            return response()->json(['messages' => ['Falha ao buscar usuário.']], 400);
        }
    }
    public function resetPassword(Request $request, AuthService $authService): JsonResponse
    {
        if ($authService->resetPassword($request)) {
            return response()->json(['messages' => ['Confira o seu email.']], 200);
        }
        return response()->json(['messages' => ['Email não encontrado.']], 400);
    }
    public function createPassword(AuthPasswordRequest $request, AuthService $authService): JsonResponse
    {
        $params = $request->only('email', 'password', 'password_confirmation', 'token');
        if ($authService->createNewPassword($params)) {
            return response()->json(['messages' => ['Senha alterada com sucesso.']], 200);
        }
        return response()->json(['messages' => ['Não foi possível alterar a senha.']], 400);
    }
}
