import { LayoutProvider, useLayout } from '@/contexts/LayoutContext'
import { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar/Sidebar'

const LayoutContent = ({ children, title = 'Dashboard' }) => {
    const [isMobile, setIsMobile] = useState(false)
    const { setSidebarCollapsed, setMobileMenuOpen } = useLayout()

    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)
            if (mobile) {
                setSidebarCollapsed(true)
            }
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [setSidebarCollapsed])

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev)
    }

    return (
        <div className="flex h-screen bg-surface">
            <Sidebar />

            <div className={`relative flex flex-1 flex-col transition-all duration-300`}>
                <Navbar
                    title={title}
                    onMenuToggle={toggleMobileMenu}
                    showMobileMenuButton={isMobile}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}

export const MainLayout = ({ children, title }) => {
    return (
        <LayoutProvider>
            <LayoutContent title={title}>{children}</LayoutContent>
        </LayoutProvider>
    )
}

export default MainLayout
