// components/Sidebar/Logo.js
import { Link } from '@inertiajs/react'

export const Logo = ({ collapsed }) => {
    return (
        <Link href={route('dashboard')} className="flex items-center space-x-2">
            <div className="bg-primary-600 flex h-8 w-8 items-center justify-center rounded-lg">
                <span className="text-lg font-bold text-white">E</span>
            </div>
            {!collapsed && <span className="text-xl font-semibold text-gray-900">ERP System</span>}
        </Link>
    )
}
