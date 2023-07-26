'use client';

export default function HistoryList() {

    return (
        <div className="w-1/3 mx-auto bg-gray-400 text-left">
            <h2 className="p-2 text-2xl">History List</h2>
            <div className="flex bg-gray-300 font-semibold">
                <div className="w-1/2 h-7 pl-2">Jun 19 - 25</div>
                <div className="w-1/2 h-7 text-right pr-2">16 bpm avg</div>
            </div>
            <div className="flex bg-gray-200 border border-slate-400 py-1">
                <div className="w-6/12 h-5 pl-2">6/24</div>
                <div className="w-5/12 h-5 pl-2">17 bpm</div>
                <div className="w-1/12 h-5">
                    <svg fill="rgb(100, 116, 139)" viewBox="0 -960 960 960" width="20" height="20">
                        <path d="M321-61.912 231.912-151l329-329-329-329L321-898.088 739.088-480 321-61.912Z" />
                    </svg>
                </div>
            </div>
            <div className="flex bg-gray-200 border border-t-0 border-slate-400 py-1">
                <div className="w-6/12 h-5 pl-2">6/22</div>
                <div className="w-5/12 h-5 pl-2">14 bpm</div>
                <div className="w-1/12 h-5">
                    <svg fill="rgb(100, 116, 139)" viewBox="0 -960 960 960" width="20" height="20">
                        <path d="M321-61.912 231.912-151l329-329-329-329L321-898.088 739.088-480 321-61.912Z" />
                    </svg>
                </div>
            </div>
            <div className="flex bg-gray-200 border border-t-0 border-slate-400 py-1">
                <div className="w-6/12 h-5 pl-2">6/19</div>
                <div className="w-5/12 h-5 pl-2">16 bpm</div>
                <div className="w-1/12 h-5">
                    <svg fill="rgb(100, 116, 139)" viewBox="0 -960 960 960" width="20" height="20">
                        <path d="M321-61.912 231.912-151l329-329-329-329L321-898.088 739.088-480 321-61.912Z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
