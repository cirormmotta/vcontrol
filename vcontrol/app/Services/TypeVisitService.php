<?php

namespace App\Services;

use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use App\Models\TypeVisit;

class TypeVisitService
{
    public function list(): ?Collection
    {
        return TypeVisit::orderBy('name', 'asc')->get();
    }
    public function find($id): ?TypeVisit
    {
        return TypeVisit::find($id);
    }
    public function create($request): ?TypeVisit
    {
        try {
            DB::beginTransaction();
            $created = TypeVisit::create([
                'name' => $request->name,
            ]);
            DB::commit();
            return $created;
        } catch (Exception $e) {
            DB::rollBack();
            return null;
        }
    }
    public function update($request, $id): ?TypeVisit
    {
        try {
            $typeVisit = $this->find($id);
            if (!$typeVisit)
                return null;
            DB::beginTransaction();
            $edited = $typeVisit->update([
                'name' => $request->name,
            ]);
            DB::commit();
            if ($edited) {
                return $typeVisit;
            }
        } catch (Exception $e) {
            DB::rollBack();
        }
        return null;
    }
    public function destroy($id): ?TypeVisit
    {
        try {
            $destroyed = $this->find($id);
            if ($destroyed) {
                DB::beginTransaction();
                $deleted = $destroyed->delete();
                DB::commit();
                if ($deleted) {
                    return $destroyed;
                }
            }
        } catch (Exception $e) {
            DB::rollBack();
        }
        return null;
    }
}
