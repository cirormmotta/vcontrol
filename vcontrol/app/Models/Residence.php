<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Residence extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'name',
    ];
    public function residents(): HasMany
    {
        return $this->hasMany(Resident::class, 'residences_id', 'id');
    }
    public function jsonSerialize(): array
    {
        return [
            'residents' => $this->residents,
            'id' => $this->id,
            'name' => $this->name,
        ];

    }
}
