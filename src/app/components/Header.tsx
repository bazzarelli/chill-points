import { options } from "@/app/api/auth/[...nextauth]/options";
import { comfortaa } from "@/app/utils/fonts";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";

// import { redirect } from "next/navigation";

export default async function Header() {
  const session = await getServerSession(options);

  // if (!session) {
  //   redirect("/api/auth/signin?callbackUrl=/server");
  // }

  const userImage = session?.user?.image || "";
  console.log("User image from github", userImage);

  return (
    <div className="navbar bg-info px-4 pt-3 md:px-8">
      <div className="flex-1">
        <Link href="/">
          <span className={`text-3xl md:text-4xl ${comfortaa.className}`}>
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
                src={session ? userImage : "/images/sample-avatar.jpg"}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-sm z-10 mt-3 w-52 p-2 shadow bg-info"
          >
            <li>
              <a>Pair Device</a>
            </li>
            <li>
              <a>Install App</a>
            </li>
            <li>
              <Link href="/api/auth/signout">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
