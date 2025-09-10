import { Icon } from '@/Components/ui/Icon'
import { usePage } from '@inertiajs/react'
import { Notifications } from './Notifications'
import { UserProfile } from './UserProfile'

export const Navbar = ({ title = 'Dashboard', onMenuToggle, showMobileMenuButton = true }) => {
    const { auth } = usePage().props

    return (
        <nav className="px-6 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    {showMobileMenuButton && (
                        <button
                            onClick={onMenuToggle}
                            className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Toggle menu"
                        >
                            <Icon icon="menu" className="h-5 w-5" />
                        </button>
                    )}

                    <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <Notifications />
                    <UserProfile />
                </div>
            </div>
        </nav>
    )
}
