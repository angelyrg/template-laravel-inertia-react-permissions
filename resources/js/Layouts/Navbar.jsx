import { Icon } from '@/Components/ui/Icon'
import { useLayout } from '@/Contexts/LayoutContext'
import { Notifications } from './Notifications'
import { ThemeToggle } from './ThemeToggle'
import { UserProfile } from './UserProfile'

export const Navbar = ({ title = 'Dashboard' }) => {
    const { mobileMenuOpen, setMobileMenuOpen, sidebarCollapsed, setSidebarCollapsed } = useLayout()

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    return (
        <nav className="px-4 py-3 dark:bg-gray-800 md:px-8 lg:px-12">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleMobileMenu}
                        className="focus:ring-primary-500 rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:hidden"
                        aria-label="Toggle menu"
                    >
                        <Icon icon="menu" className="h-5 w-5" />
                    </button>

                    <button
                        onClick={toggleSidebar}
                        className="focus:ring-primary-500 hidden rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:block"
                        aria-label="Toggle sidebar"
                    >
                        <Icon
                            icon={
                                sidebarCollapsed
                                    ? 'mdi:chevron-right-last'
                                    : 'mdi:chevron-left-first'
                            }
                            className="h-5 w-5"
                        />
                    </button>

                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
                </div>

                <div className="flex items-center space-x-3">
                    <ThemeToggle />
                    <Notifications />
                    <UserProfile />
                </div>
            </div>
        </nav>
    )
}
