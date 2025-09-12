import { useLayout } from '@/Contexts/LayoutContext' // Importación añadida
import { SidebarNavGroup } from './SidebarNavGroup'
import { SidebarNavItem } from './SidebarNavItem'

// Configuración de navegación
const navigationConfig = [
    {
        type: 'item',
        label: 'Dashboard',
        href: route('dashboard'),
        icon: 'dashboard',
        active: route().current('dashboard'),
    },
    {
        type: 'group',
        label: 'Administración',
        icon: 'settings',
        items: [
            {
                label: 'Usuarios',
                href: route('users.index'),
                active: route().current('users.*'),
            },
            {
                label: 'Roles',
                href: route('roles.index'),
                active: route().current('roles.*'),
            },
        ],
    },
    {
        type: 'item',
        label: 'Perfil',
        href: route('profile.edit'),
        icon: 'profile',
        active: route().current('profile.edit'),
    },
]

export const SidebarNav = ({ onItemClick }) => {
    const { sidebarCollapsed } = useLayout() // Ahora está correctamente importado

    const renderNavigation = (items) => {
        return items.map((item, index) => {
            if (item.type === 'group') {
                return (
                    <SidebarNavGroup
                        key={index}
                        label={item.label}
                        icon={item.icon}
                        isCollapsed={sidebarCollapsed}
                    >
                        {item.items.map((subItem, subIndex) => (
                            <SidebarNavItem
                                key={subIndex}
                                href={subItem.href}
                                isCollapsed={sidebarCollapsed}
                                active={subItem.active}
                                isSubItem={true}
                                onClick={onItemClick}
                            >
                                {subItem.label}
                            </SidebarNavItem>
                        ))}
                    </SidebarNavGroup>
                )
            }

            return (
                <SidebarNavItem
                    key={index}
                    href={item.href}
                    icon={item.icon}
                    isCollapsed={sidebarCollapsed}
                    active={item.active}
                    onClick={onItemClick}
                >
                    {item.label}
                </SidebarNavItem>
            )
        })
    }

    return <nav className="space-y-1 px-2">{renderNavigation(navigationConfig)}</nav>
}
