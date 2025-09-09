import ApplicationLogo from '@/Components/ApplicationLogo'
import { Icon } from '@/Components/icons/Icon'
import { Link } from '@inertiajs/react'

export const SidebarHeader = ({ isCollapsed, onToggle }) => {
    return (
        <div className="flex items-center justify-between border-b border-primary-accent p-4">
            {!isCollapsed && (
                <Link href="/">
                    <ApplicationLogo className="h-7 w-auto text-white" />
                </Link>
            )}
            <button
                onClick={onToggle}
                className="rounded p-1 transition-colors hover:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-primary-accent"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
                {isCollapsed ? (
                    <Icon name="menu" className="h-5 w-5" />
                ) : (
                    <Icon name="close" className="h-5 w-5" />
                )}
            </button>
        </div>
    )
}
