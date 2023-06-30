import Link from 'next/link';
import { inter } from "@/app/utils/fonts";
import { comfortaa } from "@/app/utils/fonts";
import exercises from '@/app/data/exercise.json';
import { Exercise } from '@/app/types';

export default function ExerciseList(): JSX.Element {
    const exerciseCards: JSX.Element[] = exercises.map((exercise: Exercise) => {
        return (
            <div key={exercise.exerciseId} className="card w-96 bg-neutral text-primary-content">
                <div className="card-body">
                    <h2 className={`card-title ${comfortaa.className}`}>{exercise.title}</h2>
                    <p>{exercise.subtitle}</p>
                    <div className="card-actions justify-end">
                        <Link href={{
                            pathname: '/hr-chart',
                            query: { exerciseId: exercise.exerciseId }
                        }}>
                            <button className="btn">choose</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <section className={`${inter.className} grid grid-cols-3 grid-flow-row grid-rows-3 gap-6 mx-auto mt-12 text-slate-200`}>
            {exerciseCards}
        </section>
    )

}