<?php
namespace App\Services;

use Illuminate\Http\Request;

class BaseService
{
    public function handleFilters(Request $request, $enloque, $params = [])
    {
        $filters = $request->only($params);
        if ($filters) {
            foreach ($params as $param) {
                if (isset($filters[$param]) && $filters[$param] !== null) {
                    $filter = join("%",explode(" ", $filters[$param]));
                    $enloque = $enloque->where($param, 'like', '%' . $filter . '%');
                }
            }
        }
        return $enloque;
    }
    public function paginate($enloque, $page, $limit)
    {
        if($page !== null && $limit !== null) {
            $limit = $limit ? intval($limit) : 10;
            $page = $page ? intval($page) : 0;
            $enloque = $enloque->offset($page * $limit)->take($limit);
        }
        return $enloque;
    }
}
