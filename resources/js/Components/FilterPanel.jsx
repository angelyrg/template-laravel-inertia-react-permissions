import { router } from '@inertiajs/react'

const FilterPanel = ({ filters }) => {
    const handleFilterChange = (name, value) => {
        router.get(
            route(route().current(), {
                ...route().params,
                [name]: value,
            }),
            {},
            {
                preserveState: true,
                replace: true,
            }
        )
    }

    return (
        <div className="mt-4 grid grid-cols-1 gap-4 rounded-md border border-gray-200 bg-white p-4 md:grid-cols-2 lg:grid-cols-3">
            {filters.map((filter) => (
                <div key={filter.name}>
                    <label
                        htmlFor={filter.name}
                        className="block text-sm font-medium text-gray-700"
                    >
                        {filter.label}
                    </label>

                    {filter.type === 'select' ? (
                        <select
                            id={filter.name}
                            name={filter.name}
                            value={filter.value || ''}
                            onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        >
                            <option value="">Todos</option>
                            {filter.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={filter.type || 'text'}
                            id={filter.name}
                            name={filter.name}
                            value={filter.value || ''}
                            onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        />
                    )}
                </div>
            ))}
        </div>
    )
}

export default FilterPanel
