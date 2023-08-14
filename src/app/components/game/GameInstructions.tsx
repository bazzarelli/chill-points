function GameInstructions() {
  return (
    <div className="border border-sky-800 rounded-md text-left text-sky-300/80 mb-6">
      <div className="text-xl p-4 pb-0">Game Instructions</div>
      <div className="p-4">
        <p className="text-lg">
          The game begins when you press and hold the frog.
        </p>
        <p className="pt-3">
          Inhale through your nose - the blue box grows to match the frog&apos;s
          height.
        </p>
        <p className="pt-3">
          Exhale through your nose - the box shrinks back down.
        </p>
        <p className="pt-3">
          Each inhale/exhale cycle is represented by a pearl. Keep your finger
          on the frog during inhales and off during exhales.
        </p>
      </div>
    </div>
  );
}

export default GameInstructions;
