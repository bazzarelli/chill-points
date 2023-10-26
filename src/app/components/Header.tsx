import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import AvatarIcon from "@/app/components/svg/AvatarIcon";
import { comfortaa } from "@/app/utils/fonts";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
  const session = await getServerSession(authOptions);
  const userImage = session?.user?.image || "";

  return (
    <div className="navbar bg-sky-300 px-4 pt-3 md:px-8">
      <div className="flex-1">
        <Link href="/">
          <span
            className={`text-3xl md:text-4xl text-sky-800/80 ${comfortaa.className}`}
          >
            Chill Points
          </span>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-10 rounded-full">
              {userImage ? (
                <Image
                  alt="user avatar"
                  width="40"
                  height="40"
                  src={userImage}
                />
              ) : (
                <AvatarIcon fill="rgb(7 89 133 / 0.8)" />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-md menu-sm z-20 mt-4 w-32 p-2 shadow-2xl bg-slate-600 text-slate-300"
          >
            <li>
              <Link href="/badges">Badges</Link>
            </li>
            {session && (
              <>
                <li>
                  <Link href="/history">History</Link>
                </li>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <Link href="/api/auth/signout">Sign out</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
