"use client";
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

// import '@fullcalendar/react/skeleton.css'
// import '@fullcalendar/react/themes/classic/theme.css'
// import '@fullcalendar/react/themes/classic/palette.css'
import Pagination from "@/components/pagination";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from "react";
import Loader from "../../loading";
import { useRouter } from "next/navigation";
import {
    getUserById,
    listInterventions,
} from "@/Services/ServicesFront/users";
import { getColorByInterventionStatus, translateInterventionStatus } from '@/Services/ServicesFront/keywords';

export const dynamic = "force-dynamic";

export default function Page({
    searchParams,
}: {
    searchParams: Record<string, any>;
}) {
    type Event = {
        id: string,
        title: string,
        start: string,
        end: string
    }
    let calendarRef = useRef<any>()
    let interventionC = useRef<any>([]);
    const todayStr = new Date().toISOString().replace(/T.*$/, '')
    const [statut, setStatut] = useState("");
    const [title, setTitle] = useState("");
    const events = [
        {
            id: "1",
            title: `Aminata Sylla`,
            start: "2026-10-18T09:00:00",
            end: "2026-10-18T10:00:00",
            backgroundColor: getColorByInterventionStatus("IN_PROGRESS"),
            borderColor: getColorByInterventionStatus("IN_PROGRESS"),
            extendedProps: {
                professional: `Lena DIOP`,
                client: "Aminata Sylla",
                service:"Aide à la personne",
                address: "35 rue de l'Église",
                status: translateInterventionStatus("IN_PROGRESS"),
            },
        },
    ];
    // const [events, setEvents] = useState<Event[]>([])
    const [pages, setPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<any>()
    //const [interventionUsers, setInterventionUsers] = useState<Map<string, Intervention>>(new Map());
    const router = useRouter();

    // const addIntervention = (
    //     key: string,
    //     intervention: Intervention
    // ) => {
    //     setInterventionUsers(prev => {
    //         const newMap = new Map(prev);
    //         newMap.set(key, intervention);
    //         return newMap;
    //     });
    // };

    async function fetchData(page = 1, filter?: string) {
        setLoading(true);
        const { intervention, totalPages } = await listInterventions(page, filter);
        console.log(intervention);
        interventionC.current = intervention;
        const listEvents: Event[] = []
        intervention.forEach(async (inter) => {
            const client = await getUserById(inter.patientId, "INDIVIDUAL")
            const professional = await getUserById(inter.professionalId, "PROFESSIONAL")
            // addIntervention(inter.id, {
            //     clientFirstName: client.firstName,
            //     clientLastName: client.lastName,
            //     professionalFirstName: professional.firstName,
            //     professionalLastName: professional.lastName
            // })
            const event = {
                id: inter.id,
                title: `${client.firstName} ${client.lastName}`,
                start: inter.startDate.toISOString(),
                end: inter.endDate.toISOString(),
                extendedProps: {
                    professional: `${professional.firstName} ${professional.lastName}`,
                    service: inter.service,
                    address: inter.address,
                    status: inter.status
                },
            }
            listEvents.push(event)

        })
        console.log(listEvents)
        // setEvents(listEvents)
        setPages(totalPages);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    function filterIntervention(status: string) {
        setStatut(status);
        //const [type,stat] = status.split(" ")
        if (status !== "Toutes les interventions") {
            fetchData(1, status);
        } else fetchData();
    }

    if (loading) return <Loader />;


    return (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-blue-950">
                        Suivi des futurs rendez-vous
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Consultez vos futurs rendez-vous et ajoutez vos comptes rendus.
                    </p>
                </div>
                <button
                    onClick={() => router.back()}
                    className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
                >
                    ← Retour au Tableau de bord
                </button>
            </div>
            <div className='flex flex-col'>
                <div className="flex w-fit mb-1 items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/60 self-start sm:self-auto">
                            <button
                                value="Toutes les interventions"
                                onClick={(e) =>
                                    filterIntervention((e.currentTarget as HTMLButtonElement).value)
                                }
                                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${statut === "Toutes les interventions"
                                    ? "bg-white text-blue-950 shadow-xs"
                                    : "text-slate-500 hover:text-slate-800"
                                    }`}
                            >
                                Tous
                            </button>
                            <button
                                value="PLANNED"
                                onClick={(e) =>
                                    filterIntervention((e.currentTarget as HTMLButtonElement).value)
                                }
                                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${statut === "PLANNED"
                                    ? "bg-amber-500 text-blue-950 shadow-xs"
                                    : "text-slate-500 hover:text-slate-800"
                                    }`}
                            >
                                A venir
                            </button>
                            <button
                                value="IN_PROGRESS"
                                onClick={(e) =>
                                    filterIntervention((e.currentTarget as HTMLButtonElement).value)
                                }
                                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${statut === "IN_PROGRESS"
                                    ? "bg-amber-500 text-blue-950 shadow-xs"
                                    : "text-slate-500 hover:text-slate-800"
                                    }`}
                            >
                                En cours
                            </button>
                            <button
                                value="DONE"
                                onClick={(e) =>
                                    filterIntervention((e.currentTarget as HTMLButtonElement).value)
                                }
                                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${statut === "DONE"
                                    ? "bg-blue-950 text-white shadow-xs"
                                    : "text-slate-500 hover:text-slate-800"
                                    }`}
                            >
                                Effectué
                            </button>
                        </div>
            <div className="flex items-center justify-between mb-4">
                <div className='flex justify-between gap-2'>
                    
                    <div className='flex gap-2 ml-2'>
                        <button className="bg-blue-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl`" onClick={() => calendarRef.current?.getApi().prev()}>
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button className="bg-blue-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl`" onClick={() => calendarRef.current?.getApi().next()}>
                            <ChevronRight className="w-6 h-6" />
                        </button>
                        <button className="text-blue-900 bg-slate-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl`" onClick={() => calendarRef.current?.getApi().gotoDate(new Date())}>
                            Aujourd'hui
                        </button>
                    </div>
                </div>
                <h2>
                    {title}
                </h2>
                <button className="bg-blue-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl`" onClick={() => { router.push("/backoffice/care/interventions/add") }}>
                    Nouvelle intervention
                </button>

            </div>
            </div>
            <FullCalendar
                ref={calendarRef}
                plugins={[
                    interactionPlugin,
                    timeGridPlugin,
                ]}
                headerToolbar={false}
                datesSet={(arg) => setTitle(arg.view.title)}
                initialView='timeGridWeek'
                initialDate={todayStr}
                scrollTime='08:00'
                nowIndicator={true}
                editable={true}
                selectable={true}
                selectMirror={true}
                events={events}
                eventClick={(info) => {
                    setSelectedEvent(info.event);
                    console.log(info.event);
                    // alert(`Intervention : ${info.event.title}`);
                }}
                locale="fr"
            />

            {selectedEvent && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-bold mb-4">
                            {selectedEvent.title}
                        </h2>

                        <p>
                            <strong>Service :</strong>{" "}
                            {selectedEvent.extendedProps.service}
                        </p>

                        <p>
                            <strong>Professionnel :</strong>{" "}
                            {selectedEvent.extendedProps.professional}
                        </p>

                        <p>
                            <strong>Adresse :</strong>{" "}
                            {selectedEvent.extendedProps.address}
                        </p>

                        <p>
                            <strong>Statut :</strong>{" "}
                            {selectedEvent.extendedProps.status}
                        </p>

                        <p>
                            <strong>Date :</strong>{" "}
                            {selectedEvent.start?.toLocaleDateString("fr-FR")}
                            {" "}
                            {selectedEvent.start?.getHours() < 10 ? `0${selectedEvent.start?.getHours()}` : `${selectedEvent.start?.getHours()}`} {":"} {selectedEvent.start?.getMinutes() < 10 ? `0${selectedEvent.start?.getMinutes()}` : `${selectedEvent.start?.Minutes()}`}
                            {" - "}
                            {selectedEvent.end?.getHours() < 10 ? `0${selectedEvent.end?.getHours()}` : `${selectedEvent.end?.getHours()}`} {":"} {selectedEvent.end?.getMinutes() < 10 ? `0${selectedEvent.end?.getMinutes()}` : `${selectedEvent.end?.Minutes()}`}
                        </p>

                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => setSelectedEvent(null)}
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div >
    );
}
