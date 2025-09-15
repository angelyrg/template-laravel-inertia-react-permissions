import { Icon } from '@/Components/ui/Icon'
import { Link } from '@inertiajs/react'

export const SidebarNavItem = ({
    href,
    icon,
    children,
    isCollapsed,
    active = false,
    isSubItem = false,
    onClick,
}) => {
    const baseClasses = `flex items-center relative ps-4 py-3
        font-medium rounded-l-3xl transition-colors duration-200 ease-in-out group
    ${
        active
            ? 'sidebar-active bg-surface text-primary dark:bg-primary-900 dark:text-primary-200'
            : 'text-gray-600 text-white hover:text-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
    }
  `

    const content = (
        <>
            {icon && (
                <span className={`${isCollapsed ? '' : 'mr-3'} flex-shrink-0`}>
                    <Icon
                        icon={icon}
                        className={`h-6 w-6 ${
                            active
                                ? 'text-primary'
                                : 'text-white group-hover:text-gray-300 dark:text-gray-400 dark:group-hover:text-gray-300'
                        } `}
                    />
                </span>
            )}

            {!isCollapsed && <span className="flex-1 truncate">{children}</span>}
        </>
    )

    return (
        <li>
            {href ? (
                <Link
                    href={href}
                    className={` ${baseClasses} ${isSubItem ? 'pl-11' : ''} `}
                    onClick={onClick}
                >
                    {content}
                </Link>
            ) : (
                <button
                    className={` ${baseClasses} w-full ${isSubItem ? 'pl-11' : ''} `}
                    onClick={onClick}
                >
                    {content}
                </button>
            )}

            {isCollapsed && !isSubItem && (
                <div className="invisible absolute left-14 z-50 mt-1 w-56 origin-top-right rounded-md bg-white opacity-0 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 focus:outline-none group-hover:visible group-hover:opacity-100">
                    <div className="rounded-md px-2 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                        {children}
                    </div>
                </div>
            )}
        </li>
    )
}
