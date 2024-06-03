<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserType extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'name',
        'abilities'
    ];
    public function jsonSerialize():Array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'abilities' => json_decode($this->abilities),
        ];
    }
}
