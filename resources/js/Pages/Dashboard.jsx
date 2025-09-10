import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

export default function Dashboard() {
    return (
        <AuthenticatedLayout title={'Dashboard'}>
            <div className="mx-auto max-w-7xl">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">You're logged in!</div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
