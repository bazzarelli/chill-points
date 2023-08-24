// import { options } from "@/app/api/auth/[...nextauth]/options";
import Home from "@/app/components/Home";

// import { getServerSession } from "next-auth/next";

export default async function Page() {
  // const session = await getServerSession(options);

  return <Home />;
  // return (
  //   <>
  //     {session ? (
  //       <Home />
  //     ) : (
  //       <h1 className="text-3xl mt-5 text-white text-center">
  //         Not logged in yet.
  //       </h1>
  //     )}
  //   </>
  // );
}
