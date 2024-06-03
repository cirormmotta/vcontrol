<?php

namespace App\Services;

use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Residence;

class ResidenceService extends BaseService
{
    public function list(Request $request)
    {
        $residence = Residence::orderBy('name', 'asc');
        $params = ['name'];
        $list = $this->paginate($this->handleFilters($request, $residence, $params), $request->page, $request->limit);
        return [
            'list' => $list->get(),
            'count' => Residence::count(),
        ];
    }
    public function find($id): ?Residence
    {
        return Residence::find($id);
    }
    public function create($request): ?Residence
    {
        try {
            DB::beginTransaction();
            $created = Residence::create([
                'name' => $request->name,
            ]);
            DB::commit();
            return $created;
        } catch (Exception $e) {
            DB::rollBack();
            return null;
        }
    }
    public function createOrUpdate(Request $request): ?Residence
    {
        return Residence::updateOrCreate([
            'id' => $request->id,
        ], [
            'name' => $request->name,
        ]);
    }
    public function update($request, $id): ?Residence
    {
        try {
            $residence = $this->find($id);
            if (!$residence)
                return null;
            DB::beginTransaction();
            $edited = $residence->update([
                'name' => $request->name,
            ]);
            DB::commit();
            if ($edited) {
                return $residence;
            }
        } catch (Exception $e) {
            DB::rollBack();
        }
        return null;
    }
    public function destroy($id): ?Residence
    {
        try {
            $residence = $this->find($id);
            if ($residence) {
                DB::beginTransaction();
                $deleted = $residence->delete();
                DB::commit();
                if ($deleted) {
                    return $residence;
                }
            }
        } catch (Exception $e) {
            DB::rollBack();
        }
        return null;
    }
}
