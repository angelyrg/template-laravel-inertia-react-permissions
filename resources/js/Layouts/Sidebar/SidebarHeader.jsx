import { Icon } from '@/Components/ui/Icon'
import { useLayout } from '@/Contexts/LayoutContext'

export const SidebarHeader = () => {
    const { sidebarCollapsed, setSidebarCollapsed } = useLayout()

    return (
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
            {!sidebarCollapsed && (
                <div className="flex items-center">
                    <div className="bg-primary-500 flex h-8 w-8 items-center justify-center rounded-md font-bold text-white">
                        L
                    </div>
                    <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                        Logo
                    </span>
                </div>
            )}

            {sidebarCollapsed && (
                <div className="bg-primary-500 mx-auto flex h-8 w-8 items-center justify-center rounded-md font-bold text-white">
                    L
                </div>
            )}

            <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden rounded-md p-1 text-gray-500 hover:bg-gray-100 md:block dark:text-gray-400 dark:hover:bg-gray-700"
                aria-label="Toggle sidebar"
            >
                <Icon
                    icon={sidebarCollapsed ? 'chevron-right' : 'chevron-left'}
                    className="h-4 w-4"
                />
            </button>
        </div>
    )
}
