import Image from 'next/image';
import '../../CSS/ExerciseAnimation.css';

type ExerciseAnimationProps = {
  exerciseTitle: string,
  imgSrc: string,
}

export default function ExerciseAnimation({ exerciseTitle, imgSrc }: ExerciseAnimationProps) {
  return (
    <div className="mx-auto w-1/2 text-center">
      <div className="card bg-base-100 shadow-xl text-center">
        <div className="card-bod justify-center mt-4 mb-4">
          <h2 className="card-title text-slate-500 justify-center"> {exerciseTitle}</h2>
          <figure>
              <Image 
                className="ExerciseAnimation" 
                src="/images/image-icon.svg" 
                alt="Chill Phil" 
                width="384" 
                height="216"/>
          </figure>
        </div>
      </div>
    </div>
  )
}