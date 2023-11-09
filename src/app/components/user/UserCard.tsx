import Image from "next/image";
import { z } from "zod";

const userSchema = z.object({
  id: z.string().nullish(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  image: z.string().nullish(),
});

type TUserSchema = z.infer<typeof userSchema>;

type UserProps = {
  user: TUserSchema | undefined;
};

export default function UserCard({ user }: UserProps) {
  const userImage = user?.image ? (
    <Image
      className="border-4 border-black dark:border-slate-500 rounded-full mt-8"
      src={user?.image}
      width={150}
      height={150}
      alt={user?.name ?? "avatar"}
      priority={true}
    />
  ) : null;

  const nameDisplay = user?.name ? (
    <div className="mt-2 font-semibold text-lg">{user?.name}</div>
  ) : null;

  const emailDisplay = user?.email ? (
    <div className="mt-1">{user?.email}</div>
  ) : null;

  return (
    <section className="pl-4 pb-6 grid grid-cols-2 text-slate-900">
      <div className="flex flex-col justify-center">
        {nameDisplay}
        {emailDisplay}
      </div>
      <div className="pl-4">{userImage}</div>
    </section>
  );
}
