import { Icon } from '@/Components/icons/Icon'

export const MobileHeader = ({ onMenuToggle }) => {
    return (
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-3 shadow-sm">
            <button
                onClick={onMenuToggle}
                className="rounded-md p-1 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Open menu"
            >
                <Icon name="menu" className="h-5 w-5" />
            </button>
        </div>
    )
}
