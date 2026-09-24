import { addDocuments } from "../ServicesBack/documents";
import { findBackofficeUsers, findBeneficiaryByRequest, findDocumentsByRequest, findRequestById, updateOtherContact, createEmergencyContact, findUserByMail, emailValid, createRequest, listClients, updateUser, findCustomers, createUser, findEmergencyContact, findUserById, findRequestsByUser, findRequests, findUsersByRequests, updateRequest, findEmergencyContactById, nbClient, nbFinishedInfos, nbFinishedQuotes, nbInfos, nbQuotes, nbReceivedQuotes, nbSubmittedQuotes, addBenefactor, findBenefactor, findBeneficiariesByUser, findBeneficiaryById, findUserByRequest, findPassword, updatePwd, findBenefactors } from "../ServicesBack/users"
import bcrypt from "bcryptjs";
import { uploadAllFiles } from "./documents";
import { capitalize } from "./keywords";

export async function updateUserFront(id: string, payload: any) {
  const user = await updateUser(id, {
    firstName: capitalize(payload.firstName),
    lastName: capitalize(payload.lastName),
    phone: payload.phone,
    country: payload.country,
    address: payload.address,
    city: capitalize(payload.city),
  })
  return user
}

export async function getPassword(id:string){
  return await findPassword(id)
}

export async function checkPassword(oldPwd:string, newPwd:string){
  return await bcrypt.compare(newPwd, oldPwd);
}

export async function updatePassword(id:string, pwd:string){
  const password = await bcrypt.hash(pwd, 10)
  return await updatePwd(id, password)
}

export async function getBenefactors(userId:string){
  const benefactorMap = new Map()
  
  const benefactors = await findBenefactors(userId)
  benefactors.forEach((benefactor: any) => (
    benefactorMap.set(benefactor.id,benefactor)
  ))
  return benefactorMap
}

export async function updateBeneficiariesFront(payload: any, userId: string, id?: string){
  if (id) {
    const user = await updateOtherContact(id, {
      firstName: capitalize(payload.firstName),
      lastName: capitalize(payload.lastName),
      phone: payload.phone,
      email: payload.email,
    })
    return user
  }
  else {
    const user = await addBenefactor({
      firstName: capitalize(payload.firstName),
      lastName: capitalize(payload.lastName),
      phone: payload.phone,
      email: payload.email,
      type: 'BENEFACTOR',
      beneficiaryOf: { connect: { id: userId } }
    })
    // await updateUser(userId, {
    //   isEmergencyContact:true
    // })
    return user
  }
}

export async function updateEmergencyContactFront(payload: any, userId: string, id?: string) {
  if (id) {
    const user = await updateOtherContact(id, {
      firstName: capitalize(payload.firstName),
      lastName: capitalize(payload.lastName),
      phone: payload.phone,
      email: payload.email,
    })
    return user
  }
  else {
    const user = await createEmergencyContact({
      firstName: capitalize(payload.firstName),
      lastName: capitalize(payload.lastName),
      phone: payload.phone,
      email: payload.email,
      type: 'EMERGENCY',
      emergencyOf: { connect: { id: userId } }
    })
    await updateUser(userId, {
      isEmergencyContact:true
    })
    return user
  }

}

export async function createUserFront(payload: any) {
  const pwd = '123456789'
  const password = await bcrypt.hash(pwd, 10)
  const user = await createUser({
    firstName: capitalize(payload.firstName),
    lastName: capitalize(payload.lastName),
    phone: payload.phone,
    email: payload.email,
    country: payload.country,
    address: payload.address,
    city: capitalize(payload.city),
    role: "INDIVIDUAL",
    status: "ACTIF",
    password,
    isEmergencyContact: false
  })
  return user
}

export async function emailValidFront(email: string) {
  return await emailValid(email)
}

export async function updateUserStatus(id: string, status: string) {
  await updateUser(id, { status })
}

export async function newRequest(payload: any, type: string, user?: any, docs?:any) {
  console.log("Payload: ", payload)
  const pwd = '123456789'
  const password = await bcrypt.hash(pwd, 10)
  let requestId = -1
  let userId = ""
  if (user) { //Si l'utilisateur a déjà un compte
    if (payload.clientLastName) { //Si l'utilisateur a désigné un bénéficiaire, nouvelle requête avec un bénéficiaire
      let client = await findBenefactor(user.id, payload.clientFirstName, payload.clientLastName)
      if (!client) {
        client = await addBenefactor({
          firstName: capitalize(payload.clientFirstName),
          lastName: capitalize(payload.clientLastName),
          email: payload.clientEmail,
          phone: payload.clientPhone,
          type: "BENEFACTOR",
          beneficiaryOf: { connect: { id: user.id } }
        })
      }
      const request = await createRequest({
        name: "",
        type,
        status: "SUBMITTED",
        text: payload.text,
        benefactor: { connect: { id: client.id } },
        user: { connect: { id: user.id } }
      })
      requestId = request.id
    }
    else { //Si l'utilisateur est le bénéficiaire, juste créer la requête
      const request = await createRequest({
        name: "",
        type,
        status: "SUBMITTED",
        text: payload.text,
        user: { connect: { id: user.id } }
      })
      requestId = request.id
    }
    userId = user.id
  }
  else { //Si l'utilisateur n'a pas encore de compte ou n'est pas connecté
    let newUser = await findUserByMail(payload.email)
    if (!newUser){
      newUser = await createUser({
        firstName: capitalize(payload.firstName),
        lastName: capitalize(payload.lastName),
        phone: payload.phone,
        email: payload.email,
        //isEmergencyContact:false,
        role: "INDIVIDUAL",
        status: "INACTIF",
        password,
        isEmergencyContact: false
      })
    }
    if (payload.clientLastName) {//Si l'utilisateur n'est pas le bénéficiaire
        let client = await findBenefactor(user.id, payload.clientFirstName, payload.clientLastName)
        if (!client) {
          client = await addBenefactor({
            firstName: capitalize(payload.clientFirstName),
            lastName: capitalize(payload.clientLastName),
            email: payload.clientEmail,
            phone: payload.clientPhone,
            type: "BENEFACTOR",
            beneficiaryOf: { connect: { id: newUser.id } }
          })
        }
        const request = await createRequest({
          name: "",
          type,
          status: "SUBMITTED",
          text: payload.text,
          benefactor: { connect: { id: client.id } },
          user: { connect: { id: newUser.id } }
        })
        requestId = request.id
      }
      else {//Si l'utilisateur est le bénéficiaire
        const request = await createRequest({
          name: "",
          type,
          status: "SUBMITTED",
          text: payload.text,
          user: { connect: { id: newUser.id } }
        })
        requestId = request.id
      }
      userId = newUser.id
  }
    const upload = await uploadAllFiles(docs)
    const dbAddedDocs = docs.map((item:{name:string, type:string, file:File})=>{return {name:item.name, type:item.type}})
    await addDocuments(dbAddedDocs, userId, requestId,type.toLowerCase())
}

export async function updateRequestFront(status: string, type: string, id: number, userId: string) {
  if (status === "SUBMITTED") {
    await updateUserStatus(userId, "ACTIF")
    await updateRequest(id, {
      status: "RECEIVED"
    })
  }
  if (status === "RECEIVED") {
    await updateRequest(id, {
      status: "FINISHED"
    })
  }
}

export async function getUserById(id: string) {
  const user = await findUserById(id)
  return user;
}

export async function getBeneficiariesByUser(id:string){
  const beneficiaries = await findBeneficiariesByUser(id)
  return beneficiaries
}

export async function getBeneficiaryById(id:string){
  const beneficiaries = await findBeneficiaryById(id)
  return beneficiaries
}

export async function getEmergencyContact(id: string) {
  const user = await findEmergencyContact(id)
  return user;
}

export async function getEmergencyContactById(id: string) {
  const user = await findEmergencyContactById(id)
  return user;
}

export async function getRequestById(id:number){
  return await findRequestById(id)
}

export async function getUsersByRequests(requests: any) {
  return await findUsersByRequests(requests)
}

export async function getRequestsByUser(user: any, page: number = 1, filter?:string) {
  const { requests, totalPages } = await findRequestsByUser(user, page, filter)
  return { requests, totalPages }
}

export async function getBeneficiaryByRequest(beneficiaryId:string){
  return await findBeneficiaryByRequest(beneficiaryId)
}

export async function getUserByRequest(userId:string){
  return await findUserByRequest(userId)
}

export async function getDocumentsByRequest(id:number){
  return await findDocumentsByRequest(id)
}

export async function listBackofficeUsers(page: number = 1) {
  const { users, totalPages } = await findBackofficeUsers(page)
  return { users, totalPages }
}

export async function listCustomers(page: number = 1, filter?:string) {
  const users = await findCustomers(page, filter)
  return users
}

export async function listRequests(page: number = 1, filter?:string) {
  const requests = await findRequests(page, filter)
  return requests
}

export async function getListClients() {
  const clients = await listClients()
  return clients
}

export async function getStatsFront() {
  const client = await nbClient()
  const quote = await nbQuotes()
  const submittedQuote = await nbSubmittedQuotes()
  const receivedQuote = await nbReceivedQuotes()
  const finishedQuote = await nbFinishedQuotes()
  const infos = await nbInfos()
  const submittedInfos = await nbSubmittedQuotes()
  const receivedInfos = await nbReceivedQuotes()
  const finishedInfos = await nbFinishedInfos()
  const statMap = new Map<string, number>()
  statMap.set("client", client)
  statMap.set("quote", quote)
  statMap.set("submittedQuote", submittedQuote)
  statMap.set("receivedQuote", receivedQuote)
  statMap.set("finishedQuote", finishedQuote)
  statMap.set("infos", infos)
  statMap.set("submittedInfos", submittedQuote)
  statMap.set("receivedInfos", receivedQuote)
  statMap.set("finishedInfos", finishedInfos)
  return statMap
}

export async function nbClientFront() {

  const totalCount = await nbClient()

  return totalCount
}
