<?php

namespace App\Services;

use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Visit;

class VisitService extends BaseService
{
    public function list(Request $request)
    {
        $list = Visit::orderBy('leave_at', 'asc')->orderBy('created_at', 'desc');
        $searchString = $request->name;
        if ($searchString) {
            $list = $list->orWhereHas('visitor', function ($query) use ($searchString) {
                $query->where('name', 'like', '%' . $searchString . '%');
            });
            $list = $list->orWhereHas('resident', function ($query) use ($searchString) {
                $query->where('name', 'like', '%' . $searchString . '%');
            });
            $list = $list->orWhereHas('residence', function ($query) use ($searchString) {
                $query->where('name', 'like', '%' . $searchString . '%');
            });
        }
        if ($request->last12hours) {
            $list = $list->where('created_at', '>=', Carbon::now()->subHours(12));
        }
        if ($request->leaveNull) {
            $list = $list->where('leave_at', '=', null);
        }
        $list = $list->with(['resident', 'visitor', 'residence', 'typeVisit']);
        $count = $list->count();
        $list = $this->paginate($list, $request->page, $request->limit);
        return [
            'list' => $list->get(),
            'count' => $count,
        ];
    }
    public function find($id): ?Visit
    {
        return Visit::with(
            'residence',
            'resident',
            'typeVisit',
            'visitor',
            'residence.residents'
        )->find($id);
    }
    public function create($request): ?Visit
    {
        try {
            DB::beginTransaction();
            $created = Visit::create([
                'car_license_plate' => $request->car_license_plate,
                'residences_id' => $request->residences_id,
                'residents_id' => $request->residents_id,
                'type_visits_id' => $request->type_visits_id,
                'visitors_id' => $request->visitors_id,
            ]);
            DB::commit();
            return $created;
        } catch (Exception $e) {
            DB::rollBack();
            return null;
        }
    }
    public function update($request, $id): ?Visit
    {
        try {
            $visit = $this->find($id);
            if (!$visit)
                return null;
            DB::beginTransaction();
            $edited = $visit->update([
                'car_license_plate' => $request->car_license_plate,
                'residences_id' => $request->residences_id,
                'residents_id' => $request->residents_id,
                'type_visits_id' => $request->type_visits_id,
                'visitors_id' => $request->visitors_id,
            ]);
            DB::commit();
            if ($edited) {
                return $visit;
            }
        } catch (Exception $e) {
            DB::rollBack();
        }
        return null;
    }
    public function leaveVisit($id): ?Visit
    {
        try {
            $visit = $this->find($id);
            if (!$visit)
                return null;
            DB::beginTransaction();
            $edited = $visit->update([
                'leave_at' => Carbon::now(),
            ]);
            DB::commit();
            if ($edited) {
                return $visit;
            }
        } catch (Exception $e) {
            DB::rollBack();
        }
        return null;
    }
    public function destroy($id): ?Visit
    {
        try {
            $visitor = $this->find($id);
            if ($visitor) {
                DB::beginTransaction();
                $deleted = $visitor->delete();
                DB::commit();
                if ($deleted) {
                    return $visitor;
                }
            }
        } catch (Exception $e) {
            DB::rollBack();
        }
        return null;
    }
}
