import { Badge } from '@/Components/ui/Badge'
import { Dropdown, DropdownItem } from '@/Components/ui/Dropdown'
import { Icon } from '@/Components/ui/Icon'
import { useState } from 'react'

export const Notifications = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'Nuevo usuario registrado', time: 'Hace 5 min', read: false },
        { id: 2, message: 'Tarea completada', time: 'Hace 1 hora', read: false },
        { id: 3, message: 'Reunión a las 3 PM', time: 'Hace 2 horas', read: true },
    ])

    const unreadCount = notifications.filter((n) => !n.read).length

    const markAsRead = (id) => {
        setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
    }

    const markAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })))
    }

    const trigger = (
        <button className="relative rounded-lg bg-white p-3 text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary">
            <Icon icon="bell" className="h-6 w-6" />
            <Badge count={unreadCount} />
        </button>
    )

    return (
        <Dropdown trigger={trigger} align="right">
            <div className="border-b border-gray-100 px-4 py-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Notificaciones</h3>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-xs font-medium text-primary transition-colors hover:text-primary-accent"
                        >
                            Marcar todas como leídas
                        </button>
                    )}
                </div>
            </div>

            <div className="max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="px-4 py-4 text-center">
                        <Icon icon="bell" className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                        <p className="text-sm text-gray-500">No hay notificaciones</p>
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <DropdownItem
                            key={notification.id}
                            onClick={() => markAsRead(notification.id)}
                            className={`px-4 py-3 ${!notification.read ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                        >
                            <div className="flex items-start space-x-3">
                                <div
                                    className={`mt-0.5 flex-shrink-0 ${!notification.read ? 'text-blue-500' : 'text-gray-400'}`}
                                >
                                    <Icon
                                        icon={!notification.read ? 'notifications' : 'bell'}
                                        className="h-4 w-4"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium leading-tight text-gray-900">
                                        {notification.message}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {notification.time}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                                )}
                            </div>
                        </DropdownItem>
                    ))
                )}
            </div>

            {notifications.length > 0 && (
                <div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
                    <button className="w-full text-center text-xs font-medium text-primary transition-colors hover:text-primary-accent">
                        Ver todas las notificaciones
                    </button>
                </div>
            )}
        </Dropdown>
    )
}
