"use client"

export default function HelpModal() {

    return (
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
    )
}