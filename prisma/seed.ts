import { PrismaClient } from '@prisma/client';
import * as countries from 'i18n-iso-countries'
import fr from 'i18n-iso-countries/langs/fr.json';
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient();

async function main() {
  await prisma.referentiel.deleteMany({})
  await prisma.documents.deleteMany({})
  await prisma.request.deleteMany({})
  await prisma.user.deleteMany({})
  const password = await bcrypt.hash('password', 10);
  const staffUser = await prisma.user.create({
    data: {
      firstName: 'MALAIKA',
      lastName: 'ADMIN',
      email: 'admin@malaika-cs.com',
      phone:'+221782567070',
      country:'Senegal',
      city:'Dakar',
      isEmergencyContact:true,
      address:'',
      password,
      role: 'ADMIN',
      status:'ACTIF',
    },
  });
  console.log(`Created admin user with email: ${staffUser.email}`);

  const options: { name: string; category: string; subCategory?: string; }[] = [
    { name: 'Soins infirmiers', category : 'Soins médicaux'},
    { name: 'Accompagnement hospitalier', category : 'Soins médicaux'},
    { name: 'Garde malade & Nursing', category : 'Soins médicaux'},
    { name: 'Médecins à domicile', category : 'Soins médicaux'},
    { name: 'Ménage & repassage', category : 'Services à la personne', subCategory: "Entretien & Logistique"},
    { name: 'Jardinage', category : 'Services à la personne', subCategory: "Entretien & Logistique"},
    { name: 'Livraison course & repas', category : 'Services à la personne', subCategory: "Entretien & Logistique"},
    { name: 'Chauffeur personnel', category : 'Services à la personne', subCategory: "Entretien & Logistique"},
    { name: 'Transport (véhicule inclus)', category : 'Services à la personne', subCategory: "Entretien & Logistique"},
    { name: 'Soins esthétiques', category : 'Services à la personne', subCategory: "Bien-être & Accompagnement"},
    { name: 'Massages & relaxation', category : 'Services à la personne', subCategory: "Bien-être & Accompagnement"},
    { name: 'Dame de compagnie', category : 'Services à la personne', subCategory: "Bien-être & Accompagnement"},
    { name: "Garde d'animaux", category : 'Services à la personne', subCategory: "Bien-être & Accompagnement"},
    { name: 'Accompagnement personnes agées', category : 'Services à la personne', subCategory: "Bien-être & Accompagnement"},
    { name: "Garde d'enfants", category : 'Services à la personne', subCategory: "Famille & Administratif"},
    { name: 'Garde baptême', category : 'Services à la personne', subCategory: "Famille & Administratif"},
    { name: 'Cours à domicile', category : 'Services à la personne', subCategory: "Famille & Administratif"},
    { name: 'Démarches administratives', category : 'Services à la personne', subCategory: "Famille & Administratif"},
    { name: 'Conseil juridique', category : 'Services à la personne', subCategory: "Famille & Administratif"},
    { name: 'Coordination des soins', category : 'Coordination des soins'},
 
  ];

  options.forEach( async (item) => {
    await prisma.referentiel.create({
      data: {
        name: item.name,
        category: item.category,
        subCategory: item.subCategory,
      },
    });
  })

  const country: { value: string; label: string; type: string; }[] = []
  countries.registerLocale(fr);
  const countryList = countries.getNames('fr')
  
  const selectedCtry = ["GM", "SN", "FR", "CI"]
  Object.entries(countryList).filter( ([code,name]) => selectedCtry.includes(code)).map(([code,name])=>{
    console.log({value:code, label:name, type:'COUNTRY'})  
     country.push({value:code, label:name, type:'COUNTRY'})
  })
  await prisma.referentiel.createMany({
    data: country.map((item) => ({
      name:item.label,
      category: item.type,
      subCategory: item.value,
    })),
    skipDuplicates: true,
  });
}


main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
