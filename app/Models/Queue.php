<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Queue extends Model
{
    protected $table = 'queue';
    protected $fillable = ['link', 'ip'];
}
