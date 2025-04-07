"use client";

import Badge from "@/app/components/game/Badge";
import { msg } from "@/app/i18n/frog-msg";
import Image from "next/image";
import { Link } from "nextjs13-progress";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const [totalTime, setTotalTime] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTabletOrAbove = useMediaQuery({ minWidth: 769 });

  useEffect(() => {
    const fetchTotalTime = async () => {
      try {
        // Try to get from localStorage first
        const storedTotal = localStorage.getItem("totalGameLength");
        storedTotal ? setTotalTime(parseInt(storedTotal)) : setTotalTime(0);

        // Fetch latest from API
        const response = await fetch("/api/total-game-length");
        const data = await response.json();

        // Update state and localStorage
        setTotalTime(data.totalGameLength);
        // localStorage.setItem('totalGameLength', data.totalGameLength.toString());
      } catch (error) {
        console.error("Error fetching total time:", error);
        // If API fails, we'll still have localStorage value
      }
    };

    fetchTotalTime();
  }, []);

  return (
    <>
      {isMobile && (
        // <div
        //   className="text-slate-400 border-sky-300
        //       border-t-[10px] min-h-screen
        //       bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]
        //     from-sky-600 to-slate-700/20"
        // >
        <div
          className="text-slate-400 border-sky-300
              border-t-[10px] min-h-screen
              bg-[#0072b7]"
        >
          <div>
            <h1 className="text-2xl text-sky-300 py-4 md:pb-4 md:pt-0 text-center">
              {msg.points_intro_2}
            </h1>
            <div className="text-center">
              {/* add dynamic badge based on total points calculated by
              summing up points from each gameLength */}
              <Badge time={0} count={totalTime} shadow={false} />
            </div>
            {/* <h2 className="text-md text-sky-300 pt-4 text-center">
              {msg.points_intro_2}
            </h2> */}
            {/* <Image
              alt="The Chill Frog"
              width={400}
              height={361}
              src="/images/buddha-belly-frog-sm.webp"
              priority
              className="mt-8 mx-auto"
            /> */}
            <video
              poster="/images/buddha-belly-frog-sm.webp"
              autoPlay
              loop
              playsInline
              muted
              className="w-full my-10"
            >
              <source
                src="/videos/combined-breath-optimized.webm"
                type="video/webm"
              />
              <source
                src="/videos/combined-breath-optimized.mp4"
                type="video/mp4"
              />
            </video>
            <Link href="/game">
              <div className="text-center mt-5 mx-6">
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
            {/* <div
              className="artboard artboard-demo phone-2 from-sky-600 to-slate-700/20
                    bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]"
            > */}
            <div className="artboard artboard-demo phone-2 bg-[#004e7d]">
              <div>
                <h1 className="text-2xl text-sky-300 py-4 md:pb-4 md:pt-0 text-center">
                  {msg.points_intro_2}
                </h1>
                <div className="text-center">
                  <Badge time={0} count={totalTime} shadow={false} />
                </div>
                {/* <h2 className="text-md text-sky-300 pt-4 text-center">
                  {msg.points_intro_2}
                </h2> */}
                {/* <Image
                  alt="The Chill Frog"
                  width={400}
                  height={361}
                  src="/images/buddha-belly-frog-sm.webp"
                  priority
                  className="mt-8 mx-auto"
                />{" "} */}
                <video
                  poster="/images/buddha-belly-frog-sm.webp"
                  autoPlay
                  loop
                  // src="/videos/combined_breathing.mp4"
                  playsInline
                  muted
                  className="w-full mt-8"
                >
                  <source
                    src="/videos/combined-breath-optimized.webm"
                    type="video/webm"
                  />
                  <source
                    src="/videos/combined-breath-optimized.mp4"
                    type="video/mp4"
                  />
                </video>
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
