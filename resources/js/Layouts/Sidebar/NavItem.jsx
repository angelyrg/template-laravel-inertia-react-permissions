import { Icon } from '@iconify/react'
import { Link } from '@inertiajs/react'

export const NavItem = ({ item, collapsed }) => {
    return (
        <li>
            <Link
                href={item.href}
                className={`sidebar-active flex items-center rounded-lg p-3 transition-colors ${item.active ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'} `}
            >
                <Icon icon={item.icon} className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
            </Link>
        </li>
    )
}
