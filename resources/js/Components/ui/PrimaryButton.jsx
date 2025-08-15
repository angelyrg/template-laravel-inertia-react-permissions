import clsx from 'clsx'

export default function PrimaryButton({
    children,
    type = 'button',
    onClick,
    disabled = false,
    loading = false,
    variant = 'primary',
    className = '',
    ...props
}) {
    const baseClasses =
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 transition'

    const variantClasses = {
        primary: 'bg-primary hover:bg-primary-accent text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-950',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={clsx(
                baseClasses,
                disabled || loading
                    ? 'cursor-not-allowed bg-gray-400 text-gray-950'
                    : variantClasses[variant],
                className,
            )}
            {...props}
        >
            {loading && (
                <svg
                    className="h-4 w-4 animate-spin text-white"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                    />
                </svg>
            )}
            {children}
        </button>
    )
}
