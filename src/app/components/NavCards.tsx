import { inter } from "@/app/utils/fonts";
import Link from 'next/link';
import Image from 'next/image';

export default function TopNav() {

    return (
        <section className={`${inter.className} mx-auto mt-12 grid gap-4 lg:grid-cols-3 text-slate-400`}>
            <div className="card w-96 bg-base-100 shadow-xl rounded-tl-none rounded-tr-none">
                <div className="card-body">
                    <h2 className="card-title text-slate-500">What are Chill Points?</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <figure>
                    <Image className="opacity-20" src="/images/image-icon.svg" alt="Chill Phil" width="384" height="216" />
                    {/* <img src="/images/chill-lizard.jpg" alt="Chill Phil" /> */}
                </figure>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl rounded-tl-none rounded-tr-none">
                <div className="card-body">
                    <h2 className="card-title text-slate-500">Breath Exercises</h2>
                    <p>Visit the exercise gallery.</p>
                    <Link href="/gallery">
                        <button className="btn drop-shadow-md">
                            <span className="text-lg">Gallery</span>
                        </button>
                    </Link>
                </div>
                <figure>
                    <Image className="opacity-20" src="/images/image-icon.svg" alt="Chill Phil" width="384" height="216" />
                    {/* <img src="/images/breath-idea.jpg" alt="Abstract image" /> */}
                </figure>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl rounded-tl-none rounded-tr-none">
                <div className="card-body">
                    <h2 className="card-title text-slate-500">Begin a session</h2>
                    <p>Get your heart rate monitor ready to pair.</p>
                    <Link href="/hr-chart">
                        <button className="btn drop-shadow-md">
                            <span className="text-lg">Pair</span>
                            <svg fill="rgb(100, 116, 139)" viewBox="0 -960 960 960" width="20" height="20">
                                <path d="M321-61.912 231.912-151l329-329-329-329L321-898.088 739.088-480 321-61.912Z" />
                            </svg>
                        </button>
                    </Link>
                </div>
                <figure>
                    <Image className="opacity-20" src="/images/image-icon.svg" alt="Chill Phil" width="384" height="216" />
                    {/* <img src="/images/microbiology-art.jpg" alt="Abstract lung nerve cell illustration" /> */}
                </figure>
            </div>
        </section>
    )
}