import Modal from '@/Components/ui/Modal'
import PrimaryButton from '@/Components/ui/PrimaryButton'
import TextInput from '@/Components/ui/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, usePage } from '@inertiajs/react'
import { DataGrid } from '@mui/x-data-grid'
import { esES } from '@mui/x-data-grid/locales'
import { useState } from 'react'

export default function Index() {
    const { users, errors } = usePage().props

    // Estados de modales
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [formData, setFormData] = useState({ id: null, name: '', email: '' })
    const [deleteId, setDeleteId] = useState(null)

    const rows = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
    }))

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nombre', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
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
        setFormData({ id: null, name: '', email: '' })
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
            router.put(`/users/${formData.id}`, formData, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setIsFormOpen(false),
                onFinish: () => setIsProcessing(false),
            })
        } else {
            router.post(`/users`, formData, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setIsFormOpen(false),
                onFinish: () => setIsProcessing(false),
            })
        }
    }

    const confirmDelete = () => {
        setIsProcessing(true)
        router.delete(`/users/${deleteId}`, {
            onSuccess: () => setIsDeleteOpen(false),
            onFinish: () => setIsProcessing(false),
        })
    }

    return (
        <AuthenticatedLayout title={'Usuarios'}>
            <Head title="Usuarios" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="mb-4 text-2xl font-bold">Usuarios</h1>
                    <PrimaryButton onClick={handleAdd}>Nuevo</PrimaryButton>
                </div>

                <div style={{ height: 800, width: '100%' }}>
                    <DataGrid
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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
                            {formData.id ? 'Editar Usuario' : 'Nuevo Usuario'}
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

                            <TextInput
                                type="email"
                                label="Email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                error={errors?.email}
                            />

                            <div className="flex justify-end gap-2">
                                <PrimaryButton
                                    variant="secondary"
                                    onClick={() => setIsFormOpen(false)}
                                >
                                    Cancelar
                                </PrimaryButton>
                                <PrimaryButton type="submit" loading={isProcessing}>
                                    Guardar
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </Modal>

                {/* Modal Delete Confirmation */}
                <Modal show={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                    <div className="p-6">
                        <h2 className="mb-4 text-xl font-bold">Confirmar Eliminación</h2>
                        <p>¿Seguro que deseas eliminar este usuario?</p>
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
