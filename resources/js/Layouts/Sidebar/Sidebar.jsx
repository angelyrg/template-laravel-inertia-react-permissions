import { useLayout } from '@/Contexts/LayoutContext'
import { usePage } from '@inertiajs/react'
import { SidebarConfigSection } from './SidebarConfigSection'
import { SidebarHeader } from './SidebarHeader'
import { SidebarNav } from './SidebarNav'

export const Sidebar = () => {
    const { sidebarCollapsed, mobileMenuOpen, setMobileMenuOpen } = useLayout()
    const user = usePage().props.auth.user

    const closeMobileMenu = () => {
        if (window.innerWidth < 768) {
            setMobileMenuOpen(false)
        }
    }

    return (
        <>
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-primary text-white transition-all duration-300 ease-in-out dark:bg-gray-800 md:relative ${sidebarCollapsed ? 'w-16' : 'w-64'} ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} `}
            >
                <SidebarHeader />

                <div className="flex-1 overflow-y-auto py-4">
                    <SidebarNav onItemClick={closeMobileMenu} />
                </div>

                <SidebarConfigSection user={user} />
            </aside>
        </>
    )
}
