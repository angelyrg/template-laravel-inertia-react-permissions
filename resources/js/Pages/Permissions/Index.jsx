import Modal from '@/Components/ui/Modal'
import PrimaryButton from '@/Components/ui/PrimaryButton'
import TextInput from '@/Components/ui/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { router, usePage } from '@inertiajs/react'
import { DataGrid } from '@mui/x-data-grid'
import { esES } from '@mui/x-data-grid/locales'
import { useState } from 'react'

export default function Index() {
    const { permissions, errors } = usePage().props

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [formData, setFormData] = useState({ id: null, name: '' })
    const [deleteId, setDeleteId] = useState(null)

    const rows = permissions.map((rol) => ({
        id: rol.id,
        name: rol.name,
    }))

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nombre', flex: 1 },
        {
            field: 'actions',
            headerName: 'Acciones',
            sortable: false,
            filterable: false,
            width: 200,
            renderCell: (params) => (
                <div className="flex gap-2">
                    <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEdit(params.row)}
                    >
                        Editar
                    </button>
                    <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDeleteClick(params.row.id)}
                    >
                        Eliminar
                    </button>
                </div>
            ),
        },
    ]

    const handleEdit = (row) => {
        setFormData(row)
        setIsFormOpen(true)
        router.reload({ only: ['errors'], preserveScroll: true })
    }

    const handleAdd = () => {
        setFormData({ id: null, name: '' })
        setIsFormOpen(true)
        router.reload({ only: ['errors'], preserveScroll: true })
    }

    const handleDeleteClick = (id) => {
        setDeleteId(id)
        setIsDeleteOpen(true)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setIsProcessing(true)
        if (formData.id) {
            router.put(`/permissions/${formData.id}`, formData, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setIsFormOpen(false),
                onFinish: () => setIsProcessing(false),
            })
        } else {
            router.post(`/permissions`, formData, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setIsFormOpen(false),
                onFinish: () => setIsProcessing(false),
            })
        }
    }

    const confirmDelete = () => {
        setIsProcessing(true)
        router.delete(`/permissions/${deleteId}`, {
            onSuccess: () => setIsDeleteOpen(false),
            onFinish: () => setIsProcessing(false),
        })
    }

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <div className="mb-6 rounded-lg bg-red-200 p-6 text-red-600">
                    <p className="text-xl font-extrabold">🛡️¡Atención!</p>
                    <p>
                        Esta sección está destinada exclusivamente al
                        <strong> superadministrador</strong>. Realiza cambios
                        aquí solo si estás completamente seguro, ya que
                        cualquier modificación podría afectar el funcionamiento
                        del sistema.
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <h1 className="mb-4 text-2xl font-bold">Roles</h1>
                    <PrimaryButton onClick={handleAdd}>Nuevo</PrimaryButton>
                </div>

                <div style={{ height: 800, width: '100%' }}>
                    <DataGrid
                        localeText={
                            esES.components.MuiDataGrid.defaultProps.localeText
                        }
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        showToolbar
                        rowsPerPageOptions={[5, 10, 25, 50]}
                    />
                </div>

                {/* Modal Form */}
                <Modal show={isFormOpen} onClose={() => setIsFormOpen(false)}>
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-xl font-bold">
                            {formData.id ? 'Editar Rol' : 'Nuevo Rol'}
                        </h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <TextInput
                                label="Nombre"
                                placeholder="Nombre"
                                value={formData.name}
                                required
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                error={errors?.name}
                            />
                            <div className="flex justify-end gap-2">
                                <PrimaryButton
                                    variant="secondary"
                                    onClick={() => setIsFormOpen(false)}
                                >
                                    Cancelar
                                </PrimaryButton>
                                <PrimaryButton
                                    type="submit"
                                    loading={isProcessing}
                                >
                                    Guardar
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </Modal>

                {/* Modal Delete Confirmation */}
                <Modal
                    show={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                >
                    <div className="p-6">
                        <h2 className="mb-4 text-xl font-bold">
                            Confirmar Eliminación
                        </h2>
                        <p>¿Seguro que deseas eliminar este rol?</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <PrimaryButton
                                variant="secondary"
                                onClick={() => setIsDeleteOpen(false)}
                            >
                                Cancelar
                            </PrimaryButton>
                            <PrimaryButton
                                variant="danger"
                                onClick={confirmDelete}
                                loading={isProcessing}
                            >
                                Eliminar
                            </PrimaryButton>
                        </div>
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    )
}
