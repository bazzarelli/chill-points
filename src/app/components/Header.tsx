import { comfortaa } from "@/app/utils/fonts";
import Link from 'next/link';
import Image from "next/image";

export default function Header() {
    return (
        <div className="navbar bg-sky-200 pt-3 px-4 md:px-8">
            <div className="flex-1">
                <Link href="/">
                    <span className={`text-slate-700 text-3xl md:text-4xl ${comfortaa.className}`}>Chill Points</span>
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image alt="user avatar" src="/images/sample-avatar.jpg" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-10">
                        <li><Link href="/gallery">Exercise Gallery</Link></li>
                        <li><Link href="/device">Breath Session</Link></li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

