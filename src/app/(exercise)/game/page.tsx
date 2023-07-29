"use client"

import { inter } from "@/app/utils/fonts";
import Image from 'next/image';
import { motion, useAnimate } from "framer-motion";
import CountdownTimer from "@/app/components/CountdownTimer";

export default function Page() {
    const [boxscope, animate] = useAnimate();

    function onFrogTapStart() {
        animate(boxscope.current, {
            height: "18rem",
            backgroundColor: "rgb(125 211 252)",
            opacity: 1
        }, {duration: 5});
        console.log("frog tap started");
    }

    function onFrogTapRelease() {
        animate(boxscope.current, {
            height: "1rem",
            backgroundColor: "#F00",
            opacity: 0
        }, {duration: 5});
        console.log("frog tap ended");
    }

    return (
        <section className={`${inter.className} flex flex-wrap text-slate-900  text-center`}>
            <div className="w-full bg-slate-800">
                <div className="md:w-1/3 mx-auto">
                    <button className="w-full text-right" onClick={() => (window as any).help_modal.showModal()}>
                        <Image className="opacity-90 inline-block m-5" src="/icons/info.svg" alt="info icon" width="26" height="26" />
                    </button>

                    <div className="w-64 h-64 mx-auto">
                        <CountdownTimer duration={60} />
                    </div>

                    <h3 className="text-sky-300/50 text-2xl my-4 px-10">
                        tap and hold on the frog belly while inhaling
                    </h3>
                </div>
                {/* FROG BUTTON TAP TARGET */}
                <motion.button
                    onTapStart={onFrogTapStart}
                    onTap={onFrogTapRelease}
                    className="relative w-80 h-72"
                >
                    <div ref={boxscope} className="absolute bottom-0 left-0 w-full h-0"></div>
                    <Image className="absolute -bottom-10 left-0" src="/images/buddha-belly-frog.webp" alt="Chill Bill" width="440" height="361" />
                </motion.button>
            </div>
            <dialog id="help_modal" className="modal">
                <form method="dialog" className="modal-box text-left">
                    <h3 className="font-bold text-lg">How to Chill a minute</h3>
                    <p className="py-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <p className="pb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="modal-action">
                        <button className="btn">Close</button>
                    </div>
                </form>
            </dialog>

        </section>

    );
}
