<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Visit extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'car_license_plate',
        'residences_id',
        'residents_id',
        'type_visits_id',
        'visitors_id',
        'leave_at'
    ];
    public function residence(): HasOne
    {
        return $this->hasOne(Residence::class, 'id', 'residences_id');
    }
    public function resident(): HasOne
    {
        return $this->hasOne(Resident::class, 'id', 'residents_id');
    }
    public function typeVisit(): HasOne
    {
        return $this->hasOne(TypeVisit::class, 'id', 'type_visits_id');
    }
    public function visitor(): HasOne
    {
        return $this->hasOne(Visitor::class, 'id', 'visitors_id');
    }
}
