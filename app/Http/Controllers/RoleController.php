<?php

namespace App\Http\Controllers;

use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::with('permissions')->get();
        $permissions = Permission::all();

        return Inertia::render('Roles/Index', [
            'roles' => $roles,
            'permissions' => $permissions
        ]);
    }

    public function store(StoreRoleRequest $request)
    {
        try {
            $role = Role::create([
                'name' => $request->name,
                'guard_name' => 'web',
            ]);

            if ($request->has('permissions')) {
                $role->syncPermissions($request->permissions);
            }

            return redirect()->back()->with('success', 'Rol creado correctamente.');
        } catch (\Exception $e) {
            Log::error('Error al crear rol', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            return redirect()->back()->with('error', 'Ocurrió un error al crear el rol.');
        }
    }

    public function update(UpdateRoleRequest $request, Role $role)
    {
        try {
            $role->update($request->only(['name']));

            if ($request->has('permissions')) {
                $role->syncPermissions($request->permissions);
            }

            return redirect()->back()->with('success', 'Rol actualizado correctamente.');
        } catch (\Exception $e) {
            Log::error('Error al actualizar rol', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            return redirect()->back()->with('error', 'Ocurrió un error al actualizar el rol.');
        }
    }

    public function destroy(Role $role)
    {
        try {
            $role->delete();

            return redirect()->back()->with('success', 'Rol eliminado correctamente.');
        } catch (\Exception $e) {
            Log::error('Error al eliminar rol', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            return redirect()->back()->with('error', 'No se pudo eliminar el role.');
        }
    }
}
