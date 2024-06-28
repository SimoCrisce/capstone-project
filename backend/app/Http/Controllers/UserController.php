<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::get();
        return $users;
    }

    public function show($id)
    {
        $user = User::with('reservations')->find($id);
        return [
            'success' => true,
            'data' => $user
        ];
    }
}
