import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import LogoType from "@/app/components/svg/LogoType";
import ProfileIcon from "@/app/components/svg/ProfileIcon";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { Link } from "nextjs13-progress";

export default async function Header() {
  const session = await getServerSession(authOptions);
  const userImage = session?.user?.image || "";

  return (
    <div className="flex h-[4rem] p-2 items-center flex-row bg-sky-300">
      <div className="basis-1/4">
        <span className="block">&nbsp;</span>
      </div>
      <div className="basis-1/2">
        <Link href="/game">
          <LogoType fill="rgb(7 89 133 / 0.8)" className="mx-auto" />
        </Link>
      </div>
      <div className="basis-1/4 text-right">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {userImage ? (
                <Image
                  alt="user avatar"
                  width="40"
                  height="40"
                  src={userImage}
                />
              ) : (
                <ProfileIcon fill="rgb(7 89 133 / 0.8)" />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu menu-md rounded-md z-20 mt-4 w-40
              p-2 shadow-2xl text-slate-200 bg-neutral border-2 border-sky-600/60"
          >
            {session ? (
              <>
                <li>
                  <Link href="/badges">Badges</Link>
                </li>
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
            ) : (
              <>
                <li>
                  <Link href="/profile">Create Profile</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
