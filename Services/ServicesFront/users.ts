import { addDocuments } from "../ServicesBack/documents";
import { findBackofficeUsers, findDocumentsByRequest, findRequestById, findUserByMail, emailValid, createRequest, listClients, findUserById, findRequestsByUser, findRequests, findUsersByRequests, updateRequest, nbClient, nbFinishedInfos, nbFinishedQuotes, nbInfos, nbQuotes, nbSubmittedQuotes, findPassword, updatePwd, updateProfessional, updateClient, createProfessional, createClient, findClientByRequest, listClientsByProfessionals, findProfessionals } from "../ServicesBack/users"
import bcrypt from "bcryptjs";
import { uploadAllFiles } from "./documents";
import { capitalize } from "./keywords";

export async function updateUserFront(id: string, payload: any, role: string) {
  if (role == "INDIVIDUAL")
    return await updateClient(id, {
      firstName: capitalize(payload.firstName),
      lastName: capitalize(payload.lastName),
      phone: payload.phone,
      contactFirstName: payload.contactFirstName,
      contactLastName: payload.contactLastName,
      contactEmail: payload.contactEmail,
      contactPhone: payload.contactPhone,
      address: payload.address,
      city: capitalize(payload.city),
    })
  return await updateProfessional(id, {
    firstName: capitalize(payload.firstName),
    lastName: capitalize(payload.lastName),
    phone: payload.phone,
  })
}

export async function getPassword(id: string, role: string) {
  return await findPassword(id, role)
}

export async function checkPassword(oldPwd: string, newPwd: string) {
  return await bcrypt.compare(newPwd, oldPwd);
}

export async function updatePassword(id: string, pwd: string, role: string) {
  const password = await bcrypt.hash(pwd, 10)
  return await updatePwd(id, password, role)
}

export async function createUserFront(payload: any, role: string) {
  const pwd = '123456789'
  const password = await bcrypt.hash(pwd, 10)
  if (role == "INDIVIDUAL")
    return await createClient({
      firstName: capitalize(payload.firstName),
      lastName: capitalize(payload.lastName),
      phone: payload.phone,
      email: payload.email,
      address: payload.address,
      city: capitalize(payload.city),
      gender: payload.gender,
      birthday: payload.birthday,
      autonomy: payload.autonomy,
      role,
      status: "ACTIF",
      password,
    })
  return await createProfessional({
    firstName: capitalize(payload.firstName),
    lastName: capitalize(payload.lastName),
    phone: payload.phone,
    email: payload.email,
    role,
    status: "ACTIF",
    password,
  })
}

export async function emailValidFront(email: string, role: string) {
  return await emailValid(email, role)
}

export async function updateUserStatus(id: string, status: string, role: string) {
  if (role == "INDIVIDUAL")
    return await updateClient(id, { status })
  return await updateProfessional(id, { status })
}

export async function newRequest(payload: any, type: string, user?: any, docs?: any) {
  console.log("Payload: ", payload)
  const pwd = '123456789'
  const password = await bcrypt.hash(pwd, 10)
  let requestId = -1
  let userId = ""
  const newClient = await createClient({
    firstName: capitalize(payload.clientFirstName),
    lastName: capitalize(payload.clientLastName),
    email: payload.clientEmail,
    phone: payload.clientPhone,
    gender: payload.gender,
    birthday: payload.birthday,
    autonomy: payload.autonomy,
    status: "INACTIF",
    role: "INDIVIDUAL",
  })
  if (payload.clientLastName) {//Si l'utilisateur n'est pas le bénéficiaire
    const client = await createClient({
      firstName: capitalize(payload.clientFirstName),
      lastName: capitalize(payload.clientLastName),
      email: payload.clientEmail,
      phone: payload.clientPhone,
      gender: payload.gender,
      birthday: payload.birthday,
      autonomy: payload.autonomy,
      status: "INACTIF",
      role: "INDIVIDUAL",
    })
    const request = await createRequest({
      name: "",
      type,
      status: "SUBMITTED",
      text: payload.text,
      contactFirstName: capitalize(payload.clientFirstName),
      contactLastName: capitalize(payload.clientLastName),
      contactEmail: payload.clientEmail,
      contactPhone: payload.clientPhone,
      client: { connect: { id: client.id } }
    })
    requestId = request.id
    userId = client.id
  }
  else {//Si l'utilisateur est le bénéficiaire
    const client = await createClient({
      firstName: capitalize(payload.firstName),
      lastName: capitalize(payload.lastName),
      email: payload.email,
      phone: payload.phone,
      gender: payload.gender,
      birthday: payload.birthday,
      autonomy: payload.autonomy,
      status: "INACTIF",
      role: "INDIVIDUAL",
    })
    const request = await createRequest({
      name: "",
      type,
      status: "SUBMITTED",
      text: payload.text,
      contactFirstName: capitalize(payload.firstName),
      contactLastName: capitalize(payload.lastName),
      contactEmail: payload.email,
      contactPhone: payload.phone,
      client: { connect: { id: client.id } }
    })
    requestId = request.id
    userId = client.id
  }
  const upload = await uploadAllFiles(docs)
  const dbAddedDocs = docs.map((item: { name: string, type: string, file: File }) => { return { name: item.name, type: item.type } })
  await addDocuments(dbAddedDocs, userId, requestId, type.toLowerCase())
}

export async function updateRequestFront(status: string, id: number, clientId?: string) {
  if (status === "RECEIVED") {
    if (clientId) {
      await updateClient(clientId, {
        status: "ACTIF"
      })
    }
    await updateRequest(id, {
      status: "FINISHED"
    })
  }
}

export async function getUserById(id: string, role: string) {
  const user = await findUserById(id, role)
  return user;
}

export async function getRequestById(id: number) {
  return await findRequestById(id)
}

export async function getUsersByRequests(requests: any) {
  return await findUsersByRequests(requests)
}

export async function getRequestsByUser(user: any, page: number = 1, filter?: string) {
  const { requests, totalPages } = await findRequestsByUser(user, page, filter)
  return { requests, totalPages }
}

export async function getUserByRequest(userId: string) {
  return await findClientByRequest(userId)
}

export async function getDocumentsByRequest(id: number) {
  return await findDocumentsByRequest(id)
}

export async function listBackofficeUsers(page: number = 1) {
  const { users, totalPages } = await findBackofficeUsers(page)
  return { users, totalPages }
}

export async function getProfessionals(page: number = 1, filter?: string) {
  const { professionals, totalPages } = await findProfessionals(page, filter)
  return { professionals, totalPages }
}

export async function getClients(page: number = 1, filter?: string) {
  const users = await listClients(page, filter)
  return users
}

export async function getClientsByProfessionals(id: string, page: number = 1, filter?: string) {
  const users = await listClientsByProfessionals(id, page, filter)
  return users
}

export async function listRequests(page: number = 1, filter?: string) {
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
  const finishedQuote = await nbFinishedQuotes()
  const infos = await nbInfos()
  const submittedInfos = await nbSubmittedQuotes()
  const finishedInfos = await nbFinishedInfos()
  const statMap = new Map<string, number>()
  statMap.set("client", client)
  statMap.set("quote", quote)
  statMap.set("submittedQuote", submittedQuote)
  statMap.set("finishedQuote", finishedQuote)
  statMap.set("infos", infos)
  statMap.set("submittedInfos", submittedInfos)
  statMap.set("finishedInfos", finishedInfos)
  return statMap
}

export async function nbClientFront() {

  const totalCount = await nbClient()

  return totalCount
}
