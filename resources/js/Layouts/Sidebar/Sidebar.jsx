// components/layout/Sidebar/Sidebar.jsx
import { Icon } from '@/Components/ui/Icon'
import { usePage } from '@inertiajs/react'
import { SidebarHeader } from './SidebarHeader'
import { SidebarNavItem } from './SidebarNavItem'
import { SidebarUserSection } from './SidebarUserSection'

export const Sidebar = ({ isCollapsed, isMobile, isMobileMenuOpen, onToggle }) => {
    const user = usePage().props.auth.user

    return (
        <aside
            className={` ${isMobile ? 'fixed inset-y-0 left-0 z-30 transform transition-transform duration-300' : 'relative'} ${isMobile && !isMobileMenuOpen ? '-translate-x-full' : 'translate-x-0'} flex flex-col bg-primary text-white ${isCollapsed ? 'w-16' : 'w-56'} `}
        >
            <SidebarHeader isCollapsed={isCollapsed} onToggle={onToggle} />

            <nav className="flex-1 overflow-y-auto py-4">
                <div className="space-y-1 ps-2">
                    <SidebarNavItem
                        href={route('dashboard')}
                        icon={<Icon icon="dashboard" className="h-5 w-5" />}
                        isCollapsed={isCollapsed}
                        active={route().current('dashboard')}
                    >
                        Dashboard
                    </SidebarNavItem>

                    <SidebarNavItem
                        href={route('users.index')}
                        icon={<Icon icon="users" className="h-5 w-5" />}
                        isCollapsed={isCollapsed}
                        active={route().current('users.*')}
                    >
                        Users
                    </SidebarNavItem>

                    <SidebarNavItem
                        href={route('profile.edit')}
                        icon={<Icon icon="profile" className="h-5 w-5" />}
                        isCollapsed={isCollapsed}
                        active={route().current('profile.edit')}
                    >
                        Profile
                    </SidebarNavItem>
                </div>
            </nav>

            <SidebarUserSection user={user} isCollapsed={isCollapsed} />
        </aside>
    )
}
