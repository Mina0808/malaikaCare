"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function YearFilter() {
    const year = new Date().getFullYear();
    const searchParams = useSearchParams();
    const status = searchParams.get("year") || year;
    const ref = useRef<HTMLFormElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        ref.current?.submit();
    };

    useEffect(() => {
        ref.current?.addEventListener("formdata", (event) => {
            let formData = event.formData;
            for (let [name, value] of Array.from(formData.entries())) {
                if (value === "") formData.delete(name);
            }
        });
    });

    return (
        <form ref={ref} onChange={handleChange}>
            <div className="flex-1">
                <select
                    id="country"
                    defaultValue={status}
                    name="country"
                    className="w-full text-gray-700 bg-white border border-gray-200 rounded-lg placeholder-gray-400/70 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                    <option value="" selected>
                        {year}
                    </option>
                </select>
            </div>
            <input type="hidden" name="page" value="1" />
        </form>
    );
}
