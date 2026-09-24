import * as fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

/*async function nouveauClient(lastName:string, firstName:string, motDePasse:string, email:string, numeroTelephone:string, adresse:string, codePostal:string, ville:string, nomEntreprise:string="") {
    const numUser = await prisma.user.count() + 1
    let num = numUser+""
    while (num.length<4){
        num = "0" + num
    }
    let typeClient =""
    if (nomEntreprise==="") typeClient = "PR" 
    else typeClient = "EN"
    const numClient = typeClient+firstName.substring(0,2).toUpperCase()+lastName.substring(0,1).toUpperCase()+num
    const user = await prisma.user.create({
    data: {
            id:numClient,
            lastName: lastName,
            firstName: firstName,
            motDePasse: motDePasse,
            email: email,
            numeroTelephone: numeroTelephone||null,
            nomEntreprise: nomEntreprise||null,
            adresse: adresse,
            codePostal: codePostal,
            ville: ville,
        },
    })
    return user
}
    
async function adresseDeLivraisonParis(numClient:string){
    const client = await getUtilisateur(numClient)
    return "{Adresse d'inditekk}" + client?.firstName + " " + client?.nom +" inditekk, chez {XXX}"
}

async function nouvelleLivraison(modeExpedition:string, colisID:number, montantLivraison:Decimal, delai:number, paiementID:number){
    const liv = await prisma.livraison.create({
        data: {
                modeExpedition: modeExpedition,
                colisID:colisID,
                montantLivraison:montantLivraison,
                delaiPrevisionnel:delai,
                paiementLivraison:paiementID
            },
    })
    return liv.id
}

async function validerDemande(demande:Devis, choix:boolean, correction:string="") {
    let devis:Devis|null

    if (choix){
        devis = await setDevis(["statutDevis"], ["Validé"], demande.devisID)
    }
    else{
        devis = await setDevis(["statutDevis", "renvoi"], ["A corriger", correction], demande.devisID)
    }
    return devis
}

async function corrigerDemande(numCommande:string, description:string, fragile:boolean, typeProduits:string[], assurance:boolean, montantColis:number, numeroSuivi:string=""){
    const commande = await getCommande(numCommande)
    if (commande?.devisID && commande?.colisID){
        await setDevis(["statutDevis", "numCommande", "montantColis"], ["Corrigé", numCommande, montantColis], commande?.devisID)
        await setCommande(["numCommande", "numeroSuivi"], [numCommande, numeroSuivi], numCommande)
        await setColis(["numCommande", "description", "fragile", "typeProduits", "assurance"], [numCommande, description, fragile, typeProduits, assurance], commande.colisID)
        return true
    }
    return false
}

async function nouveauPaiement(){
    const paie = await prisma.paiement.create({
        data: {
                statut: "En attente",
                justificatifPaiement:Buffer.from("","utf-8")
            },
    })
    return paie.id
}


async function paiementLivraison(devis:Devis, justificatif:Buffer, modeLivraison:String){
    if (devis.livraisonID) {
        await setLivraison(["modeLivraison"], [modeLivraison], devis.livraisonID)
    const livraison = await getLivraison(devis.livraisonID)
    if (livraison?.paiementLivraison){
        await setPaiement(["statut", "justificatifPaiement"], ["Validé", justificatif], livraison.paiementLivraison)
    }
    return true;
    }
    return false
}

//Faire une signalisation
async function nouveauColis(numCommande:string, description:string, fragile:boolean, typeProduits:string[], clientId:string, assurance:boolean, montantColis:number, justificatif:Buffer, numeroSuivi:string=""){
    const colis = await prisma.colis.create({
        data: {
                commandeID: numCommande,
                fragile:fragile,
                typeProduits:typeProduits,
                statut:"En attente de réception",
                description:description,
                assurance:assurance

            },
        })
    const devis = await nouvelleSignalisation(numCommande, montantColis, clientId, justificatif)
    await nouvelleCommande(numCommande, devis.devisID, numeroSuivi)
}

async function nouvelleSignalisation(numeroCommande:string, montant:number, clientId:string, justificatif:Buffer) {
    const devis = await prisma.devis.create({
        data: {
                commandeID:numeroCommande,
                montantColis: montant,
                clientID:clientId,
                statutDevis:"En attente de validation"
            },
    })
    await nouvellePiece("confirmation-commande-"+clientId,"Confirmation de commande",justificatif,devis.devisID)
    return devis
}

async function nouvelleCommande(numCommande:string, devisID:number, numeroSuivi:string){
    const commande = await prisma.commande.create({
        data: {
                numeroCommande: numCommande,
                numeroSuivi:numeroSuivi,
                devisID:devisID,
                statut:"En attente de réception"
            },
    })
}

//Mettre à jour le statut

async function colisReçu(modeExpedition:string, colisID:number, commandeID:string, delai:number, poids:Decimal, montantLivraison:Decimal, suivi:string) {
    const paiement = await nouveauPaiement()
    const livraison = await nouvelleLivraison(modeExpedition, colisID, montantLivraison, delai, paiement)
    await setColis(["poids", "statut"], [poids, "Reçu"], colisID)
    await setCommande(["numeroSuivi", "statut"], [suivi, "Reçu"], commandeID)
}

async function colisExpedie(colisID:number) {
    const colis = await prisma.colis.findUnique({where:{id:colisID}})
    await setColis(["statut"], ["Expédié"], colisID)
    if (colis?.commandeID) await setCommande(["statut"], ["Expédié"], colis?.commandeID)
}

async function colisADakar(colisID:number, montantReel:Decimal, facture:Buffer) {
    const colis = await prisma.colis.findUnique({where:{id:colisID}})
    await setColis(["statut"], ["Expédié"], colisID)
    if (colis?.commandeID) await setCommande(["statut"], ["Expédié"], colis?.commandeID)
    if (colis?.livraisonID){
    const livraison = await getLivraison(colis?.livraisonID)
    if (livraison?.montantLivraison!=montantReel && livraison?.devisID){
        await setDevis(["montantColis"], [montantReel], livraison.devisID)
    }
    //Ajouter la facture au paiement pour les entreprise
    if (livraison?.paiementLivraison) await setPaiement(["statut","justificatifPaiement"], ["A régler",facture], livraison.paiementLivraison)
    
    } 
}

async function colisLivre(colisID:number) {
    const colis = await prisma.colis.findUnique({where:{id:colisID}})
    await setColis(["statut"], ["Expédié"], colisID)
    if (colis?.commandeID) await setCommande(["statut"], ["Expédié"], colis?.commandeID)
} 
    */

//Un colis par signalisation
/*async function recapitulatif(devisID:number){
    const devis = await getDevis(devisID)
    if (devis?.livraisonID && devis?.clientID){
        const livraison = await getLivraison(devis?.livraisonID)
        const client = await getUtilisateur(devis?.clientID)
        if (livraison?.colisID && livraison?.paiementLivraison){
            const colis = await getColis(livraison?.colisID)
        if (colis){
            const commande = await getCommande(colis.commandeID)
            const paiementLivraison = await getPaiement(livraison?.paiementLivraison)
            let assurance = "Oui"
            let fragile = "Oui"
            if (!devis.assurance) assurance="Oui"
            if (!colis.fragile) fragile="Oui"
            const docs = await prisma.documents.findMany({where: {devisID:devisID}})
            let documents = ""
            let n = docs.length
            docs.forEach((doc)=>{
                if (docs.indexOf(doc)<n-1) documents+=doc.nom + ", "
                else documents+=doc.nom
            })

            console.log("Numéro de colis " + commande?.numeroCommande + "\b Type de produits " + colis.typeProduits 
                +"\nNuméro de suivi " + livraison?.numeroSuivi + "\b Statut du colis " + livraison?.statut
                +"\nMontant du colis " + devis.montantColis + "\b Statut du paiement " + paiementLivraison?.statut
                +"\nPièces justificatives " + documents + "\b Mode d'expedition " + livraison?.modeExpedition
                +"\nAssurance " + assurance + "\b Montant de la livraison " + livraison.montantLivraison + "€"
                +"\nFragile " + fragile + "\b Délai de livraison " + livraison.delaiPrevisionnel + " jours"
                +"\nPoids " + colis.poids + " kg\b Mode de livraison " + livraison?.modeLivraison    
                +"\nTaille " + colis.taille
            )
        }
        } 
    }
    
}*/

/*
async function nouvellePiece(nom:string, type:string, fichier:Buffer, devisID:number){
    await prisma.documents.create({
        data: {
            nom:nom,
            type:type,
            devisID:devisID,
            fichier:fichier,
        }
    })
}


//Setters
async function setColis(params: string[], vals: any[], colisID: number) {
    if (params.length !== vals.length) {
        throw new Error("Les tableaux 'params' et 'vals' doivent avoir la même longueur.");
    }

    // Construire l'objet de données pour la mise à jour
    const updateData: Record<string, any> = {};

    for (let i = 0; i < params.length; i++) {
        updateData[params[i]] = vals[i];
    }

    // Vérifier si l'objet updateData n'est pas vide
    if (Object.keys(updateData).length > 0) {
        // Effectuer la mise à jour
        let colis = await prisma.colis.update({
            where: {
                id: colisID,
            },
            data: updateData,
        });
        return colis
    }
    return null
}

async function setCommande(params: string[], vals: any[], numCommande: string) {
    if (params.length !== vals.length) {
        throw new Error("Les tableaux 'params' et 'vals' doivent avoir la même longueur.");
    }

    // Construire l'objet de données pour la mise à jour
    const updateData: Record<string, any> = {};

    for (let i = 0; i < params.length; i++) {
        updateData[params[i]] = vals[i];
    }

    // Vérifier si l'objet updateData n'est pas vide
    if (Object.keys(updateData).length > 0) {
        // Effectuer la mise à jour
        let commande = await prisma.commande.update({
            where: {
                numeroCommande: numCommande,
            },
            data: updateData,
        });
        return commande
    }
    return null
}

async function setDevis(params: string[], vals: any[], devisID: number) {
    if (params.length !== vals.length) {
        throw new Error("Les tableaux 'params' et 'vals' doivent avoir la même longueur.");
    }

    // Construire l'objet de données pour la mise à jour
    const updateData: Record<string, any> = {};

    for (let i = 0; i < params.length; i++) {
        updateData[params[i]] = vals[i];
    }

    // Vérifier si l'objet updateData n'est pas vide
    if (Object.keys(updateData).length > 0) {
        // Effectuer la mise à jour
        let devis = await prisma.devis.update({
            where: {
                devisID: devisID,
            },
            data: updateData,
        });
        return devis
    }
    return null
}

async function setLivraison(params: string[], vals: any[], livraisonID: number) {
    if (params.length !== vals.length) {
        throw new Error("Les tableaux 'params' et 'vals' doivent avoir la même longueur.");
    }

    // Construire l'objet de données pour la mise à jour
    const updateData: Record<string, any> = {};

    for (let i = 0; i < params.length; i++) {
        updateData[params[i]] = vals[i];
    }
    //console.log("update data: " + updateData)
    // Vérifier si l'objet updateData n'est pas vide
    if (Object.keys(updateData).length > 0) {
        // Effectuer la mise à jour
        let livraison = await prisma.livraison.update({
            where: {
                id: livraisonID,
            },
            data: updateData,
        });
        return livraison
    }
    return null
}


async function setPaiement(params: string[], vals: any[], paiementID: number) {
    if (params.length !== vals.length) {
        throw new Error("Les tableaux 'params' et 'vals' doivent avoir la même longueur.");
    }

    // Construire l'objet de données pour la mise à jour
    const updateData: Record<string, any> = {};

    for (let i = 0; i < params.length; i++) {
        updateData[params[i]] = vals[i];
    }

    // Vérifier si l'objet updateData n'est pas vide
    if (Object.keys(updateData).length > 0) {
        // Effectuer la mise à jour
        let paiement = await prisma.paiement.update({
            where: {
                id: paiementID,
            },
            data: updateData,
        });
        return paiement
    }
    return null
}

async function setUtilisateur(params: string[], vals: any[], clientID: string) {
    if (params.length !== vals.length) {
        throw new Error("Les tableaux 'params' et 'vals' doivent avoir la même longueur.");
    }

    // Construire l'objet de données pour la mise à jour
    const updateData: Record<string, any> = {};

    for (let i = 0; i < params.length; i++) {
        updateData[params[i]] = vals[i];
    }

    // Vérifier si l'objet updateData n'est pas vide
    if (Object.keys(updateData).length > 0) {
        // Effectuer la mise à jour
        let user = await prisma.user.update({
            where: {
                id: clientID,
            },
            data: updateData,
        });
        return user
    }
    return null
}

//Getters

async function getColis(colisID:number){
    return await prisma.colis.findUnique({where:{id:colisID}})
}

async function getCommande(numCommande:string){
    return await prisma.commande.findUnique({where:{numeroCommande:numCommande}})
}

async function getDevis(devisID:number){
    return await prisma.devis.findUnique({where:{devisID:devisID}})
}

async function getLivraison(livraisonID:number){
    return await prisma.livraison.findUnique({where:{id:livraisonID}})
}

async function getPaiement(paiementID:number){
    return await prisma.paiement.findUnique({where:{id:paiementID}})
}

async function getUtilisateur(userID:string){
    return await prisma.user.findUnique({where:{id:userID}})
}
*/

async function main() {
    //Créer un compte    
    /*const user1 = await nouveauClient("Sylla","Aminata","asylla08","aminata.sylla@inclusiveit.sn","0654123842","67 rue Oberkampf","91100","Corbeil-Essonnes")
    const user2 = await nouveauClient("Sow","Fatou","fsow65","fatou.sow@gmail.com","0745228994","18 rue scheurer kestner","92600","Asnières-sur-Seine")
    const user3 = await nouveauClient("Fall","Alioune","afall325","alioune.fall@inditekk.sn","0717398614","304 boulevard Haussmann","75015","Paris","inditekk")
    const user4 = await nouveauClient("Diallo","Pierre","pdiallo24","pierre.diallo@yahoo.com","0614338674","1 rue de la Pompe","75016","Paris")
    const users = await prisma.user.findMany()

    //Faire une signalisation
    // Créer un Buffer à partir d'une chaîne de caractères
    const buffer = Buffer.from("\b\b\b\b4 Allée de la Combe / Lissieu 69380 / France\n\b\b\b\bcontactpro@mool.fr\n\b\b\b\bmool.fr\n\nFACTURE\bLES DÉTAILS D'EXPÉDITION\bDÉTAILS DE LA FACTURATION\nCOMMANDE NO\bAminata Sylla\bAminata Sylla\n#505524\bamnasylla@gmail.com\bamnasylla@gmail.com\n\b\b5 Rue Oberkampf\b5 Rue Oberkampf\nDATE DE COMMANDE\bN°5\bN°5\n2024-09-05 17:42:05\b91100 Corbeil-Essonnes\b91100 Corbeil-Essonnes\n\bFrance\bFrance\n\b0655403971\b0655403971\nTITRE\bSKU\bQUANTITÉ\bIMPÔT\bPRIX UNITAIRE\bTOTAL\nNouvelle Collection : Oka pour Flux Moyen\bD11\b1\b5.5%\b€ 18.00(X)\b€ 9.00\nL/40\b\b\b€ 9.00\nSana pour Flux Moyen\bD14\b1\b5.5%\b€ 18.00(X)\b€ 9.00\nL/40\b\b\b€ 9.00\n\b\b\b SOUS TOTAL : \t€ 36.00\n\b\b\b REMISE : \t- € 18.00\n\b\b\b LIVRAISON : \t€ 6.99\n\b\b\b IMPÔT : \t€ 0.94\n\b\b\b TOTAL : \t€ 24.99\nTermes & Notes\nMerci pour votre précieuse entreprise. Nous apprécions grandement votre conance et apprécions sincèrement votre fidélité à notre entreprise.", 'utf-8');

    // Écrire le Buffer dans un fichier
    fs.writeFile('Confirmation de commande.pdf', buffer, (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture du fichier:', err);
        }
    });

    let signalisation1 = await nouvelleSignalisation(user1.id, false,375, true, ["Electroménagers"] , "157-242-424-55", buffer)
    let signalisation2 = await nouvelleSignalisation(user4.id, true, 30, false, ["Livres"], "482-341-607-93", buffer)

    validerDemande(signalisation1, false, "L'assurance est obligatoire dès 300€")
    validerDemande(signalisation2, true)

    const exped4 = Buffer.from("Commande #505524\n"+
    "Le statut de votre expédition a été mis à jour\n" + 
    "Les articles suivants ont été mis à jour avec de nouveaux détails d'expédition.\n" +
    "Numéro de suivi: S33100097674\n\n" +
    "Articles dans cet envoi\n" +
    "Nouvelle Collection : Oka pour Flux Moyen × 1\nL/40\n\n" +
    "Sana pour Flux Moyen × 1\nL/40", 'utf-8');

    // Écrire le Buffer dans un fichier
    fs.writeFile("Confirmation d'expedition.pdf", exped4, (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture du fichier:', err);
        }
    });

    const facture = Buffer.from("Commande #505524\n\n\n"+
        "Montant à Payer\n\n" + 
        "Transfert à Dakar\t\t€ 14.99\n" +
        "Assurance\b\b€ 6.00\n" +
        "Livraison\b\b€ 3.00\n\n" +
        "Total\b\b€ 23.99", 'utf-8');
    
        // Écrire le Buffer dans un fichier
        fs.writeFile("Facture.pdf", facture, (err) => {
            if (err) {
                console.error('Erreur lors de l\'écriture du fichier:', err);
            }
        });
    await nouvellePiece("Confirmation d'expedition.pdf", "Confirmation d'expédition", exped4, signalisation2.devisID)
    const livraison2 = await getLivraison(signalisation2.livraisonID)
    console.log(livraison2?.colisID)
    if (livraison2?.colisID) {
        console.log("OK")
        const colis2 = await getColis(livraison2?.colisID)
        if (colis2?.id) { 
            console.log("OK2")
            await colisReçu (signalisation2.livraisonID, "Voie aérienne", colis2?.id, 2, "Romans policiers", new Decimal(3.1), "Poche", new Decimal(14), "XXXXXXXXXXXXXX")
            //console.log("col" + colis2)
            await colisExpedie(colis2.id)
            const montant:Decimal = new Decimal(17.6)
            await colisADakar(colis2.id, montant, facture)
            paiementLivraison(signalisation2,facture,"A domicile")
            await recapitulatif(signalisation2.devisID)
        }
    }*/

  }
  
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })