import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function ServerPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/server");
  }

  return (
    <section className="flex flex-col gap-1">
      <h1 className="text-3xl mt-5 text-white text-center">Server Page</h1>
      <p className="text-xl mt-5 text-white text-center">
        {session?.user?.email}
      </p>
    </section>
  );
}
