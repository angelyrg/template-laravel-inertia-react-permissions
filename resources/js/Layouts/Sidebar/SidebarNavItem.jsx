// components/layout/Sidebar/SidebarNavItem.jsx
import { Icon } from '@/Components/icons/Icon'
import { Link } from '@inertiajs/react'

export const SidebarNavItem = ({ href, icon, children, isCollapsed = false, active = false }) => {
    return (
        <Link
            href={href}
            className={`relative flex cursor-pointer items-center gap-3 px-4 py-3 transition-all ${
                active
                    ? 'sidebar-active rounded-l-full bg-[#E6E8EE] font-medium text-primary'
                    : 'text-white hover:rounded-2xl hover:bg-primary-accent'
            } `}
        >
            <Icon name={icon} className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && (
                <span className="ml-3 font-medium transition-opacity duration-200">{children}</span>
            )}
        </Link>
    )
}
