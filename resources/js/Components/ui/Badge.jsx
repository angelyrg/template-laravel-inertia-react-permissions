export const Badge = ({ count, className = '' }) => {
    if (!count || count === 0) return null

    return (
        <span
            className={`absolute right-3 top-3 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-500 px-1.5 py-1 text-xs font-bold leading-none text-white ${className}`}
        >
            {count > 99 ? '99+' : count}
        </span>
    )
}
