<?php

namespace App\Services;

use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Resident;

class ResidentService extends BaseService
{
    public function list($request)
    {
        $residence = Resident::orderBy('name', 'asc');
        $params = ['name'];
        $list = $this->paginate($this->handleFilters($request, $residence, $params), $request->page, $request->limit);
        return [
            'list' => $list->get(),
            'count' => Resident::count(),
        ];
    }
    public function find($id): ?Resident
    {
        return Resident::with('residence')->find($id);
    }
    public function createOrUpdate($request): ?Resident
    {
        return Resident::updateOrCreate(
            [
                'id' => $request['id'],
            ],
            [
                'name' => $request[ 'name'],
                'phone' => $request['phone'],
                'residences_id' => $request['residences_id'],
            ]
        );
    }
    public function create(Request $request): ?Resident
    {
        try {
            DB::beginTransaction();
            $created = Resident::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'residences_id' => $request->residences_id,
            ]);
            DB::commit();
            return $created;
        } catch (Exception $e) {
            DB::rollBack();
            return null;
        }
    }
    public function update(Request $request, string $id): ?Resident
    {
        try {
            $resident = Resident::find($id);
            if (!$resident)
                return null;
            DB::beginTransaction();
            $edited = $resident->update([
                'name' => $request->name,
                'phone' => $request->phone,
                'residences_id' => $request->residences_id,
            ]);
            DB::commit();
            if ($edited) {
                return $resident;
            }
        } catch (Exception $e) {
            DB::rollBack();
        }
        return null;
    }
    public function destroy(string $id): ?Resident
    {
        try {
            $resident = $this->find($id);
            if ($resident) {
                DB::beginTransaction();
                $deleted = $resident->delete();
                DB::commit();
                if ($deleted) {
                    return $resident;
                }
            }
        } catch (Exception $e) {
            DB::rollBack();
        }
        return null;
    }
}
