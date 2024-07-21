"use client";

import Badge from "@/app/components/game/Badge";
import { msg } from "@/app/i18n/frog-msg";
import Image from "next/image";
import { Link } from "nextjs13-progress";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTabletOrAbove = useMediaQuery({ minWidth: 769 });

  return (
    <>
      {isMobile && (
        <div
          className="text-slate-400 border-sky-300
              border-t-[10px] min-h-screen
              bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]
            from-sky-600 to-slate-700/20"
        >
          <div className="px-4">
            <h1 className="text-2xl text-sky-300 py-4 md:pb-4 md:pt-0 text-center">
              {msg.points_intro_1}
            </h1>
            <div className="text-center">
              <Badge time={1} count={1} shadow={false} />
            </div>
            <h2 className="text-md text-sky-300 pt-4 text-center">
              {msg.points_intro_2}
            </h2>
            <Image
              alt="The Chill Frog"
              width={400}
              height={361}
              src="/images/buddha-belly-frog-sm.webp"
              priority
              className="mt-8 mx-auto"
            />
            <Link href="/game">
              <div className="text-center mt-10 mx-6">
                <button className="btn btn-primary w-full">{msg.start}</button>
              </div>
            </Link>
          </div>
        </div>
      )}

      {isTabletOrAbove && (
        <div className="mockup-phone mt-5">
          <div className="camera"></div>
          <div className="display">
            <div
              className="artboard artboard-demo phone-2 from-sky-600 to-slate-700/20
                    bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]"
            >
              <div className="px-4">
                <h1 className="text-2xl text-sky-300 py-4 md:pb-4 md:pt-0 text-center">
                  {msg.points_intro_1}
                </h1>
                <div className="text-center">
                  <Badge time={1} count={1} shadow={false} />
                </div>
                <h2 className="text-md text-sky-300 pt-4 text-center">
                  {msg.points_intro_2}
                </h2>
                <Image
                  alt="The Chill Frog"
                  width={400}
                  height={361}
                  src="/images/buddha-belly-frog-sm.webp"
                  priority
                  className="mt-8 mx-auto"
                />
                <Link href="/game">
                  <div className="text-center mt-10 mx-6">
                    <button className="btn btn-primary w-full">
                      {msg.start}
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
