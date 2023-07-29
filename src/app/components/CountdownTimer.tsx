import { CountdownCircleTimer } from "react-countdown-circle-timer";

type RenderTimeProps = {
    remainingTime: number;
};

const renderTime = ({ remainingTime }: RenderTimeProps) => {
    if (remainingTime === 0) {
        return <div className="text-3xl text-[#a8ca9a]">You did it!</div>;
    }

    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
    const secondsFormatted = seconds < 10 ? `0${seconds}` : seconds
    const timeFormatted = minutes ? `${minutes}:${secondsFormatted}` : `${secondsFormatted}`

    return (
        <div className="text-6xl font-semibold text-[#a8ca9a]">
            {timeFormatted}
        </div>
    );
};

type CountdownTimerProps = {
    duration: number;
    isPlaying: boolean;
}

export default function CountdownTimer({ duration, isPlaying }: CountdownTimerProps) {
    return (
        <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={duration}
            updateInterval={0}
            strokeWidth={4}
            trailStrokeWidth={12}
            rotation={"counterclockwise"}
            size={256}
            trailColor={"#a8ca9a"}
            colors={"#1b2533"}
            onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        >
            {renderTime}
        </CountdownCircleTimer>
    );
}