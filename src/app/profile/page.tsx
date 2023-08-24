"use client";

// Remember you must use an AuthProvider for
// client components to useSession
import UserCard from "@/app/components/user/UserCard";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ClientPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  return (
    <section className="flex flex-col gap-6">
      <UserCard user={session?.user} />
    </section>
  );
}
