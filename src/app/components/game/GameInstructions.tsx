import Image from "next/image";
import Link from "next/link";

function GameInstructions() {
  return (
    <div className="border border-sky-800 p-4 rounded-md mt-6 bg-slate-800">
      <h2 className="text-lg pb-2">Game Instructions</h2>
      <p className="text-lg">
        The game begins when you press and hold the frog.
      </p>
      <ul className="list-decimal list-inside">
        <li className="pt-3">
          Inhale through your nose - the blue box grows to match the frog&apos;s
          height.
        </li>
        <li className="pt-3">
          Exhale through your nose - the box shrinks back down.
        </li>
        <li className="pt-3">
          Keep your finger on the frog during inhales and off during exhales.
        </li>
      </ul>
      <figure className="relative mt-6 mb-3 w-[240px] mx-auto">
        <Link href="/game">
          <Image
            alt="Animated screen capture of the game"
            src="/images/frog-demo.webp"
            width="262"
            height="210"
            className="border border-info"
          />
        </Link>
      </figure>
    </div>
  );
}

export default GameInstructions;
