function GameInstructions() {
  return (
    <div className="border border-sky-500 py-4 px-5 rounded-md mt-6 bg-slate-800/50 text-sky-300">
      <p className="text-lg">
        The game begins when you press and hold the finger print icon.
      </p>
      <ul className="list-decimal list-inside">
        <li className="pt-3">
          Inhale through your nose - the box grows taller.
        </li>
        <li className="pt-3">
          Exhale through your nose - the box shrinks back down.
        </li>
        <li className="pt-3">
          Keep your finger on the finger print icon during inhales and off
          during exhales.
        </li>
      </ul>
    </div>
  );
}

export default GameInstructions;
