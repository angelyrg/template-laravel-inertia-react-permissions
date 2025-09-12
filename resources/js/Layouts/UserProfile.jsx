import { Icon } from '@/Components/ui/Icon'
import { Link, usePage } from '@inertiajs/react'
import { useState } from 'react'

export const UserProfile = () => {
    const { auth } = usePage().props
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:ring-primary-500 flex items-center space-x-2 rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 dark:text-gray-300 dark:hover:bg-gray-700"
                aria-label="User menu"
            >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-semibold text-white">
                    {auth.user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden text-sm font-medium md:block">{auth.user.name}</span>
                <Icon icon="chevron-down" className="h-4 w-4" />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white py-1 shadow-lg dark:bg-gray-800">
                    <div className="border-b border-gray-200 px-4 py-2 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {auth.user.name}
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            {auth.user.email}
                        </p>
                    </div>

                    <Link
                        href={route('profile.edit')}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                        onClick={() => setIsOpen(false)}
                    >
                        <Icon icon="user" className="mr-2 inline h-4 w-4" />
                        Tu perfil
                    </Link>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                        onClick={() => setIsOpen(false)}
                    >
                        <Icon icon="logout" className="mr-2 inline h-4 w-4" />
                        Cerrar sesión
                    </Link>
                </div>
            )}
        </div>
    )
}
