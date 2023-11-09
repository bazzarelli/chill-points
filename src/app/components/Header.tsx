import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import AvatarIcon from "@/app/components/svg/AvatarIcon";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { Link } from "nextjs13-progress";

export default async function Header() {
  const session = await getServerSession(authOptions);
  const userImage = session?.user?.image || "";

  return (
    <div className="navbar justify-between bg-sky-300">
      <div>
        <Link href="/">
          <h1 className="text-3xl md:text-4xl text-sky-800/60 tracking-tight font-semibold">
            Chill Points
          </h1>
        </Link>
      </div>
      <div>
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
