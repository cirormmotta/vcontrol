<?php

namespace App\Services;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Visitor;

class VisitorService extends BaseService
{
    public function list(int|null $page, int|null $limit, Request $request)
    {
        $visitor = Visitor::orderBy('name', 'asc');
        $params = ['name', 'cpf'];
        $filtered = $this->handleFilters($request, $visitor, $params);
        $count = $filtered->count();
        $list = $this->paginate($filtered, $request->page, $request->limit);
        return [
            'list' => $list->get(),
            'count' => $count,
        ];
    }
    public function find($id): ?Visitor
    {
        return Visitor::find($id);
    }
    public function create($request): ?Visitor
    {
        try {
            DB::beginTransaction();
            $created = Visitor::create([
                'name' => $request->name,
                'cpf' => $request->cpf,
                'picture' => $request->picture,
                'phone' => $request->phone,
            ]);
            DB::commit();
            return $created;
        } catch (Exception $e) {
            DB::rollBack();
            return null;
        }
    }
    public function createOrUpdate($request): ?Visitor
    {
        return Visitor::updateOrCreate(
            [
                'id' => $request['id'],
            ],
            [
                'name' => $request['name'],
                'cpf' => $request['cpf'],
                'picture' => $request['picture'],
                'phone' => $request['phone'],
            ]
        );
    }
    public function update($request, $id): ?Visitor
    {
        try {
            $visitor = $this->find($id);
            if (!$visitor)
                return null;
            DB::beginTransaction();
            $edited = $visitor->update([
                'name' => $request->name,
                'cpf' => $request->cpf,
                'picture' => $request->picture,
                'phone' => $request->phone,
            ]);
            DB::commit();
            if ($edited) {
                return $visitor;
            }
        } catch (Exception $e) {
            DB::rollBack();
        }
        return null;
    }
    public function destroy($id): ?Visitor
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
