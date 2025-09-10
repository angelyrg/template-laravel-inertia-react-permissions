import { Icon } from '@/Components/ui/Icon'
import { Link } from '@inertiajs/react'

import brandLogo from '@images/lyk_logo.webp'

export const SidebarHeader = ({ isCollapsed, onToggle }) => {
    return (
        <div className="flex items-center justify-between border-b border-primary-accent p-4">
            {!isCollapsed && (
                <Link href="/">
                    <img src={brandLogo} className="w-24" alt="LyK" />
                </Link>
            )}
            <button
                onClick={onToggle}
                className="rounded p-1 transition-colors hover:bg-primary-accent"
            >
                <Icon icon={isCollapsed ? 'menu' : 'close'} className="h-5 w-5 text-white" />
            </button>
        </div>
    )
}
