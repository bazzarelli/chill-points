import { comfortaa } from "@/app/utils/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="navbar bg-sky-200 px-4 pt-3 md:px-8">
      <div className="flex-1">
        <Link href="/">
          <span
            className={`text-3xl text-slate-700 md:text-4xl ${comfortaa.className}`}
          >
            Chill Points
          </span>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-10 rounded-full">
              <Image
                alt="user avatar"
                width="40"
                height="40"
                src="/images/sample-avatar.jpg"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-sm z-10 mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a>Pair Device</a>
            </li>
            <li>
              <a>Exercise Gallery</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
