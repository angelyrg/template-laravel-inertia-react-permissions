import { useEffect, useRef, useState } from 'react'

export const Dropdown = ({ trigger, children, align = 'right' }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const alignmentClasses = {
        right: 'right-0',
        left: 'left-0',
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

            {isOpen && (
                <div
                    className={`absolute z-50 mt-2 w-60 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${alignmentClasses[align]}`}
                >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}

export const DropdownItem = ({ children, onClick, className = '' }) => (
    <button
        onClick={onClick}
        className={`block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 ${className}`}
        role="menuitem"
    >
        {children}
    </button>
)
