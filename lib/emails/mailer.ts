"use server"
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import path from "path";
import { Resend } from 'resend';

const logoPath = path.resolve("images/logo malaika.jpg");
const travelPath = path.resolve("images/Sans titre2.jpg");

const OAuth2 = google.auth.OAuth2;

// Création d'un client OAuth2
const oauth2Client = new OAuth2(
  process.env.GMAIL_CLIENT_ID, // Client ID de la Google Cloud Console
  process.env.GMAIL_CLIENT_SECRET, // Client Secret de la Google Cloud Console
  "https://developers.google.com/oauthplayground" // Redirection URI (exemple avec OAuth Playground)
);

// Paramétrer le refresh token obtenu depuis l'OAuth Playground
oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

// Fonction pour envoyer l'email
export const sendEmail = async (mail: string, subject: string, text: string, docs?: any) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const attachments = await Promise.all(
    docs.map(async (file:{name:string, type:string, file:File}) => {
      const buffer = Buffer.from(await file.file.arrayBuffer());

      return {
        filename: file.name,
        content: buffer.toString('base64'),
      };
    })
  );
  console.log("sending")

  return resend.emails.send({
    from: "MyTest <onboarding@resend.dev>",
    to: ['minabp00@gmail.com'],
    replyTo: 'minabp00@gmail.com',
    subject: subject,
    text: `${text}`,
    attachments:attachments
  });
  // const response = await fetch('/api/send', {
  //   method:'POST',
  //   headers:{'Content-Type':'application/json'},
  //   body: JSON.stringify({
  //     name:name,
  //     email:mail,
  //     message:text,
  //   })
  // })
  // if(response.ok){
  //   console.log("sent")
  //   alert("Message envoyé!")
  // } else{
  //   alert("Une erreur est survenue.")
  // }
  // const name = `${to.lastName} ${to.firstName}`;
  // try {
  //   const accessToken = await oauth2Client.getAccessToken();

  //   // Configurer le transporteur Nodemailer avec OAuth2
  //   const transporter = nodemailer.createTransport({
  //     host: 'smtp.gmail.com',
  //     port: 465,
  //     secure: true,
  //     auth: {
  //       type: 'OAuth2',
  //       user: process.env.GMAIL_EMAIL, // Adresse Gmail
  //       clientId: process.env.GMAIL_CLIENT_ID,
  //       clientSecret: process.env.GMAIL_CLIENT_SECRET,
  //       refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  //       accessToken: accessToken.token, // Token d'accès pour l'authentification
  //     },
  //   } as nodemailer.TransportOptions);

  //   // Paramètres de l'email
  //   if (verificationToken){
  //     const mailOptions = {
  //     from: to.email, 
  //     to:`${process.env.GMAIL_EMAIL}`, 
  //     subject : subject, 
  //     verificationToken, 
  //     html: html,
  //     attachments: [
  //       {
  //         filename: "logo malaika.jpg",
  //         path: logoPath, // Chemin de l'image locale
  //         cid: "logoImage", // Content ID utilisé dans l'email
  //       },
  //     ],
  //   };

  //   // Envoyer l'email
  //   const result = await transporter.sendMail(mailOptions);
  //   console.log("Email envoyé :", result);
  // }
  // else{
  //   const mailOptions = {
  //     from: to.email, 
  //     to:`${process.env.GMAIL_EMAIL}`, 
  //     subject : subject,
  //     html: html,
  //     attachments: [
  //       {
  //         filename: "logo malaika.jpg",
  //         path: logoPath, // Chemin de l'image locale
  //         cid: "logoImage", // Content ID utilisé dans l'email
  //       },
  //     ],
  //   };

  //   // Envoyer l'email
  //   const result = await transporter.sendMail(mailOptions);
  //   console.log("Email envoyé :", result);
  // }
  // } catch (error) {
  //   console.error("Erreur lors de l'envoi de l'email :", error);
  // }
};

// export const sendEmailRegister = async (to: any, verificationToken: any) => {
//   const name = `${to.lastName} ${to.firstName}`;
//   sendEmail(to, 'Bienvenue chez Inditekk!!', `
//     <div>
//     <img
//       src="cid:logoImage"
//       alt="logo"
//     />
//     <img
//       src="cid:travelImage"
//       alt="travel"
//     />
//     </div>
//     <h3>Bonjour ${name},</h3>
//     <p>Merci d'avoir rejoint Inditekk!. Vous pourrez bientôt envoyer tous vos colis de Paris vers Dakar! Il ne reste plus qu'une seule étape!.<br />
//     Pour activer votre compte, cliquez sur le lien ci-dessous</p>
//     <a href="${process.env.BASE_URL}/auth/verify/${verificationToken.token}"><button style="background-color:DodgerBlue; border-radius: 8px; padding: 5px; border: 2px solid DodgerBlue; ">Confirmer mon compte</button></a>
//     <p>Cordialement</p>`, verificationToken)
// };

export const sendEmailQuote = async (to: any, docs: any) => {
  const contactMail = "contact@malaika-cs.com"
  const name = `${to.lastName} ${to.firstName}`;
  const subject = `Demande de devis  - [${name}]`
  let message = ""
  if (to.clientLastName) {
    message = `${to.text}
    
    contact:
    ${name}
    ${to.email}
    ${to.phone}
    
    bénéficiaire de la demande:
    ${to.clientLastName} ${to.clientFirstName}
    ${to.clientEmail}
    ${to.clientPhone}`
  } else {
    message = `${to.text}
    
    contact:
    ${name}
    ${to.email}
    ${to.phone}`
  }
  await sendEmail(`${to.email}`, `${subject}`, `${message}`, docs)
  await sendEmail(`${to.email}`, `${subject}`, `Bonjour ${name},
Votre demande de devis a bien été prise en compte. 
Nous reviendrons très vite vers vous pour répondre à votre demande.

Cordialement,
Malaika Care
${contactMail}`)
};

export const sendEmailContact = async (to: any, docs:any) => {
  const contactMail = "contact@malaika-cs.com"
  const name = `${to.lastName} - ${to.firstName}`;
  const subject = `Demande de renseignement  - [${name}]`
  let message = ""
  message = `${to.text}
    
    contact:
    ${name}
    ${to.email}
    ${to.phone}`
  await sendEmail(`${to.email}`, `${subject}`, `${message}`, docs)
  await sendEmail(`${to.email}`, `${subject}`, `Bonjour ${name},
Votre demande de renseignement a bien été prise en compte. 
Nous reviendrons très vite vers vous pour répondre à votre demande.

Cordialement,
Malaika Care
${contactMail}`)
};

export const sendEmailUserReactivated = async (lastName: string, firstName: string, email: string) => {
  const contactMail = "contact@malaika-cs.com"
  const name = `${lastName} - ${firstName}`;
  const subject = "Compte activé"
  const message = `Bonjour ${name},
Votre compte utilisateur a été activé. Vous pouvez de nouveau vous connecter en utilisant vos identifiants.
Pour tout problème n'hésitez pas à nous écrire à ${contactMail}

Cordialement,
Malaika Care
${contactMail}
`
  await sendEmail(`${email}`, `${subject}`, `${message}`)
};

export const sendEmailUserDesactivated = async (lastName: string, firstName: string, email: string) => {
  const contactMail = "contact@malaika-cs.com"
  const name = `${lastName} - ${firstName}`;
  const subject = "Compte désactivé"
  const message = `Bonjour ${name},
Votre compte utilisateur a été désactivé. Vous ne pouvez plus vous connecter.
Pour toute réclamation, n'hésitez pas à nous écrire à ${contactMail}

Cordialement,
Malaika Care
${contactMail}
`
  await sendEmail(`${email}`, `${subject}`, `${message}`)
};

export const sendEmailQuoteValidated = async (lastName: string, firstName: string, email: string) => {
  const contactMail = "contact@malaika-cs.com"
  const name = `${lastName} - ${firstName}`;
  const subject = "Devis validé"
  const message = `Bonjour ${name},
Votre demande de devis a bien été validée. Vous pouvez désormais vous connecter avec les identifiants suivants:
id: mail
mot de passe temporaire: 123456789

Cordialement,
Malaika Care
${contactMail}`
  await sendEmail(`${email}`, `${subject}`, `${message}`)
};
// Fonction pour envoyer l'email
// export const sendEmailReset = async (to: any, passwordResetToken: any, ) => {
//   const name = `${to.lastName} ${to.firstName}`;
//   sendEmail(to, 'Réinitialisation du mot de passe', `
//     <div>
//     <img
//       src="cid:logoImage"
//       alt="logo"
//     />
//     <img
//       src="cid:travelImage"
//       alt="travel"
//     />
//     </div>
//     <h3>Bonjour ${name},</h3>
//     <p>Bienvenue sur Inditekk! Vous avez oublié votre mot de passe ? Vous pouvez modifier votre mot de passe en cliquant ci-dessous. </p>
//     <a href="${process.env.BASE_URL}/auth/reset/${passwordResetToken.token}"><button>Modifier mon mot de passe</button></a>
//     <p>Cordialement</p>`, passwordResetToken)
// };
