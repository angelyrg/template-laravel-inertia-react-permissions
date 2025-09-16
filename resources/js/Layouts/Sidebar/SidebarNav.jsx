import { useLayout } from '@/Contexts/LayoutContext'
import { SidebarNavGroup } from './SidebarNavGroup'
import { SidebarNavItem } from './SidebarNavItem'

// TODO: corregir los menus de tipo grupo en Colapsed sidebar
const navigationConfig = [
    {
        type: 'item',
        icon: 'ic:outline-dashboard',
        label: 'Dashboard',
        href: route('dashboard'),
        routeName: 'dashboard',
    },
    {
        type: 'item',
        icon: 'users',
        label: 'Usuarios',
        href: route('users.index'),
        routeName: 'users.*',
    },
    // TODO: Estilos para menus tipo grupo
    // {
    //     type: 'group',
    //     icon: 'settings',
    //     label: 'Administración',
    //     items: [
    //         {
    //             label: 'Usuarios',
    //             href: route('users.index'),
    //             routeName: 'users.*',
    //         },
    //         {
    //             label: 'Roles',
    //             href: route('roles.index'),
    //             routeName: 'roles.*',
    //         },
    //     ],
    // },
    {
        type: 'item',
        icon: 'profile',
        label: 'Perfil',
        href: route('profile.edit'),
        routeName: 'profile.*',
    },
]

export const SidebarNav = ({ onItemClick }) => {
    const { sidebarCollapsed } = useLayout()

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
                        {item.items.map((subItem, subIndex) => {
                            const isActive = route().current(subItem.routeName)

                            return (
                                <SidebarNavItem
                                    key={subIndex}
                                    href={subItem.href}
                                    isCollapsed={sidebarCollapsed}
                                    active={isActive}
                                    isSubItem={true}
                                    onClick={onItemClick}
                                >
                                    {subItem.label}
                                </SidebarNavItem>
                            )
                        })}
                    </SidebarNavGroup>
                )
            }

            const isActive = route().current(item.routeName)

            return (
                <SidebarNavItem
                    key={index}
                    href={item.href}
                    icon={item.icon}
                    isCollapsed={sidebarCollapsed}
                    active={isActive}
                    onClick={onItemClick}
                >
                    {item.label}
                </SidebarNavItem>
            )
        })
    }

    return <nav className="relative space-y-1 ps-2">{renderNavigation(navigationConfig)}</nav>
}
