import { createContext, useContext, useEffect, useState } from 'react'

const LayoutContext = createContext()

export const useLayout = () => {
    const context = useContext(LayoutContext)
    if (!context) {
        throw new Error('useLayout debe ser usado dentro de un LayoutProvider')
    }
    return context
}

export const LayoutProvider = ({ children }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [currentTheme, setCurrentTheme] = useState('light')

    // Detectar preferencia de tema del sistema
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        setCurrentTheme(mediaQuery.matches ? 'dark' : 'light')

        const handleChange = (e) => {
            setCurrentTheme(e.matches ? 'dark' : 'light')
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    // Aplicar tema al documento
    useEffect(() => {
        document.documentElement.classList.toggle('dark', currentTheme === 'dark')
    }, [currentTheme])

    const toggleTheme = () => {
        setCurrentTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    const value = {
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileMenuOpen,
        setMobileMenuOpen,
        currentTheme,
        toggleTheme,
    }

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}
