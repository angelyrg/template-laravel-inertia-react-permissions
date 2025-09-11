import { Link } from '@inertiajs/react'

export const SidebarNavItem = ({ href, icon, children, isCollapsed = false, active = false }) => {
    return (
        <Link
            href={href}
            className={`relative flex cursor-pointer items-center gap-3 px-4 py-3 transition-all ${
                active
                    ? 'sidebar-active rounded-l-full bg-surface font-medium text-primary'
                    : 'text-white hover:rounded-2xl hover:bg-primary-accent'
            } `}
        >
            {icon}
            {!isCollapsed && (
                <span className="font-medium transition-opacity duration-200">{children}</span>
            )}
        </Link>
    )
}
