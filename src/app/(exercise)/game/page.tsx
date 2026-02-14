"use client";

import BadgeMinter from "@/app/components/game/BadgeMinter";
import BreathCountDots from "@/app/components/game/BreathCountDots";
import CountdownTimer from "@/app/components/game/CountdownTimer";
import GameBanner from "@/app/components/game/GameBanner";
import GameComplete from "@/app/components/game/GameComplete";
import SettingsModal from "@/app/components/game/SettingsModal";
import ReplayIcon from "@/app/components/svg/ReplayIcon";
import SettingsIcon from "@/app/components/svg/SettingsIcon";
import ShareIcon from "@/app/components/svg/ShareIcon";
import { useGameController, gamePageShareInfo } from "@/app/hooks/useGameController";
import { msg } from "@/app/i18n/frog-msg";
import Head from "next/head";

export default function Page() {
  const {
    banner,
    bind,
    boxBg,
    boxscope,
    clockCoords,
    clockKey,
    clockRef,
    gameOver,
    handleAction,
    isCancelled,
    isComplete,
    isInProgress,
    isSupported,
    loading,
    share,
    userGameLength,
  } = useGameController();

  return (
    <section className="text-center">
      <Head>
        <title>Chill Points: game</title>
      </Head>
      <div className="w-full touch-none select-none relative z-10">
        <div className="mx-auto">
          <div className="flex">
            {!loading && isSupported ? (
              <button
                aria-label="Social Share"
                className="w-1/2 text-left pt-2"
                onClick={() => {
                  share(gamePageShareInfo);
                }}
              >
                <ShareIcon
                  className="ml-4 mt-3 inline-block fill-sky-300/80"
                  width={28}
                  height={28}
                />
              </button>
            ) : (
              <button
                aria-label="Reset game"
                className="w-1/2 text-left pt-2"
                onClick={() => {
                  handleAction("reset");
                }}
              >
                <ReplayIcon
                  className="ml-4 mt-3 inline-block fill-sky-300/80"
                  width={28}
                  height={28}
                />
              </button>
            )}
            <button
              aria-label="Game settings"
              data-testid="settingsButton"
              className="w-1/2 text-right pt-2"
              onClick={() => {
                handleAction("reset");
                (window as any).settings_modal.showModal();
              }}
            >
              <SettingsIcon
                className="mr-4 mt-3 inline-block fill-sky-300/80"
                width={28}
                height={28}
              />
            </button>
          </div>
          <div ref={clockRef} className="mx-auto h-24 w-24">
            {gameOver.current ? (
              <BadgeMinter isPlaying={gameOver.current} coords={clockCoords} />
            ) : (
              <CountdownTimer
                isPlaying={isInProgress}
                duration={userGameLength * 60}
                key={clockKey}
              />
            )}
          </div>
          <GameBanner banner={banner} />
          <div className="mt-2 h-6 w-full text-center">
            {isCancelled ? (
              <button
                aria-label="Reset game"
                onClick={() => handleAction("reset")}
                className="text-md border-slate-100/30 border-2 px-3 py-1 rounded-lg
                text-sky-300"
              >
                {msg.restart}
              </button>
            ) : (
              <BreathCountDots />
            )}
          </div>
        </div>
        <button
          {...bind()}
          aria-label="Finger print breath button"
          className="finger-print relative mt-5 mx-auto h-48 w-64
          bg-[url(/images/thumb-print-dk-blue.svg)]
          bg-no-repeat bg-center"
          id="frog-box"
        >
          <div
            ref={boxscope}
            className={`absolute bottom-0 left-0 right-0 h-1 rounded-sm -z-10 ${boxBg}`}
          ></div>
        </button>
      </div>
      <SettingsModal />
      {isComplete && <GameComplete />}
    </section>
  );
}
