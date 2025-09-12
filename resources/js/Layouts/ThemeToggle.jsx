import { Icon } from '@/Components/ui/Icon'
import { useLayout } from '@/Contexts/LayoutContext'

export const ThemeToggle = () => {
    const { currentTheme, toggleTheme } = useLayout()

    return (
        <button
            onClick={toggleTheme}
            className="focus:ring-primary-500 rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
        >
            <Icon icon={currentTheme === 'light' ? 'moon' : 'sun'} className="h-5 w-5" />
        </button>
    )
}
