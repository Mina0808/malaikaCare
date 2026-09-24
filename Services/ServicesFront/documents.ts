"use client"
import { uploadFile } from '../../lib/upload';
import { addDocuments, deleteDocuments, getDocumentsByPage } from '../ServicesBack/documents';

export const addSlide = async (newSlides:any[], userId:string, requestId:number)=>{
    console.log("slide")
    const upload = await uploadAllFiles(newSlides)
    const files:any[]=[]
    newSlides.map((item)=>{
        const name = item.name
        const type = item.type
        files.push({name,type})
    })
    console.log(newSlides[0])
    return await addDocuments(files, userId, requestId, "home")
}

export const deleteSlide = async (oldSlides:any[])=>{
    return await deleteDocuments(oldSlides,"home")
}

export const updateSlides = async (deletedSlides:any[], addedSlides:any[], userId:string, requestId:number)=>{
    console.log(addedSlides)
    const upload = await uploadAllFiles(addedSlides)
    const dbAddedSlides = addedSlides.map((item)=>{return {name:item.name, type:item.type}})
    await addDocuments(dbAddedSlides,userId, requestId, "home")
    await deleteDocuments(deletedSlides,"home")
}

export const getDocumentsByPageFront = async (targetPage?:string)=>{
    return await getDocumentsByPage(targetPage)
}

export const uploadAllFiles = async (piecesJustificatives : {name:string, type:string, file:File}[]) => {
    try {
        const uploadedFileNames = await Promise.all(
        piecesJustificatives.map((document : {name:string, type:string, file:File}) => {

            console.log("doc : ", document.type)
            if(document?.file && document?.file !== undefined) {
             uploadFile(document.file)
                .then(response => {
                    console.log(response); 
                    console.log(document?.file?.name)
                })
                .catch(error => {
                    console.error(error); 
                    throw error; 
                })
                return { 
                    ...document,
                    "nom" : document?.file?.name,
                    "type" : document?.type,
                    "file": undefined
                };
                }
                else {
                    return document
                }
            }
         )
        ); 
        return uploadedFileNames;
    } catch (error) {
        console.error('Erreur lors de l\'upload des fichiers:', error);
    }
}

export const uploadAFile = (document: {file:File,extension:string,type:string,name:string}) => {
    if(document?.file && document?.file !== undefined) {
        console.log("inside", document.file)
        uploadFile(document.file)
           .then(response => {
               console.log(response); 
               console.log(document?.file?.name)
           })
           .catch(error => {
               console.error(error); 
               throw error; 
           })
           return { 
               ...document,
               "nom" : document?.file?.name ? document?.file?.name : document?.name,
               "type" : document?.type,
               "file": undefined
           };
           }
       }
    