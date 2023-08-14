import { inter } from "@/app/utils/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className={`${inter.className} w-96 mx-auto mt-1 md:mt-12 text-slate-400 p-4`}
    >
      <h1 className="text-2xl">Chill-a-minute</h1>
      <p className="mb-4">A short breathing game.</p>

      <Link href="/game">
        <button className="btn btn-sm btn-primary drop-shadow-md">
          <span className="text-base">Start</span>
          <svg
            fill="rgb(48,28,39)"
            viewBox="0 -960 960 960"
            width="16"
            height="16"
          >
            <path d="M321-61.912 231.912-151l329-329-329-329L321-898.088 739.088-480 321-61.912Z" />
          </svg>
        </button>
      </Link>

      <h2 className="text-lg pb-2 mt-6">Game Instructions</h2>
      <p>The game begins when you press and hold the frog.</p>
      <p className="pt-3">
        Inhale through your nose - the blue box grows to match the frog&apos;s
        height.
      </p>
      <p className="pt-3">
        Exhale through your nose - the box shrinks back down.
      </p>
      <p className="pt-3">
        Each inhale/exhale cycle is represented by a pearl. Keep your finger on
        the frog during inhales and off during exhales.
      </p>
      <figure className="mt-6">
        <Link href="/game">
          <Image
            alt="Screen capture of the game"
            src="/images/game-screen-cap.jpg"
            width="200"
            height="200"
            className="border border-primary rounded-xl"
          />
        </Link>
      </figure>
    </main>
  );
}
