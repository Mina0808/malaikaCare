"use client"

export enum StatusQuote {
  CREATED= 'CREATED',
  SUBMITTED = 'SUBMITTED',
  AWAITING_CORRECTION = 'AWAITING_CORRECTION',
  RECEIVED = 'RECEIVED',
  FINISHED='FINISHED'
}

export enum TypeDocument {
  PDF = 'PDF',
  QUOTE = 'QUOTE',
  PHOTO = 'PHOTO',
  VIDEO = 'VIDEO',
  OTHER = 'OTHER',
}

export const getColorByUserStatus = (status:string)=>{
  if (status==="ACTIF") return 'green'
  if (status==="INACTIF") return 'gray'
}

export  const translateRole = (role:string)=> {
  if(role==='INDIVIDUAL') return 'Client'
  if(role==='ADMIN') return 'Admin'
};
export  const translateRequest = (request:string, status:string)=> {
  if(request==='QUOTE') {
    if (status==="SUBMITTED")
      return "Devis soumis"
    if (status==="RECEIVED")
      return "Devis validé"
    if (status==="FINISHED")
      return "Devis traité"
  }
  if(request==='INFORMATION'){
    if (status==="SUBMITTED")
      return "Demande de renseignement soumise"
    if (status==="FINISHED")
      return "Demande de renseignement traitée"
  }
};

export  const translateRequestType = (request:string)=> {
  if(request==='QUOTE') {
      return "Devis"
  }
  else{
      return "Demande de renseignement"
  }
};

export  const translateRequestStatus = (status:string)=> {
  
    if (status==="SUBMITTED")
      return "SOUMIS"
    if (status==="RECEIVED")
      return "VALIDÉ"
    if (status==="FINISHED")
      return "TERMINÉ"
    else
      return ""
};

export const capitalize = (word:string) =>{
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const getColorByRequestStatus = (status:string)=>{
  if (status==="SUBMITTED")
      return "blue"
    if (status==="RECEIVED")
      return "light-green"
    if (status==="FINISHED")
      return "green"
    else
      return "gray"
}

export const getButtonByRequestStatus = (status:string)=>{
  if (status==="SUBMITTED")
      return "Fermer la demande"
}

export const getButtonByUserStatus = (status:string)=>{
  if (status==="ACTIF")
      return "Désactiver l'utilisateur"
    if (status==="INACTIF")
      return "Activer l'utilisateur"
}

// export  const translations = {
//     fr: {
//       //Statut de colis
//       [StatusQuote.CREATED]: "Créé",
//       [StatusQuote.SUBMITTED]: "Demande soumise",
//       [StatusQuote.AWAITING_CORRECTION]: 'Correction requise',
//       [StatusQuote.RECEIVED]: 'Reçu',
//       [StatusQuote.FINISHED]: 'Traité',
//     },
//   };
  
//   export const getStatusTranslate = (statutConverted : string) => {
    
//     return translations['fr'][getStatusQuote(statutConverted)];
//   };
  
//   export const getStatusQuote = (status:string)=>{
//     if (status===StatusQuote.CREATED) return StatusQuote.CREATED
//     if (status===StatusQuote.SUBMITTED) return StatusQuote.SUBMITTED
//     if (status===StatusQuote.AWAITING_CORRECTION) return StatusQuote.AWAITING_CORRECTION
//     if (status===StatusQuote.RECEIVED) return StatusQuote.RECEIVED
//     else return StatusQuote.FINISHED
//   }

//   export const getColorByStatus = (statut:string)=>{
//     const status = getStatusQuote(statut)
//     if (status===StatusQuote.CREATED) return 'sky-blue'
//     if (status===StatusQuote.SUBMITTED) return 'dark-blue'
//     if (status===StatusQuote.AWAITING_CORRECTION) return 'yellow'
//     if (status===StatusQuote.RECEIVED) return 'light-green'
//     if (status===StatusQuote.FINISHED) return 'dark-green'
 // }

  // export  const nextStatus = {
  //     //Statut de colis
  //     [StatusQuote.CREATED]: '',
  //     [StatusQuote.SUBMITTED]: 'Valider la réception',
  //     [StatusQuote.AWAITING_CORRECTION]: '',
  //     [StatusQuote.RECEIVED]: 'Envoyer le devis',
  //     [StatusQuote.FINISHED]: '',
  //   };

    // export const getNextStatusQuote = (status:string)=>{
    //   if (status===StatusQuote.SUBMITTED) return StatusQuote.RECEIVED
    //   if (status===StatusQuote.RECEIVED) return StatusQuote.FINISHED
    //   else return StatusQuote.UNDELIVERABLE
    // }


    // export  const actionColor = (action:string)=> {
    //   if(action==='CREATED') return 'sky-blue'
    //   if(action==='SUBMITTED') return 'dark-blue'
    //   if(action==='AWAITING_CORRECTION') return 'yellow'
    //   if(action==='CORRECTED') return 'dark-blue'
    //   if(action==='RECEIVED') return 'light-green'
    //   if(action==='FINISHED') return 'dark-green'
    // };

    // export  const translateAction = (action:string)=> {
    //   if(action==='CREATED') return 'Nouvelle demande'
    //   if(action==='SUBMITTED') return 'Demande soumise'
    //   if(action==='AWAITING_CORRECTION') return 'Correction requise'
    //   if(action==='CORRECTED') return 'Correction effectuée'
    //   if(action==='RECEIVED') return 'Réception de la demande'
    //   if(action==='FINISHED') return 'Devis envoyé'
    //};


    // export const translateSettings = (choice:string)=>{
    //   if (choice==='PRODUCTS_TYPE') return "Catégorie de produits"
    //   if (choice==='EXPEDITION_MODE') return "Mode d'expédition"
    //   if (choice==='DELIVERY_INFORMATION') return "Informations de livraison"
    //   if (choice==='ACTIVITY') return "Domaine d'activité"
    //   if (choice==='CANCEL_REASON') return "Motif d'annulation"
    //   if (choice==='COUNTRY') return "Pays"
    // }

    // export const translateSettingsAdded = (choice:string)=>{
    //   if (choice==='PRODUCTS_TYPE') return "Catégorie de produits ajoutée"
    //   if (choice==='EXPEDITION_MODE') return "Mode d'expédition ajouté"
    //   if (choice==='DELIVERY_INFORMATION'||choice==='DELIVERY_MODE') return "Information de livraison ajoutée"
    //   if (choice==='ACTIVITY') return "Domaine d'activité ajouté"
    //   if (choice==='CANCEL_REASON') return "Motif d'annulation ajouté"
    //   if (choice==='COUNTRY') return "Pays ajouté"
    // }

    // export const translateSettingsUpdated = (choice:string)=>{
    //   if (choice==='PRODUCTS_TYPE') return "Catégorie de produits mise à jour"
    //   if (choice==='EXPEDITION_MODE') return "Mode d'expédition mis à jour"
    //   if (choice==='DELIVERY_INFORMATION'||choice==='DELIVERY_MODE') return "Information de livraison mise à jour"
    //   if (choice==='ACTIVITY') return "Domaine d'activité mis à jour"
    //   if (choice==='CANCEL_REASON') return "Motif d'annulation mis à jour"
    //   if (choice==='COUNTRY') return "Pays mis à jour"
    // }

    // export const translateSettingsDeleted = (choice:string)=>{
    //   if (choice==='PRODUCTS_TYPE') return "Catégorie de produits supprimée"
    //   if (choice==='EXPEDITION_MODE') return "Mode d'expédition supprimé"
    //   if (choice==='DELIVERY_INFORMATION'||choice==='DELIVERY_MODE') return "Information de livraison supprimée"
    //   if (choice==='ACTIVITY') return "Domaine d'activité supprimé"
    //   if (choice==='CANCEL_REASON') return "Motif d'annulation supprimé"
    //   if (choice==='COUNTRY') return "Pays supprimé"
    // }

    // export const translateSettingsFR = (choice:string)=>{
    //   if (choice==='PRODUCTS_TYPE') return "une catégorie de produits"
    //   if (choice==='EXPEDITION_MODE') return "un mode d'expédition"
    //   if (choice==='DELIVERY_INFORMATION') return "une information de livraison"
    //   if (choice==='ACTIVITY') return "un domaine d'activité"
    //   if (choice==='CANCEL_REASON') return "un motif d'annulation"
    //   if (choice==='COUNTRY') return "un pays"
    // }