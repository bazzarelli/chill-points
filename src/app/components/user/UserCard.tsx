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
  const userImage = user?.image ? (
    <Image
      className="border-4 border-black dark:border-slate-500 rounded-full mx-auto mt-8"
      src={user?.image}
      width={150}
      height={150}
      alt={user?.name ?? "Profile Pic"}
      priority={true}
    />
  ) : null;

  const nameDisplay = user?.name ? (
    <div className="flex flex-col mt-2 font-semibold text-lg">{user?.name}</div>
  ) : null;

  const emailDisplay = user?.email ? (
    <div className="flex flex-col">{user?.email}</div>
  ) : null;

  return (
    <section className="flex flex-row pl-4 pb-6 text-slate-300 border-b-2 border-slate-700">
      <div>{userImage}</div>
      <div className="flex flex-col justify-center text-left pl-4">
        {nameDisplay}
        {emailDisplay}
      </div>
    </section>
  );
}
