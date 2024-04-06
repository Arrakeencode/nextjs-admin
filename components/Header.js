import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {

    const { data : session } = useSession()
    const router = useRouter()
    const {pathname} = router

    const active = "text-blue-500 transition hover:text-blue-500/75 p-3 bg-gray-200 rounded-md"
    const inactive = "text-gray-500 transition hover:text-gray-500/75 p-3"

    if (session) {
    return (
    <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <a className="block text-teal-600" href="#">
                <span className="sr-only">Home</span>

            </a>

            <div className="flex flex-1 items-center justify-end md:justify-between">
                <nav aria-label="Global" className="hidden md:block">
                    <ul className="flex items-center gap-6 text-sm">
                        <li>
                            <Link className={location.pathname === '/' ? active : inactive} href="/"> Admin </Link>
                        </li>
                        <li>
                            <Link className={location.pathname === '/products' ? active : inactive} href="/products"> Produits </Link>
                        </li>
                        <li>
                            <Link className={location.pathname === '/shipment' ? active : inactive} href="/shipment"> Expédition </Link>
                        </li>
                        <li>
                            <Link className={location.pathname === '/order' ? active : inactive} href="/order"> Commandes </Link>
                        </li>
                    </ul>
                </nav>

                <div className="flex justify-center items-center gap-4">
                    <div className="sm:flex sm:gap-4">
                        <button className="h-10" onClick={() => signOut({redirect:true})}>Se déconnecter</button>
                    </div>

                    <button
                        className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                    >
                        <span className="sr-only">Toggle menu</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </header>
    );
}}