export const SidebarUserSection = ({ user, isCollapsed = false }) => {
    return (
        <div className="border-t border-primary-accent p-3">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-accent text-sm font-medium text-white">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                </div>
                {!isCollapsed && (
                    <div className="ml-2 min-w-0">
                        <p className="truncate text-xs font-medium">{user.name}</p>
                        <p className="truncate text-xs text-gray-300">{user.email}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
