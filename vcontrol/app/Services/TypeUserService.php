<?php

namespace App\Services;

use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use App\Models\UserType;

class TypeUserService
{
    public function allUserTypes(): ?Collection
    {
        return UserType::orderBy('name', 'asc')->get();
    }
    public function findUserType($id): ?UserType
    {
        return UserType::find($id);
    }
    public function createUserType($request): ?UserType
    {
        try {
            DB::beginTransaction();
            $createdTypeUser = UserType::create([
                'name' => $request->name,
                'abilities' => json_encode($request->abilities),
            ]);
            DB::commit();
            return $createdTypeUser;
        } catch (Exception $e) {
            DB::rollBack();
            return null;
        }
    }
    public function updateUserType($user, $id): ?UserType
    {
        try {
            $userType = $this->findUserType($id);
            if (!$userType)
                return null;
            DB::beginTransaction();
            $edited = $userType->update([
                'name' => $user->name,
                'abilities' => json_encode($user->abilities),
            ]);
            DB::commit();
            if ($edited) {
                return $userType;
            }
        } catch (Exception $e) {
            DB::rollBack();
        }
        return null;
    }
    public function destroy($id): ?UserType
    {
        try {
            $userType = $this->findUserType($id);
            if ($userType) {
                DB::beginTransaction();
                $deleted = $userType->delete();
                DB::commit();
                if ($deleted) {
                    return $userType;
                }
            }
        } catch (Exception $e) {
            DB::rollBack();
        }
        return null;
    }
}
