<?php

namespace App\Http\Controllers;

use App\Http\Requests\Permission\StorePermissionRequest;
use App\Http\Requests\Permission\UpdatePermissionRequest;
use App\Models\Permission;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::all();
        return Inertia::render('Permissions/Index', ['permissions' => $permissions]);
    }

    public function store(StorePermissionRequest $request)
    {
        try {
            Permission::create([
                'name' => $request->name,
                'guard_name' => 'web',
            ]);

            return redirect()->back()->with('success', 'Permiso creado correctamente.');
        } catch (\Exception $e) {
            Log::error('Error al crear permiso', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            return redirect()->back()->with('error', 'Ocurrió un error al crear el permiso.');
        }
    }

    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        try {
            $permission->update($request->only(['name']));

            return redirect()->back()->with('success', 'Permiso actualizado correctamente.');
        } catch (\Exception $e) {
            Log::error('Error al actualizar permiso', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            return redirect()->back()->with('error', 'Ocurrió un error al actualizar el permiso.');
        }
    }

    public function destroy(Permission $permission)
    {
        try {
            $permission->delete();

            return redirect()->back()->with('success', 'Permiso eliminado correctamente.');
        } catch (\Exception $e) {
            Log::error('Error al eliminar permiso', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            return redirect()->back()->with('error', 'No se pudo eliminar el permiso.');
        }
    }
}
