import { Icon as Iconify } from '@iconify/react'

const iconMap = {
    // Navegación
    menu: 'mdi:menu',
    close: 'mdi:close',
    chevronDown: 'mdi:chevron-down',
    chevronLeft: 'mdi:chevron-left',
    chevronRight: 'mdi:chevron-right',

    // Theme
    moon: 'bxs:moon',
    sun: 'mingcute:sun-fill',

    // Acciones
    logout: 'mdi:logout',
    settings: 'mdi:cog',
    notifications: 'mdi:bell-outline',
    bell: 'mdi:bell',
    user: 'mdi:account',
    profile: 'mdi:account-circle',

    // Secciones de la app
    dashboard: 'mdi:view-dashboard',
    users: 'mdi:account-group',
    home: 'mdi:home',
    reports: 'mdi:chart-bar',
    analytics: 'mdi:chart-pie',

    // Estados
    success: 'mdi:check-circle',
    error: 'mdi:alert-circle',
    warning: 'mdi:alert',
    info: 'mdi:information',

    // Operaciones CRUD
    add: 'mdi:plus',
    edit: 'mdi:pencil',
    delete: 'mdi:delete',
    view: 'mdi:eye',
    save: 'mdi:content-save',

    // Tipos de archivo
    pdf: 'mdi:file-pdf',
    image: 'mdi:image',
    document: 'mdi:file-document',
}

export const Icon = ({ icon, className = 'w-5 h-5', ...rest }) => {
    const iconValue = iconMap[icon] || icon

    return <Iconify icon={iconValue} className={className} {...rest} />
}

export const getIconName = (iconName) => {
    return iconMap[iconName] || null
}

export const useIcons = () => {
    const getIcon = (iconName, className = 'w-5 h-5') => {
        const iconValue = iconMap[iconName]
        if (!iconValue) {
            console.warn(`Ícono "${iconName}" no encontrado`)
            return null
        }
        return <Icon icon={iconValue} className={className} />
    }

    return { getIcon }
}
