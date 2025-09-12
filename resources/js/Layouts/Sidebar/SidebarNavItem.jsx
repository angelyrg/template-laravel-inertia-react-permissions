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
    const baseClasses = `
    flex items-center px-2 py-2 text-sm font-medium rounded-md
    transition-colors duration-200 ease-in-out
    group
    ${
        active
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
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
                                ? 'text-primary-500'
                                : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
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
