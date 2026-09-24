// "use client"
// import { newSection, allSections, allContents, newContent, updateContent, updateSection, removeContent, removeSection } from "../ServicesBack/faq";

// export async function addSection(name:string){
//     return await newSection(name)
// }

// export async function editSection(id:number, name:string){
//     return await updateSection(id, name)
// }

// export async function deleteSection(id:number){
//     return await removeSection(id)
// }

// export async function addContent(sectionId:number, title:string, text:string){
//     console.log(text)
//     return await newContent(sectionId, title, text)
// }

// export async function editContent(id:number, sectionId:number, title:string, text:string){
//     return await updateContent(id, sectionId, title, text)
// }

// export async function deleteContent(id:number){
//     return await removeContent(id)
// }

// export async function getAllSections(){
//     return await allSections()
// }

// export async function getAllContents(id:number){
//     return await allContents(id)
// }