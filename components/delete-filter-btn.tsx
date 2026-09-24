"use client";

import { FunnelIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


export default function DeleteFilterBtn({
    href
}: {
    href: string;
}) {


    return (
        <div className="mt-3">
            <button
                onClick={() => {
                    window.location.reload();
                }}
                type="button"
                className="text-white bg-blue focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-2 py-1.5 text-center me-2 mb-2 "
            >
                <Link href={{ query:{status:''}}}>
                <FunnelIcon className="w-5 h-5 font-bold" />
                </Link>
            </button>
        </div>
    );
}
