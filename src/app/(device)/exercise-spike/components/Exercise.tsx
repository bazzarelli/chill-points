import ExerciseAnimation from "./Exercise/ExerciseAnimation";
import ExerceriseTimer from "./Exercise/ExerciseTimer"

type ExerciseProps = {
  exerciseTitle: string,
  imgSrc: string,
  handleExerciseComplete: () => void,
}

export default function Exercise({ exerciseTitle, imgSrc, handleExerciseComplete }: ExerciseProps) {
  return (
    <div>
      <div className="flex mx-auto w-5/6  card-bod text-center mt-4 mb-4">
        <ExerciseAnimation 
              exerciseTitle={exerciseTitle}
              imgSrc={imgSrc}></ExerciseAnimation>
        <ExerceriseTimer duration={2} instructions="[Instructions]"/>
      </div>
      <button className="text-lg" onClick={handleExerciseComplete}>Complete Exercise (Testing Only)</button>
    </div>
  )
}