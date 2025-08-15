export default function TextInput({
    label,
    value,
    onChange,
    error,
    type = 'text',
    helpText = '',
    required = false,
    className = '',
    ...props
}) {
    return (
        <div className="mb-4">
            <label className="mb-1 block font-medium text-gray-700">
                {label}
                {required && <span className="text-red-400"> *</span>}
            </label>
            <input
                type={type}
                className={`focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-opacity-50 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
                value={value}
                onChange={onChange}
                {...props}
            />
            {helpText && (
                <div>
                    <small className="text-gray-800">{helpText}</small>
                </div>
            )}
            {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
        </div>
    )
}
