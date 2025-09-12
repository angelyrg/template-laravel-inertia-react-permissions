import { LayoutProvider, useLayout } from '@/Contexts/LayoutContext'
import { useEffect } from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar/Sidebar'

const LayoutContent = ({ children, title = 'Dashboard' }) => {
    const { setSidebarCollapsed, setMobileMenuOpen } = useLayout()

    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth < 768
            if (mobile) {
                setSidebarCollapsed(true)
                setMobileMenuOpen(false)
            }
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [setSidebarCollapsed, setMobileMenuOpen])

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Navbar title={title} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </main>
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
