import { inter } from "@/app/utils/fonts";
import { comfortaa } from "@/app/utils/fonts";
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {

    return (
        <section className={`${inter.className} flex flex-wrap text-slate-900  text-center`}>
            <div className="w-full bg-slate-800">
                <svg className="w-64 h-64 mx-auto pt-10" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="50" fill="rgb(169, 211, 161)" />
                    <text className="fill-slate-700 text-3xl" x="50%" y="60%" text-anchor="middle">
                        00:46
                    </text>
                </svg>
                <button className="text-slate-300 font-bold text-3xl pb-20">
                    <Image className="mx-auto" src="/images/buddha-belly-frog.webp" alt="Chill Bill" width="500" height="410" />
                    tap and hold while inhaling
                </button>
            </div>

        </section>
    );
}
