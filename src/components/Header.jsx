import { comfortaa } from "@/app/utils/fonts";

export default function Header() {
    return (
        <div className="navbar bg-base-100 pt-3 px-8">
            <div className="flex-1">
                <a className={`text-slate-400 text-4xl ${comfortaa.className}`}>Chill Points</a>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="/images/sample-avatar.jpg" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-10">
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

