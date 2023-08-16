import TouchIcon from "@/app/components/svg/TouchIcon";
import Image from "next/image";
import Link from "next/link";

function GameInstructions() {
  return (
    <div className="collapse collapse-arrow border border-sky-800 rounded-md mt-6 bg-slate-800">
      <h2 className="text-lg pb-2 collapse-title">Game Instructions</h2>
      <input type="checkbox" />
      <div className="collapse-content">
        <p className="text-lg">
          The game begins when you press and hold the frog.
        </p>
        <ul className="list-decimal list-inside">
          <li className="pt-3">
            Inhale through your nose - the blue box grows to match the
            frog&apos;s height.
          </li>
          <li className="pt-3">
            Exhale through your nose - the box shrinks back down.
          </li>
          <li className="pt-3">
            Inhale time is set to 5 seconds, exhale time is set to 5 seconds.
          </li>
          <li className="pt-3">
            Keep your finger on the frog during inhales and off during exhales.
          </li>
        </ul>
        <figure className="relative mt-6 w-[200px]">
          <Link href="/game">
            <Image
              alt="Screen capture of the game"
              src="/images/game-screen-cap.jpg"
              width="200"
              height="200"
              className="border border-info rounded-md"
            />
          </Link>
          <TouchIcon
            className="absolute left-20 bottom-6"
            width={50}
            height={50}
            fill={`#1b2533`}
          />
        </figure>
      </div>
    </div>
  );
}

export default GameInstructions;
