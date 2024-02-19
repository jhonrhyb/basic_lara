<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class userAcct extends Model
{
    use HasFactory;
    protected $table = 'tblUserAcct';
    protected $fillable = ['UserName','Password','updated_at','created_at'];
}