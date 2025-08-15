<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::select('id', 'name', 'email')->get();
        return Inertia::render('Users/Index', ['users' => $users]);
    }

    public function store(StoreUserRequest $request)
    {
        try {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => 'password',
            ]);

            return redirect()->back()->with('success', 'Usuario creado correctamente.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->with('error', 'Ocurrió un error al crear el usuario.');
        }
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            $user->update($request->only(['name', 'email']));

            return redirect()->back()->with('success', 'Usuario actualizado correctamente.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Ocurrió un error al actualizar el usuario.');
        }
    }

    public function destroy(User $user)
    {
        try {
            $user->delete();

            return redirect()->back()->with('success', 'Usuario eliminado correctamente.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->with('error', 'No se pudo eliminar el usuario.');
        }
    }
}
