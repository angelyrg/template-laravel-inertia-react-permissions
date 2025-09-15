import { Icon } from '@/Components/ui/Icon'
import { useEffect, useRef, useState } from 'react'

export const Notifications = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Datos de ejemplo - en una aplicación real estos vendrían de tu backend
    const notifications = [
        {
            id: 1,
            title: 'Nuevo mensaje',
            message: 'Tienes un nuevo mensaje de Juan',
            time: 'Hace 5 min',
            read: false,
        },
        {
            id: 2,
            title: 'Tarea completada',
            message: 'La tarea "Reporte mensual" fue completada',
            time: 'Hace 1 hora',
            read: false,
        },
        {
            id: 3,
            title: 'Recordatorio',
            message: 'Reunión con el equipo a las 3:00 PM',
            time: 'Hace 2 horas',
            read: true,
        },
    ]

    // Contar notificaciones no leídas
    const unreadCount = notifications.filter((notification) => !notification.read).length

    const markAsRead = (id) => {
        // Aquí iría la lógica para marcar como leída
        console.log('Marcar como leída:', id)
    }

    const markAllAsRead = () => {
        // Aquí iría la lógica para marcar todas como leídas
        console.log('Marcar todas como leídas')
    }

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:ring-primary-500 relative flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 dark:text-gray-300 dark:hover:bg-gray-700"
                aria-label="Notifications"
            >
                <Icon icon="bell" className="h-5 w-5" />

                {/* Badge con contador de notificaciones no leídas */}
                {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown de notificaciones */}
            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-700">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            Notificaciones
                        </h3>

                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200 text-xs"
                            >
                                Marcar todas como leídas
                            </button>
                        )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`cursor-pointer border-b border-gray-100 px-4 py-3 last:border-b-0 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                                    onClick={() => markAsRead(notification.id)}
                                >
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            {/* Punto azul para notificaciones no leídas */}
                                            {!notification.read && (
                                                <div className="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
                                            )}
                                        </div>

                                        <div className="ml-3 flex-1">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {notification.title}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                                {notification.message}
                                            </p>
                                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                {notification.time}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-6 text-center">
                                <Icon
                                    icon="bell-off"
                                    className="mx-auto mb-2 h-8 w-8 text-gray-400"
                                />
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    No hay notificaciones
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-700">
                        <a
                            href="#"
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200 block text-center text-xs"
                        >
                            Ver todas las notificaciones
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}
