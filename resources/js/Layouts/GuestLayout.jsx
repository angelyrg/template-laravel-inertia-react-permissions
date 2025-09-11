import background from '@images/background.svg'
import brandLogo from '@images/lyk_logo.webp'
import { Link } from '@inertiajs/react'

export default function GuestLayout({ children }) {
    return (
        <div>
            <img
                src={background}
                className="fixed inset-0 -z-10 h-full w-full blur-[100px]"
                alt=""
                fetchPriority="high"
            />
            <div className="grid h-full min-h-screen w-full grid-cols-1 md:grid-cols-2">
                <div></div>
                <div className="flex flex-col items-center justify-center md:items-start">
                    <div className="flex w-full justify-center sm:max-w-md">
                        <Link href="#">
                            <img src={brandLogo} className="w-32" alt="LyK" />
                        </Link>
                    </div>

                    <div className="mt-6 w-full overflow-hidden rounded-2xl bg-white px-6 py-8 shadow-md sm:max-w-md">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
