<?php

namespace App\Services;

use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserService
{
    public function allUsers(): ?Collection
    {
        return User::orderBy('name', 'asc')->get();
    }
    public function findUser($id): ?User
    {
        return User::find($id);
    }
    public function createUser($request): ?User
    {
        try {
            DB::beginTransaction();
            $createdUser = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'user_type_id' => $request->user_type_id,
                'password' => bcrypt($request->password),
            ]);
            DB::commit();
            return $createdUser;
        } catch (Exception $e) {
            DB::rollBack();
            return null;
        }
    }
    public function updateUser($user, string $id): ?User
    {
        try {
            $user = $this->findUser($id);
            if (!$user)
                return null;
            DB::beginTransaction();
            $editedUser = $user->update([
                'name' => $user->name,
                'email' => $user->email,
                'user_type_id' => $user->user_type_id,
            ]);
            DB::commit();
            if ($editedUser) {
                return $user;
            }
        } catch (Exception $e) {
            DB::rollBack();
        }
        return null;
    }
    public function updatePasswordUser($request, string $id): ?User
    {
        try {
            $id = $request->id;
            $currentUser = Auth::user();
            if ($currentUser) {
                if (!$currentUser->tokenCan('users')) {
                    if ($currentUser->id !== $id) {
                        return null;
                    }
                }
                $editedUser = $this->findUser($id);
                if ($editedUser) {
                    DB::beginTransaction();
                    $editedUser->update([
                        'password' => bcrypt($request->password),
                    ]);
                    DB::commit();
                }
            }
            if ($editedUser) {
                return $editedUser;
            }
        } catch (Exception $e) {
            DB::rollBack();
        }
        return null;
    }
    public function destroy(string $id): ?User
    {
        try {
            $user = $this->findUser($id);
            if ($user) {
                DB::beginTransaction();
                $deleted = $user->delete();
                DB::commit();
                if ($deleted) {
                    return $user;
                }
            }
        } catch (Exception $e) {
            DB::rollBack();
        }
        return null;
    }
}
