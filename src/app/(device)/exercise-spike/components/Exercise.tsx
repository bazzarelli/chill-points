import ExerciseAnimation from "./Exercise/ExerciseAnimation";
import ExerceriseTimer from "./Exercise/ExerciseTimer"

type ExerciseProps = {
  exerciseTitle: string,
  imgSrc: string
}

export default function Exercise({ exerciseTitle, imgSrc }: ExerciseProps) {
  return (
    <div className="flex mx-auto w-1/2  card-bod text-center mt-4 mb-4">
      <ExerciseAnimation 
            exerciseTitle="[Chosen Exercise Name]" 
            imgSrc=""></ExerciseAnimation>
      <ExerceriseTimer duration={2} instructions="[Instructions]"/>
    </div>
  )
}