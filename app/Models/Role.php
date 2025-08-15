<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasPermissions;

class Role extends Model
{
    use HasFactory, HasPermissions;

    protected $table = 'roles';

    protected $fillable = [
        'name',
        'guard_name',
    ];
}
