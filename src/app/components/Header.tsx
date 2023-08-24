import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { comfortaa } from "@/app/utils/fonts";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";

// import { redirect } from "next/navigation";

export default async function Header() {
  const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/api/auth/signin?callbackUrl=/");
  // }

  const userImage = session?.user?.image || "";
  console.log("User image from github", userImage);

  return (
    <div className="navbar bg-info px-4 pt-3 md:px-8">
      <div className="flex-1">
        <Link href="/">
          <span
            className={`text-3xl md:text-4xl text-sky-800/80 ${comfortaa.className}`}
          >
            Chill a minute
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
                src={session ? userImage : "/images/sample-avatar.jpg"}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-md menu-md z-10 mt-4 w-52 p-2 shadow-2xl bg-sky-600 text-slate-300"
          >
            <li>
              <Link href="/history">Game History</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/api/auth/signin">Github Sign in</Link>
            </li>
            <li>
              <Link href="/api/auth/signout">Github Sign out</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
