// "use client"
// import { createQuote, findQuoteById, updateQuote, listQuotesByUser, countQuote, listQuotes, listQuotesBy, countQuoteByUser, findlistQuotesByQuery, allQuotesByUser, listAllQuotes } from '@/Services/ServicesBack/quote';
// import { uploadAFile, uploadAllFiles } from './documents';
// import { getToken, getUserFromSession } from '@/lib/session';
// import { StatusQuote, TypeDocument } from './keywords';
// import { createActionLog } from '../ServicesBack/actionLog';
// import { findUserByMail } from '../ServicesBack/users';
// import { getlistReferentials } from './referentials';
// import { sendEmail, sendEmailQuote } from '@/lib/emails/mailer';


// // export async function createQuoteFront(formData:any, userId?:number) {
// //     console.log("form - ", formData)
// //     if (userId){
// //         const quote = await createQuote({
// //         text: formData.text,
// //         userFirstName:formData.firstName,
// //         userLastName:formData.lastName,
// //         userPhone:formData.phone,
// //         userEmail:formData.mail,
// //         status:"SUBMITTED",
// //         userId: userId,
// //     }, formData);
// //     return quote
// //     }
// //     else{
// //         const quote = await createQuote({
// //         text: formData.text,
// //         userFirstName:formData.firstName,
// //         userLastName:formData.lastName,
// //         userPhone:formData.phone,
// //         userEmail:formData.mail,
// //         status:"SUBMITTED"
// //     }, formData);
// //     sendEmailQuote(formData)
// //     return quote
// //     }
// //     // if (statusQuote === StatusQuote.CREATED) {
// //     //     const action = await createActionLog({
// //     //         timestamp: new Date(),
// //     //         actionDetails: translateAction('CREATED'),
// //     //         userId: user?.id,
// //     //         entityId: packge.id,
// //     //         entityName: "CREATED"
// //     //     })
// //     // }
// //     // if (statusQuote === StatusQuote.SUBMITTED) {
// //     //     const action = await createActionLog({
// //     //         timestamp: new Date(),
// //     //         actionDetails: translateAction('SUBMITTED'),
// //     //         userId: user?.id,
// //     //         entityId: packge.id,
// //     //         entityName: "SUBMITTED"
// //     //     })
// //     // }
// //     // if (statusQuote === StatusQuote.PENDING_RECEIPT) {
// //     //     const action = await createActionLog({
// //     //         timestamp: new Date(),
// //     //         actionDetails: translateAction('VALIDATED'),
// //     //         userId: user?.id,
// //     //         entityId: packge.id,
// //     //         entityName: "VALIDATED"
// //     //     })
// //     // }
// // }

// export async function updateQute(idQuote: number, formData: any, statusQuote: StatusQuote, email?: string) {
//     const currentUser = await getUserFromSession(getToken())
//     const listDocument = await uploadAllFiles(formData.piecesJustificatives)
//     let userId = ""
//     if (email) {
//         const customer = await findUserByMail(formData.email)
//         if (currentUser?.id) userId = customer ? customer.id : currentUser?.id
//     }
//     else {
//         if (currentUser?.id) userId = currentUser?.id
//     }
//     // if (statusQuote === StatusQuote.SUBMITTED) {
//     //     if (formData.correction) {
//     //         const action = await createActionLog({
//     //             timestamp: new Date(),
//     //             actionDetails: translateAction('CORRECTED'),
//     //             userId: currentUser?.id,
//     //             entityId: idQuote,
//     //             entityName: "CORRECTED"
//     //         })
//     //     }
//     //     else {
//     //         const action = await createActionLog({
//     //             timestamp: new Date(),
//     //             actionDetails: translateAction('SUBMITTED'),
//     //             userId: currentUser?.id,
//     //             entityId: idQuote,
//     //             entityName: "SUBMITTED"
//     //         })
//     //     }
//     // }
//     // if (statusQuote === StatusQuote.PENDING_RECEIPT) {
//     //     const action = await createActionLog({
//     //         timestamp: new Date(),
//     //         actionDetails: translateAction('VALIDATED'),
//     //         userId: currentUser?.id,
//     //         entityId: idQuote,
//     //         entityName: "VALIDATED"
//     //     })
//     // }
//     if (statusQuote === StatusQuote.FINISHED) {
//         // const action = await createActionLog({
//         //     timestamp: new Date(),
//         //     actionDetails: translateAction('SHIPPED'),
//         //     userId: currentUser?.id,
//         //     entityId: idQuote,
//         //     entityName: "SHIPPED"
//         // })
//         const stockTimeDate = Date.now() - formData.dateIn?.getTime()
//         const oneDay = 1000 * 60 * 60 * 24
//         const stockTime = Math.round(stockTimeDate / oneDay)
//         const date = new Date()
//         if (formData.stockTime !== stockTime) {
//             date.setDate(date.getDate() + (formData.stockTime - stockTime))
//         }

//         const quote = await updateQuote(idQuote, {
//             status: statusQuote,
//             supportingDocuments: formData.piecesJustificatives,
//             dateFinished: date,
//         })
//         return {
//             ...quote,
//             status: quote.status, StatusQuote
//         }
//     }
//     else {
//         const packge = await updateQuote(idQuote, {
//             status: statusQuote,
//             supportingDocuments: listDocument,

//         });
//         return {
//             ...packge,
//             status: packge.status, StatusQuote
//         }
//     }
// }

// export async function updateStatusReceived(idQuote: number, formData: any, statusQuote: StatusQuote) {
//     console.log("form", formData)
//     const currentUser = await getUserFromSession(getToken())
//     // const action = await createActionLog({
//     //     timestamp: new Date(),
//     //     actionDetails: translateAction('RECEIVED'),
//     //     userId: currentUser?.id,
//     //     entityId: idQuote,
//     //     entityName: "RECEIVED"
//     // })
//     const quote = await updateQuote(idQuote, {
//         status: statusQuote,
//         supportingDocuments: formData.piecesJustificatives,
//     });
// }


// export async function getQuotes(page: number) {
//     const { quotes, totalPages } = await listQuotes(page)
//     return { quotes, totalPages }
// }

// // export async function updateStatus(idQuote: number, statusQuote: StatusQuote, deliveryInfos?: any[]) {
// //     const currentUser = await getUserFromSession(getToken())
// //     const delivery = await getlistReferentials("DELIVERY_MODE")
// //     const deliveryMap = new Map()
// //     delivery.map((item) => {
// //         deliveryMap.set(item.value, item.label)
// //     })
// //     if (statusQuote === StatusQuote.AWAITING_DELIVERY && deliveryInfos) {
// //         const action = await createActionLog({
// //             timestamp: new Date(),
// //             actionDetails: translateAction('DELIVERY'),
// //             userId: currentUser?.id,
// //             entityId: idQuote,
// //             entityName: "DELIVERY"
// //         })
// //         const packge = await updateQuote(idQuote, {
// //             status: statusQuote,
// //             deliveryCost: deliveryInfos[1],
// //             deliveryMode: deliveryInfos[0],
// //             deliveryAddress: deliveryInfos[2],
// //             deliveryAddress2: deliveryInfos[3],
// //             deliveryCity: deliveryInfos[4],
// //             deliveryInfos: deliveryInfos[5],
// //             deliveryCode: Math.floor(100000 + Math.random() * 900000)
// //         });
// //         return packge
// //     }
// //     else {
// //         if (statusQuote === StatusQuote.DELIVERED) {
// //             const action = await createActionLog({
// //                 timestamp: new Date(),
// //                 actionDetails: translateAction('DELIVERED'),
// //                 userId: currentUser?.id,
// //                 entityId: idQuote,
// //                 entityName: "DELIVERED"
// //             })
// //         }
// //         const packge = await updateQuote(idQuote, {
// //             status: statusQuote,
// //         });
// //         return packge
// //     }
// // }


// export async function getQuoteById(id: number) {
//     const quote = await findQuoteById(id)
//     return {
//         ...quote,
//         status: quote.status, StatusQuote
//     }
// }

// export async function getlistQuotes(page: number, statut?: StatusQuote) {
//     if (statut) {
//         const { quotes, totalPages } = await listQuotesBy(page, { status: statut })
//         const newOrder = quotes.map((element) => element, status as StatusQuote);
//         return { newOrder, totalPages }
//     }
//     else {
//         const { quotes, totalPages } = await listQuotes(page)
//         const newOrder = quotes.map((element) => element, status as StatusQuote);
//         return { newOrder, totalPages }
//     }

// }

// export async function getlistQuotesByQuery(page: number, query: string) {
//     const { quotes, totalPages } = await findlistQuotesByQuery(page, query)
//     return { quotes, totalPages }
// }

// export async function getlistQuotesByUser(page: number, userID: string) {
//     const { quotes, totalPages } = await listQuotesByUser(page, userID)
//     const newQuotes = quotes.map((element) => element, status as StatusQuote);
//     console.log("in Front", newQuotes)
//     return { newQuotes, totalPages }
// }

// export async function getAllQuotesByUser(userID: string) {
//     const quotes = await allQuotesByUser(userID)
//     return quotes.map((element) => element, status as StatusQuote)
// }

// export async function getAllQuotes() {
//     const quotes = await listAllQuotes()
//     return quotes.map((element) => element, status as StatusQuote)
// }

// export async function getQuoteCount(status?: StatusQuote) {
//     const count = await countQuote(status)
//     return count
// }

// export async function getQuoteCountByUser(userId: string, status?: StatusQuote) {
//     const count = await countQuoteByUser(userId, status)
//     return count
// }

// // export async function validateQuoteFront(id: number) {
// //     const currentUser = await getUserFromSession(getToken())
// //     const action = await createActionLog({
// //         timestamp: new Date(),
// //         actionDetails: translateAction('VALIDATED'),
// //         userId: currentUser?.id,
// //         entityId: id,
// //         entityName: 'VALIDATED'
// //     })
// //     const pack = await validateQuote(id)
// //     return pack
// // }

// // export async function undeliverableQuoteFront(id: number, correction: string) {
// //     const currentUser = await getUserFromSession(getToken())
// //     const action = await createActionLog({
// //         timestamp: new Date(),
// //         actionDetails: `${translateAction('UNDELIVERABLE')}: ${correction}`,
// //         userId: currentUser?.id,
// //         entityId: id,
// //         entityName: 'UNDELIVERABLE'
// //     })
// //     const pack = await undeliverableQuote(id, correction)
// //     return pack
// // }

// export async function addNewFile(idQuote: number, file: any) {
//     console.log(file)
//     const document = await uploadAFile(file)
//     const quote = await updateQuote(idQuote, {
//         supportingDocuments: [document]

//     });
//     return {
//         ...quote,
//         status: quote.status, StatusQuote
//     }
// }