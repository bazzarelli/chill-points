import Image from "next/image";

type User =
  | {
      id?: string | null | undefined;
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

type Props = {
  user: User;
};

export default function UserCard({ user }: Props) {
  console.log(user);

  const userImage = user?.image ? (
    <Image
      className="border-4 border-black dark:border-slate-500 rounded-full mx-auto mt-8"
      src={user?.image}
      width={200}
      height={200}
      alt={user?.name ?? "Profile Pic"}
      priority={true}
    />
  ) : null;

  const nameDisplay = user?.name ? (
    <div className="flex flex-col items-center mt-2 font-bold text-xl text-slate-400">
      {user?.name}
    </div>
  ) : null;

  const emailDisplay = user?.email ? (
    <div className="flex flex-col items-center text-lg text-slate-400">
      {user?.email}
    </div>
  ) : null;

  return (
    <section className="flex flex-col gap-2">
      {userImage}
      {nameDisplay}
      {emailDisplay}
    </section>
  );
}
