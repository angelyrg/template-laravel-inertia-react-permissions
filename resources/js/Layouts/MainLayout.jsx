// components/layout/MainLayout.jsx
import { useEffect, useState } from 'react'
import { MobileHeader } from './MobileHeader'
import { Sidebar } from './Sidebar/Sidebar'

export const MainLayout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)
            // En móvil, el sidebar siempre empieza colapsado
            if (mobile) {
                setIsCollapsed(true)
            }
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    const toggleSidebar = () => {
        if (isMobile) {
            setIsMobileMenuOpen(!isMobileMenuOpen)
        } else {
            setIsCollapsed(!isCollapsed)
        }
    }

    const closeMobileMenu = () => {
        if (isMobile) {
            setIsMobileMenuOpen(false)
        }
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Overlay para móvil */}
            {isMobile && isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50"
                    onClick={closeMobileMenu}
                />
            )}

            <Sidebar
                isCollapsed={isCollapsed}
                isMobile={isMobile}
                isMobileMenuOpen={isMobileMenuOpen}
                onToggle={toggleSidebar}
            />

            {/* Contenido principal */}
            <div
                className={`flex flex-1 flex-col ${isCollapsed && !isMobile ? '' : 'ml-0'} transition-all duration-300`}
            >
                {isMobile && <MobileHeader onMenuToggle={toggleSidebar} />}

                <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}

export default MainLayout
