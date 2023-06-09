import { inter } from "@/app/utils/fonts";

export default function TopNav() {

    return (
        <section className={`${inter.className} mx-auto mt-12 grid gap-4 lg:grid-cols-3 text-slate-400`}>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-slate-500">What are Chill Points?</h2>
                    <p>
                        Earning chill points feels relaxing because all you do is breathe. 
                        If you can lower your heart rate, you can earn chill points.
                        </p>
                </div>
                <figure><img src="/images/chill-lizard.jpg" alt="Chill Phil" /></figure>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-slate-500">Breath Exercise Options.</h2>
                    <ul>
                        <li>Box Breathing</li>
                        <li>4-7-8 Breathing</li>
                        <li>Alternate Nostril Breathing</li>
                        <li>Diaphragmatic Breathing</li>
                        <li>Equal Breathing</li>
                        <li>Resonant Breathing</li>
                    </ul>
                </div>
                <figure><img src="/images/breath-idea.jpg" alt="Shoes" /></figure>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-slate-500">Begin a session.</h2>
                    <p>Get your heart rate monitor ready.</p>
                </div>
                <figure><img src="/images/microbiology-art.jpg" alt="Female putting on Polar H-10 heart rate chest strap" /></figure>
            </div>
        </section>
    )
}