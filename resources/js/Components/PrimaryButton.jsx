export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-2xl border border-transparent bg-primary px-4 py-2 text-base font-semibold tracking-widest text-white transition duration-150 ease-in-out hover:bg-primary-accent focus:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:bg-primary-accent ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    )
}
