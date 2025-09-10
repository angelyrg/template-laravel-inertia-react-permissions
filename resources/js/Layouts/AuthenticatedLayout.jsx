import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import MainLayout from './MainLayout'

export default function AuthenticatedLayout({ title, children }) {
    const { flash } = usePage().props
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success)
        }
        if (flash?.error) {
            toast.error(flash.error)
        }
    }, [flash])

    return (
        <>
            <Toaster position="top-right" />

            <MainLayout title={title}>
                <div className="min-h-full">
                    <main>{children}</main>
                </div>
            </MainLayout>
        </>
    )
}
