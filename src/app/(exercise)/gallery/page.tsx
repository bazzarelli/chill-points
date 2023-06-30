import { inter } from "@/app/utils/fonts";
import { comfortaa } from "@/app/utils/fonts";
import Link from 'next/link';

export default function Page() {

    return (
        <section className={`${inter.className} grid grid-cols-3 grid-flow-row grid-rows-3 gap-6 mx-auto mt-12 text-slate-200`}>
            <div className="card w-96 bg-secondary text-primary-content">
                <div className="card-body">
                    <h2 className={`card-title ${comfortaa.className}`}>4-7-8 Breathing</h2>
                    <p>De-escalate with this popular enlongated exhale technique.</p>
                    <div className="card-actions justify-end">
                    <Link href={{
                        pathname: '/hr-chart',
                        query: { exerciseId: '478' }
                    }}>
                        <button className="btn">choose</button>
                    </Link>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-neutral text-primary-content">
                <div className="card-body">
                    <h2 className={`card-title ${comfortaa.className}`}>Equal Breathing</h2>
                    <p>Simple and effective technique to bring balance between fight/flight &amp; rest/digest</p>
                    <div className="card-actions justify-end">
                    <Link href={{
                        pathname: '/hr-chart',
                        query: { exerciseId: 'equal' }
                    }}>
                        <button className="btn">choose</button>
                    </Link>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-neutral text-primary-content">
                <div className="card-body">
                    <h2 className={`card-title ${comfortaa.className}`}>Resonant Breathing</h2>
                    <p>Slow down to 10 breath cycles per minute to bring breath and heart into sync.</p>
                    <div className="card-actions justify-end">
                    <Link href={{
                        pathname: '/hr-chart',
                        query: { exerciseId: 'resonant' }
                    }}>
                        <button className="btn">choose</button>
                    </Link>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-secondary text-primary-content">
                <div className="card-body">
                    <h2 className={`card-title ${comfortaa.className}`}>Physiological Sigh</h2>
                    <p>Quickest real-time stress reliever technique</p>
                    <div className="card-actions justify-end">
                    <Link href={{
                        pathname: '/hr-chart',
                        query: { exerciseId: 'sigh' }
                    }}>
                        <button className="btn">choose</button>
                    </Link>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-accent text-primary-content">
                <div className="card-body">
                    <h2 className={`card-title ${comfortaa.className}`}>Breath of Fire</h2>
                    <p>Turn up the intensity with a heat building breath technique.</p>
                    <div className="card-actions justify-end">
                    <Link href={{
                        pathname: '/hr-chart',
                        query: { exerciseId: 'fire' }
                    }}>
                        <button className="btn">choose</button>
                    </Link>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-secondary text-primary-content">
                <div className="card-body">
                    <h2 className={`card-title ${comfortaa.className}`}>Breath Hold</h2>
                    <p>Condition yourself to breath more efficiently for optimal oxygen saturation.</p>
                    <div className="card-actions justify-end">
                    <Link href={{
                        pathname: '/hr-chart',
                        query: { exerciseId: 'hold' }
                    }}>
                        <button className="btn">choose</button>
                    </Link>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-neutral text-primary-content">
                <div className="card-body">
                    <h2 className={`card-title ${comfortaa.className}`}>Box Breathing</h2>
                    <p>Bring balance to your system with 4 equal breath steps.</p>
                    <div className="card-actions justify-end">
                    <Link href={{
                        pathname: '/hr-chart',
                        query: { exerciseId: 'box' }
                    }}>
                        <button className="btn">choose</button>
                    </Link>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-neutral text-primary-content">
                <div className="card-body">
                    <h2 className={`card-title ${comfortaa.className}`}>Diaphragmatic Breathing</h2>
                    <p>Engage the diaphram for awareness and oxygen capacity expansion.</p>
                    <div className="card-actions justify-end">
                    <Link href={{
                        pathname: '/hr-chart',
                        query: { exerciseId: 'diaphram' }
                    }}>
                        <button className="btn">choose</button>
                    </Link>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-neutral text-primary-content">
                <div className="card-body">
                    <h2 className={`card-title ${comfortaa.className}`}>Alternate Nostril Breathing</h2>
                    <p>Refine your equilibrium with targeted breath pathway channeling.</p>
                    <div className="card-actions justify-end">
                    <Link href={{
                        pathname: '/hr-chart',
                        query: { exerciseId: 'alternate' }
                    }}>
                        <button className="btn">choose</button>
                    </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
