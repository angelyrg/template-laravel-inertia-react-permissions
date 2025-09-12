import { Icon } from '@/Components/ui/Icon'
import { useState } from 'react'

export const SidebarNavGroup = ({ label, icon, children, isCollapsed }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => setIsOpen(!isOpen)

    if (isCollapsed) {
        return (
            <li className="relative">
                <button
                    onClick={toggleOpen}
                    className={`flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                    <Icon icon={icon} className="h-6 w-6 text-gray-400" />
                </button>

                {isOpen && (
                    <div className="absolute left-14 top-0 z-50 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                        <div className="border-b border-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-200">
                            {label}
                        </div>
                        <ul className="py-1">{children}</ul>
                    </div>
                )}
            </li>
        )
    }

    return (
        <li>
            <button
                onClick={toggleOpen}
                className={`flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
                <div className="flex items-center">
                    <Icon icon={icon} className="mr-3 h-6 w-6 text-gray-400" />
                    <span>{label}</span>
                </div>
                <Icon
                    icon="chevron-down"
                    className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180 transform' : ''}`}
                />
            </button>

            <ul className={`mt-1 space-y-1 ${isOpen ? '' : 'hidden'}`}>{children}</ul>
        </li>
    )
}
