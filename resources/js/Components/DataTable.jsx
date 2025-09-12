import { Icon } from '@iconify/react'
import { Link, router } from '@inertiajs/react'
import { useState } from 'react'

const DataTable = ({
    data,
    columns,
    resource,
    primaryKey = 'id',
    createRoute,
    showRoute,
    editRoute,
    deleteRoute,
    filters = {},
    canCreate = true,
    canView = true,
    canEdit = true,
    canDelete = true,
    title = 'Gestión de Recursos',
    searchPlaceholder = 'Buscar...',
    withFilters = false,
    children,
    current_page = 1,
    from = 0,
    to = 0,
    total = 0,
    per_page = 10,
    last_page = 1,
    next_page_url = '',
    prev_page_url = '',
}) => {
    const [sortField, setSortField] = useState('')
    const [sortDirection, setSortDirection] = useState('asc')
    const [searchTerm, setSearchTerm] = useState(filters.search || '')
    const [showFilters, setShowFilters] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])

    // Ordenamiento
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('asc')
        }

        router.get(
            route(route().current(), {
                ...route().params,
                sort: field,
                direction: sortField === field && sortDirection === 'asc' ? 'desc' : 'asc',
            })
        )
    }

    // Búsqueda
    const handleSearch = (e) => {
        const value = e.target.value
        setSearchTerm(value)

        // Debounce para evitar muchas solicitudes
        setTimeout(() => {
            router.get(
                route(route().current(), {
                    ...route().params,
                    search: value,
                    page: 1,
                }),
                {},
                {
                    preserveState: true,
                    replace: true,
                }
            )
        }, 500)
    }

    // Limpiar filtros
    const clearFilters = () => {
        const clearedFilters = Object.keys(filters).reduce((acc, key) => {
            acc[key] = ''
            return acc
        }, {})
        setSearchTerm('')

        router.get(
            route(route().current(), {
                ...route().params,
                ...clearedFilters,
                page: 1,
            }),
            {},
            {
                preserveState: true,
                replace: true,
            }
        )
    }

    // Eliminación
    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
            router.delete(route(deleteRoute, id))
        }
    }

    // Selección múltiple
    const toggleRowSelection = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        )
    }

    const toggleAllSelection = () => {
        if (selectedRows.length === data.length) {
            setSelectedRows([])
        } else {
            setSelectedRows(data.map((item) => item[primaryKey]))
        }
    }

    // Acciones por lotes
    const handleBatchDelete = () => {
        if (selectedRows.length === 0) return

        if (confirm(`¿Estás seguro de que deseas eliminar ${selectedRows.length} registros?`)) {
            router.post(
                route(`${resource}.batch-delete`),
                {
                    ids: selectedRows,
                },
                {
                    onFinish: () => setSelectedRows([]),
                }
            )
        }
    }

    // Paginación
    const handlePageChange = (url) => {
        if (url) {
            router.visit(url, {
                preserveState: true,
                preserveScroll: true,
            })
        }
    }

    // Función para generar números de página con elipsis
    const generatePageNumbers = () => {
        const current = current_page
        const last = last_page
        const delta = 2
        const range = []
        const rangeWithDots = []

        for (let i = 1; i <= last; i++) {
            if (i === 1 || i === last || (i >= current - delta && i <= current + delta)) {
                range.push(i)
            }
        }

        let prev = 0
        for (let i of range) {
            if (i - prev > 1) {
                rangeWithDots.push('...')
            }
            rangeWithDots.push(i)
            prev = i
        }

        return rangeWithDots
    }

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
            {/* Header con título y botones */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <div className="flex space-x-2">
                    {selectedRows.length > 0 && (
                        <button
                            onClick={handleBatchDelete}
                            className="flex items-center rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                            <Icon icon="mdi:delete" className="mr-1 h-4 w-4" />
                            Eliminar seleccionados ({selectedRows.length})
                        </button>
                    )}

                    {canCreate && (
                        <Link
                            href={route(createRoute)}
                            className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            <Icon icon="mdi:plus" className="mr-1 h-4 w-4" />
                            Crear
                        </Link>
                    )}
                </div>
            </div>

            {/* Barra de búsqueda y filtros */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
                    <div className="relative max-w-md flex-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Icon icon="mdi:magnify" className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={handleSearch}
                            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {withFilters && (
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
                            >
                                <Icon icon="mdi:filter" className="mr-1 h-4 w-4" />
                                Filtros
                            </button>

                            {(Object.values(filters).some((val) => val !== '') || searchTerm) && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
                                >
                                    <Icon icon="mdi:close" className="mr-1 h-4 w-4" />
                                    Limpiar
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Panel de filtros expandible */}
                {showFilters && withFilters && children}
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {/* Checkbox para selección múltiple */}
                            <th
                                scope="col"
                                className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedRows.length === data.length && data.length > 0}
                                    onChange={toggleAllSelection}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                            </th>

                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    scope="col"
                                    className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                    onClick={() => handleSort(column.key)}
                                >
                                    <div className="flex items-center">
                                        {column.label}
                                        {sortField === column.key &&
                                            (sortDirection === 'asc' ? (
                                                <Icon
                                                    icon="mdi:chevron-up"
                                                    className="ml-1 h-4 w-4"
                                                />
                                            ) : (
                                                <Icon
                                                    icon="mdi:chevron-down"
                                                    className="ml-1 h-4 w-4"
                                                />
                                            ))}
                                    </div>
                                </th>
                            ))}

                            {/* Columna de acciones */}
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {data && data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item[primaryKey]} className="hover:bg-gray-50">
                                    {/* Checkbox para selección de fila */}
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(item[primaryKey])}
                                            onChange={() => toggleRowSelection(item[primaryKey])}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </td>

                                    {columns.map((column) => (
                                        <td
                                            key={column.key}
                                            className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                                        >
                                            {column.render ? column.render(item) : item[column.key]}
                                        </td>
                                    ))}

                                    {/* Acciones */}
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                        <div className="flex space-x-2">
                                            {canView && showRoute && (
                                                <Link
                                                    href={route(showRoute, item[primaryKey])}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Ver"
                                                >
                                                    <Icon icon="mdi:eye" className="h-5 w-5" />
                                                </Link>
                                            )}

                                            {canEdit && editRoute && (
                                                <Link
                                                    href={route(editRoute, item[primaryKey])}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    title="Editar"
                                                >
                                                    <Icon icon="mdi:pencil" className="h-5 w-5" />
                                                </Link>
                                            )}

                                            {canDelete && deleteRoute && (
                                                <button
                                                    onClick={() => handleDelete(item[primaryKey])}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Eliminar"
                                                >
                                                    <Icon icon="mdi:delete" className="h-5 w-5" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length + 2}
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                >
                                    No se encontraron registros.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            {last_page > 1 && (
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                    <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                        <div className="text-sm text-gray-700">
                            Mostrando <span className="font-medium">{from}</span> a{' '}
                            <span className="font-medium">{to}</span> de{' '}
                            <span className="font-medium">{total}</span> resultados
                        </div>

                        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                            {prev_page_url && (
                                <button
                                    onClick={() => handlePageChange(prev_page_url)}
                                    className="flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    <Icon icon="mdi:chevron-left" className="mr-1 h-4 w-4" />
                                    Anterior
                                </button>
                            )}

                            <div className="flex flex-wrap justify-center gap-1">
                                {generatePageNumbers().map((page, index) =>
                                    page === '...' ? (
                                        <span
                                            key={`ellipsis-${index}`}
                                            className="px-2 py-1 text-gray-500"
                                        >
                                            ...
                                        </span>
                                    ) : (
                                        <button
                                            key={page}
                                            onClick={() => {
                                                const url = route(route().current(), {
                                                    ...route().params,
                                                    page: page,
                                                })
                                                handlePageChange(url)
                                            }}
                                            className={`min-w-[2.5rem] rounded-md border px-3 py-1.5 text-sm ${
                                                page === current_page
                                                    ? 'border-blue-500 bg-blue-500 text-white'
                                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}
                            </div>

                            {next_page_url && (
                                <button
                                    onClick={() => handlePageChange(next_page_url)}
                                    className="flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    Siguiente
                                    <Icon icon="mdi:chevron-right" className="ml-1 h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-center">
                        <span className="mr-2 text-sm text-gray-700">Mostrar:</span>
                        <select
                            value={per_page}
                            onChange={(e) => {
                                const url = route(route().current(), {
                                    ...route().params,
                                    per_page: e.target.value,
                                    page: 1,
                                })
                                handlePageChange(url)
                            }}
                            className="min-w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
                        >
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <span className="ml-2 text-sm text-gray-700">registros por página</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DataTable
