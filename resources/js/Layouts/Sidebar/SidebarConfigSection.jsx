import { Icon } from '@/Components/ui/Icon'
import { useLayout } from '@/Contexts/LayoutContext'
import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export const SidebarConfigSection = ({ user }) => {
    const { sidebarCollapsed, currentTheme, toggleTheme } = useLayout()
    const [isConfigOpen, setIsConfigOpen] = useState(false)
    const [localTheme, setLocalTheme] = useState(currentTheme)

    // Sincronizar el tema local cuando cambie el tema global
    useEffect(() => {
        setLocalTheme(currentTheme)
    }, [currentTheme])

    const toggleConfig = () => setIsConfigOpen(!isConfigOpen)

    const handleThemeToggle = () => {
        toggleTheme()
        // Forzar actualización inmediata del estado local
        setLocalTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    return (
        <div className="group border-t border-gray-200 p-4 dark:border-gray-700">
            {/* Botón principal de configuración */}
            <button
                onClick={toggleConfig}
                className="flex w-full items-center rounded-md p-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                <Icon icon="settings" className="h-5 w-5 text-gray-400" />

                {!sidebarCollapsed && (
                    <>
                        <span className="ml-3 flex-1 text-left">Configuración</span>
                        <Icon
                            icon="chevron-down"
                            className={`h-4 w-4 transition-transform duration-200 ${isConfigOpen ? 'rotate-180 transform' : ''}`}
                        />
                    </>
                )}
            </button>

            {/* Menú desplegable de configuración */}
            {isConfigOpen && !sidebarCollapsed && (
                <div className="mt-2 space-y-1 pl-11">
                    {/* Tema claro/oscuro */}
                    <button
                        onClick={handleThemeToggle}
                        className="flex w-full items-center rounded-md px-2 py-1 text-sm text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <Icon
                            icon={localTheme === 'light' ? 'moon' : 'sun'}
                            className="mr-2 h-4 w-4"
                        />
                        {localTheme === 'light' ? 'Modo oscuro' : 'Modo claro'}
                    </button>

                    {/* Separador */}
                    <div className="my-1 border-t border-gray-200 dark:border-gray-600"></div>

                    {/* Información del usuario (más discreta) */}
                    <div className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                        <div className="truncate">{user.name}</div>
                        <div className="truncate">{user.email}</div>
                    </div>

                    {/* Cerrar sesión */}
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex w-full items-center rounded-md px-2 py-1 text-sm text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <Icon icon="log-out" className="mr-2 h-4 w-4" />
                        Cerrar sesión
                    </Link>
                </div>
            )}

            {/* Tooltip para modo colapsado */}
            {sidebarCollapsed && (
                <div className="invisible absolute bottom-2 left-14 z-50 w-56 origin-bottom-left rounded-md bg-white opacity-0 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 focus:outline-none group-hover:visible group-hover:opacity-100 dark:bg-gray-800">
                    <div className="border-b border-gray-100 px-3 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-200">
                        Configuración
                    </div>
                    <div className="py-1">
                        <button
                            onClick={handleThemeToggle}
                            className="flex w-full items-center px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                            <Icon
                                icon={localTheme === 'light' ? 'moon' : 'sun'}
                                className="mr-2 h-4 w-4"
                            />
                            {localTheme === 'light' ? 'Modo oscuro' : 'Modo claro'}
                        </button>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="flex w-full items-center px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                            <Icon icon="log-out" className="mr-2 h-4 w-4" />
                            Cerrar sesión
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
