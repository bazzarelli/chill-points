
import Image from 'next/image';

type GetReadyProps = {
  exerciseTitle: string,
  imgSrc: string,
  handleStart: () => void
}

export default function GetReady({ exerciseTitle, imgSrc, handleStart }: GetReadyProps) {
  return (
    <div className="mx-auto w-1/2 text-center">
      <div className="card bg-base-100 shadow-xl text-center">
        <div className="card-bod justify-center mt-4 mb-4">
          <h2 className="card-title text-slate-500 justify-center"> Get Ready To Chill</h2>
          <div className="text-slate-500">{exerciseTitle}</div>
          <figure>
              <Image className="opacity-20" src="/images/image-icon.svg" alt="Chill Phil" width="384" height="216" />
              {/* <img src="/images/chill-lizard.jpg" alt="Chill Phil" /> */}
          </figure>
          <button className="btn drop-shadow-md" style={{width: "384px"}} onClick={handleStart}>
              <span className="text-lg">Start Exercise</span>
          </button>
        </div>
      </div>
    </div>
  )
}