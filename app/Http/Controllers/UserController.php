<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with('roles')
            ->when($request->search, function ($q, $search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->when($request->verified === 'verified', function ($q) {
                $q->whereNotNull('email_verified_at');
            })
            ->when($request->verified === 'unverified', function ($q) {
                $q->whereNull('email_verified_at');
            })
            ->when($request->role, function ($q, $role) {
                $q->whereHas('roles', function ($query) use ($role) {
                    $query->where('name', $role);
                });
            })
            ->when($request->date_from, function ($q, $dateFrom) {
                $q->whereDate('created_at', '>=', $dateFrom);
            })
            ->when($request->date_to, function ($q, $dateTo) {
                $q->whereDate('created_at', '<=', $dateTo);
            });

        // Ordenamiento
        if ($request->has('sort')) {
            $query->orderBy($request->sort, $request->direction ?? 'asc');
        } else {
            $query->latest();
        }

        $users = $query->paginate($request->per_page ?? 15)->withQueryString();

        return Inertia::render('Users/UserIndex', [
            'users' => $users,
            'filters' => $request->all(['search', 'verified', 'role', 'date_from', 'date_to']),
        ]);
    }

    public function batchDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:users,id',
        ]);

        // Prevenir que el usuario actual se elimine a sí mismo
        $filteredIds = array_filter($request->ids, function ($id) {
            return $id != auth()->id;
        });

        if (count($filteredIds)) {
            User::whereIn('id', $filteredIds)->delete();
            return redirect()->back()->with('success', 'Usuarios eliminados correctamente.');
        }

        return redirect()->back()->with('error', 'No se pueden eliminar los usuarios seleccionados.');
    }



    public function index__old()
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
