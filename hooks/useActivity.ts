// "use client"

// import { useState } from "react";
// import type { Activity } from "@prisma/client";

// type ActivitiesByKind = {
//   [key: string]: Activity[];
// };

// export default function useActivities(activities: Activity[], defaultActivityKind: string | null) {
//   const activitiesByKind = activities.reduce((acc: any, activity: Activity) => {
//     if (!acc[activity.kind]) {
//       acc[activity.kind] = [];
//     }

//     acc[activity.kind].push(activity);
//     return acc;
//   }, {} as ActivitiesByKind);
//   const [activityKind, setActivityKind] = useState<string | null>(
//     defaultActivityKind
//   );
//   return {
//     activitiesByKind,
//     activityKind,
//     setActivityKind,
//   };
// }
