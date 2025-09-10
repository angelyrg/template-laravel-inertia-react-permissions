import { Dropdown, DropdownItem } from '@/Components/ui/Dropdown'
import { Icon } from '@/Components/ui/Icon'
import { usePage } from '@inertiajs/react'

export const UserProfile = () => {
    const { auth } = usePage().props
    const { user } = auth

    const trigger = (
        <button className="flex items-center space-x-2 rounded-lg bg-white p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary">
            <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-accent text-sm font-medium text-white">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden min-w-0 text-left md:block">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs text-gray-500">{user.role || 'Usuario'}</p>
                </div>
            </div>
            <Icon icon="chevronDown" className="h-4 w-4 flex-shrink-0" />
        </button>
    )

    return (
        <Dropdown trigger={trigger} align="right">
            <div className="border-b border-gray-100 px-4 py-3">
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="truncate text-sm text-gray-500">{user.email}</p>
                </div>
            </div>

            <DropdownItem href={route('profile.edit')}>
                <div className="flex items-center">
                    <Icon icon="user" className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">Mi Perfil</span>
                </div>
            </DropdownItem>

            <DropdownItem href={'#'}>
                <div className="flex items-center">
                    <Icon icon="settings" className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">Configuración</span>
                </div>
            </DropdownItem>

            <div className="border-t border-gray-100">
                <DropdownItem
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="w-full text-left"
                >
                    <div className="flex items-center text-red-600">
                        <Icon icon="logout" className="mr-2 h-4 w-4 flex-shrink-0" />
                        <span className="truncate">Cerrar Sesión</span>
                    </div>
                </DropdownItem>
            </div>
        </Dropdown>
    )
}
