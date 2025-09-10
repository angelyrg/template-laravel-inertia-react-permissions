import { PhUsersLight } from '@/Components/icons/PhUsersLight'

export const MobileHeader = ({ onMenuToggle }) => {
    return (
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-3 shadow-sm">
            <button
                onClick={onMenuToggle}
                className="rounded-md p-1 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Open menu"
            >
                <PhUsersLight className="h-5 w-5" />
            </button>
        </div>
    )
}
