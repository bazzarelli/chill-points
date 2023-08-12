function GameInstructions() {
  return (
    <div className="collapse collapse-arrow border border-sky-800 text-left text-sky-300/80 mb-6">
      <input type="checkbox" />
      <div className="collapse-title text-xl">Game Instructions</div>
      <div className="collapse-content">
        <p className="text-lg">
          The 1-minute game begins when you press and hold the frog.
        </p>
        <p className="pt-3">
          Inhale through your nose for 5 seconds - the blue box grows to match
          the frog&apos;s height. Exhale through your nose for 5 seconds - the
          box shrinks back down.
        </p>
        <p className="pt-3">
          Each inhale/exhale cycle is 5 seconds and represented by a pearl. Keep
          your finger on the frog during inhales and off during exhales.
        </p>
      </div>
    </div>
  );
}

export default GameInstructions;
