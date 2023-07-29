"use client"

import { inter } from "@/app/utils/fonts";
import Image from 'next/image';
import { motion, useAnimate } from "framer-motion";
import CountdownTimer from "@/app/components/CountdownTimer";
import HelpModal from "@/app/components/HelpModal";
import onContextMenuListener from "@/app/utils/onContextMenuListener";
import { useEffect, useState } from "react";

export default function Page() {
    const [boxscope, animate] = useAnimate();
    const [startTextShow, setStartTextShow] = useState(false);

    useEffect(() => {
        onContextMenuListener();
    }, []);

    function onFrogTapStart() {
        animate(boxscope.current, {
            height: "18rem",
            backgroundColor: "rgb(125 211 252)",
            opacity: 1
        }, {duration: 5});
        setStartTextShow(true);
    }

    function onFrogTapRelease() {
        animate(boxscope.current, {
            height: "1rem",
            backgroundColor: "rgb(255 0 0)",
            opacity: 0
        }, {duration: 5});
    }

    return (
        <section className={`${inter.className} flex flex-wrap text-slate-900  text-center`}>
            <div id="frog-screen" className="w-full bg-slate-800 touch-none">
                <div className="md:w-1/3 mx-auto">
                    <button className="w-full text-right" onClick={() => (window as any).help_modal.showModal()}>
                        <Image className="opacity-90 inline-block m-5" src="/icons/info.svg" alt="info icon" width="26" height="26" />
                    </button>
                    <motion.h3
                        className="text-sky-300/50 text-2xl mb-4 opacity-0"
                        animate={{opacity: startTextShow ? 1 : 0}}
                    >
                        timer started
                    </motion.h3>
                    <div className="w-64 h-64 mx-auto">
                        <CountdownTimer isPlaying={false} duration={60} />
                    </div>
                    <h3 className="text-sky-300/50 text-2xl my-4 px-10">
                        touch frog while inhaling
                    </h3>
                </div>
                {/* FROG BUTTON TAP TARGET */}
                <motion.button
                    onPointerDown={onFrogTapStart}
                    onPointerUp={onFrogTapRelease}
                    className="relative w-80 h-72"
                >
                    <div ref={boxscope} className="absolute bottom-0 left-0 w-full h-0"></div>
                    <Image className="absolute -bottom-10 left-0" src="/images/buddha-belly-frog.webp" alt="Chill Bill" width="440" height="361" />
                </motion.button>
            </div>
            <HelpModal />
        </section>

    );
}
