<?php
namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use \Illuminate\Contracts\Auth\Authenticatable;

class AuthService
{
    public function login(string $email, string $password): ?string
    {
        if (Auth::attempt(["email" => $email, "password" => $password])) {
            return $this->createUserToken();
        }
        return null;
    }
    public function getTokent(): string
    {
        $user = Auth::user();
        return $user->createToken('API_TOKEN')->plainTextToken;
    }
    public function logout(): bool
    {
        try {
            Auth::user()->tokens()->delete();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
    public function currentUser(): ?User
    {
        return Auth::user();
    }
    public function createUserToken(): string
    {
        $user = $this->currentUser();
        $abilities = json_decode($user->userType->abilities) ?? [];
        return $user->createToken('API_TOKEN', $abilities)->plainTextToken;
    }
    public function resetPassword(Request $request): bool
    {
        $request->validate(['email' => 'required|email']);
        $status = Password::sendResetLink(
            $request->only('email')
        );
        return $status === Password::RESET_LINK_SENT;
    }
    public function createNewPassword($params)
    {
        $status = Password::reset(
            $params,
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => bcrypt($password)
                ]);

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? redirect()->route('login')->with('status', __($status))
            : back()->withErrors(['email' => [__($status)]]);

    }
}
