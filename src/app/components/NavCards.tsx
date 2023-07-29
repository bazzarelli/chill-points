import { inter } from "@/app/utils/fonts";
import Link from 'next/link';
import Image from 'next/image';

export default function TopNav() {

    return (
        <section className={`${inter.className} mx-auto mt-1 md:mt-12 grid gap-4 lg:grid-cols-3 text-slate-400`}>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-slate-500">Chill-a-min</h2>
                    <p>A one minute breathing game.</p>
                    <Link href="/game">
                        <button className="btn drop-shadow-md">
                            <span className="text-lg">Start</span>
                            <svg fill="rgb(100, 116, 139)" viewBox="0 -960 960 960" width="20" height="20">
                                <path d="M321-61.912 231.912-151l329-329-329-329L321-898.088 739.088-480 321-61.912Z" />
                            </svg>
                        </button>
                    </Link>
                </div>
                <figure>
                    <video autoPlay loop muted playsInline>
                        <source src="/images/frog-inhale-512.mp4" type="video/mp4" />
                        <source src="/images/frog-inhale-512.webm" type="video/webm" />
                    </video>
                </figure>
            </div>
            {/* <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-slate-500 mb-5">Begin a breath session</h2>
                    <Link href="/hr-chart">
                        <button className="btn drop-shadow-md">
                            <span className="text-lg">Start</span>
                            <svg fill="rgb(100, 116, 139)" viewBox="0 -960 960 960" width="20" height="20">
                                <path d="M321-61.912 231.912-151l329-329-329-329L321-898.088 739.088-480 321-61.912Z" />
                            </svg>
                        </button>
                    </Link>
                </div>
                <figure>
                    <Image src="/images/chill-lizard.jpg" alt="Abstract lung nerve cell illustration" width="2048" height="3072"  />
                </figure>
            </div> */}
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-slate-500">Lorem ipsum dolor</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <figure>
                    <Image className="opacity-20" src="/images/image-icon.svg" alt="Abstract image" width="2048" height="3072" />
                </figure>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-slate-500">Lorem ipsum dolor</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <figure>
                    <Image className="opacity-20" src="/images/image-icon.svg" alt="Abstract image" width="2048" height="3072" />
                </figure>
            </div>
        </section>
    )
}