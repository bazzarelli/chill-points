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
      className="border-2 border-black dark:border-slate-800 rounded-full"
      src={user?.image}
      width={150}
      height={150}
      alt={user?.name ?? "avatar"}
      priority={true}
    />
  ) : null;

  const nameDisplay = user?.name ? (
    <div className="font-semibold">{user?.name}</div>
  ) : null;

  const emailDisplay = user?.email ? (
    <div className="text-sm">{user?.email}</div>
  ) : null;

  return (
    <section className="text-slate-900">
      <div className="float-left mx-6 my-4">{userImage}</div>
      <div className="mt-6">
        {nameDisplay}
        {emailDisplay}
      </div>
    </section>
  );
}
