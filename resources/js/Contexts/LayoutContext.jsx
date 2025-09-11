import { useLocalStorage } from '@/Hooks/useLocalStorage'
import { createContext, useContext, useMemo } from 'react'

const LayoutContext = createContext()

export const useLayout = () => {
    const context = useContext(LayoutContext)
    if (!context) {
        throw new Error('useLayout must be used within a LayoutProvider')
    }
    return context
}

export const LayoutProvider = ({ children }) => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useLocalStorage('sidebarCollapsed', false)
    const [isMobileMenuOpen, setMobileMenuOpen] = useLocalStorage('mobileMenuOpen', false)

    const value = useMemo(
        () => ({
            isSidebarCollapsed,
            setSidebarCollapsed,
            isMobileMenuOpen,
            setMobileMenuOpen,
        }),
        [isSidebarCollapsed, isMobileMenuOpen]
    )

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}
