<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class member extends Model
{
    use HasFactory;
    protected $table = 'tblMember';
    protected $fillable = ['FullName', 'Email', 'Mobile', 'User', 'UserImage', 'updated_at', 'created_at'];
}
