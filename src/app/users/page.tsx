import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { JSX } from "react";

type Props = {
  id: string;
  name: string | null;
  age: number | null;
  image: string | null;
};

function UserCard({ id, name, age, image }: Props) {
  return (
    <div>
      <Image
        src={image ?? "/images/sample-avatar.jpg"}
        alt={`${name}'s profile`}
        width="200"
        height="200"
      />
      <div className="text-slate-400 p-4">
        <h3>Name: {name}</h3>
        <p>Age: {age}</p>
        <p>id: {id}</p>
      </div>
    </div>
  );
}

export default async function Users() {
  const users = await prisma.user.findMany();

  return (
    <div>
      {users.map((user: JSX.IntrinsicAttributes & Props) => {
        return <UserCard key={user.id} {...user} />;
      })}
    </div>
  );
}
