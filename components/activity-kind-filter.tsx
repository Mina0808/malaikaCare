"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
// import { TranslatedStatus } from "@/lib/helpers/subscription";

export default function ActivityKindFilter() {
    const searchParams = useSearchParams();
    // const status = searchParams.get("status") || TranslatedStatus.SUBMITTED;
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
        <form ref={ref} onChange={handleChange} className="w-56">
            <select
                name="activityKind"
                id="type"
                className="input"
                defaultValue={searchParams.get("activityKind") ?? ""}
            >
                <option value="">Tous les types d'activités</option>
                <option value="Travaux">Travaux</option>
                <option value="Services">Services</option>
                <option value="Fournitures">Fournitures</option>
            </select>
        </form>
    );
}
