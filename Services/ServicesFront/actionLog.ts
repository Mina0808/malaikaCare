// import { findActionsByPackage, findHistoryByTrackingNumber } from "../ServicesBack/actionLog";

// export async function getActionsByPackage(idPkg: number){
//     const action = await findActionsByPackage(idPkg)
//     return action
// }

// export async function getHistoryByTrackingNumber(tracking:string){
//     const history = await findHistoryByTrackingNumber(tracking)
//     console.log("front", history)
//     const historyNames = ["VALIDATED", "RECEIVED", "SHIPPED", "ARRIVED", "DELIVERY", "DELIVERED"]
//     return history.filter(item=>item.entityName!=null && historyNames.includes(item.entityName as string))
// }