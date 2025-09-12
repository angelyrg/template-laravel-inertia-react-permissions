import DataTable from '@/Components/DataTable'
import FilterPanel from '@/Components/FilterPanel'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

const UserIndex = ({ users, filters }) => {
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nombre' },
        { key: 'email', label: 'Correo Electrónico' },
        {
            key: 'email_verified_at',
            label: 'Verificado',
            render: (item) =>
                item.email_verified_at ? (
                    <span className="text-green-600">Sí</span>
                ) : (
                    <span className="text-red-600">No</span>
                ),
        },
        {
            key: 'created_at',
            label: 'Fecha de Creación',
            render: (item) => new Date(item.created_at).toLocaleDateString('es-ES'),
        },
        {
            key: 'roles',
            label: 'Roles',
            render: (item) => (
                <div className="flex flex-wrap gap-1">
                    {item.roles && item.roles.length > 0 ? (
                        item.roles.map((role) => (
                            <span
                                key={role.id}
                                className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                            >
                                {role.name}
                            </span>
                        ))
                    ) : (
                        <span className="text-sm text-gray-500">Sin roles</span>
                    )}
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Estado',
            render: (item) => (
                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.email_verified_at
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                    }`}
                >
                    {item.email_verified_at ? 'Activo' : 'Pendiente'}
                </span>
            ),
        },
    ]

    const filterOptions = [
        {
            name: 'verified',
            label: 'Estado de verificación',
            type: 'select',
            value: filters.verified || '',
            options: [
                { value: 'verified', label: 'Verificados' },
                { value: 'unverified', label: 'No verificados' },
            ],
        },
        {
            name: 'role',
            label: 'Rol',
            type: 'select',
            value: filters.role || '',
            options: [
                { value: 'admin', label: 'Administrador' },
                { value: 'user', label: 'Usuario' },
                { value: 'manager', label: 'Manager' },
            ],
        },
        {
            name: 'date_from',
            label: 'Desde',
            type: 'date',
            value: filters.date_from || '',
        },
        {
            name: 'date_to',
            label: 'Hasta',
            type: 'date',
            value: filters.date_to || '',
        },
    ]

    return (
        <AuthenticatedLayout title="Usuarios">
            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <DataTable
                        data={users.data}
                        columns={columns}
                        resource="users"
                        primaryKey="id"
                        createRoute="users.create"
                        showRoute="users.show"
                        editRoute="users.edit"
                        deleteRoute="users.destroy"
                        filters={filters}
                        title="Gestión de Usuarios"
                        searchPlaceholder="Buscar usuarios por nombre o email..."
                        withFilters={true}
                        canCreate={true}
                        canView={true}
                        canEdit={true}
                        canDelete={true}
                        current_page={users.current_page}
                        from={users.from}
                        to={users.to}
                        total={users.total}
                        per_page={users.per_page}
                        last_page={users.last_page}
                        links={users.links}
                        first_page_url={users.first_page_url}
                        last_page_url={users.last_page_url}
                        next_page_url={users.next_page_url}
                        prev_page_url={users.prev_page_url}
                    >
                        <FilterPanel filters={filterOptions} />
                    </DataTable>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default UserIndex
