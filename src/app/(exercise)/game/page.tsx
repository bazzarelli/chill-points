"use client"

import { inter } from "@/app/utils/fonts";
import Link from 'next/link';
import Image from 'next/image';
import HistoryList from "@/app/components/HistoryList";

export default function Page() {

    return (
        <section className={`${inter.className} flex flex-wrap text-slate-900  text-center`}>
            <div className="w-full bg-slate-800">
                <div className="w-1/3 mx-auto">
                    <button className="w-full text-right" onClick={() => (window as any).help_modal.showModal()}>
                        <Image className="opacity-90 inline-block m-5" src="/icons/info.svg" alt="info icon" width="26" height="26" />
                    </button>
                    <svg className="w-64 h-64 mx-auto" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50" fill="rgb(169, 211, 161)" />
                        <text className="fill-slate-700 text-3xl" x="50%" y="60%" text-anchor="middle">
                            00:46
                        </text>
                    </svg>
                </div>
                <button className="text-slate-300 font-bold text-3xl pb-20">
                    <Image className="mx-auto" src="/images/buddha-belly-frog.webp" alt="Chill Bill" width="500" height="410" />
                    tap and hold while inhaling
                </button>
            </div>
            <HistoryList />
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
