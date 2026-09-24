"use server"
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import path from "path";

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
export const sendEmail = async (to: any, subject: string, html: string, verificationToken?: any,) => {
  const name = `${to.lastName} ${to.firstName}`;
  try {
    const accessToken = await oauth2Client.getAccessToken();

    // Configurer le transporteur Nodemailer avec OAuth2
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_EMAIL, // Adresse Gmail
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token, // Token d'accès pour l'authentification
      },
    } as nodemailer.TransportOptions);

    // Paramètres de l'email
    if (verificationToken){
      const mailOptions = {
      from: to.email, 
      to:`${process.env.GMAIL_EMAIL}`, 
      subject : subject, 
      verificationToken, 
      html: html,
      attachments: [
        {
          filename: "logo malaika.jpg",
          path: logoPath, // Chemin de l'image locale
          cid: "logoImage", // Content ID utilisé dans l'email
        },
      ],
    };

    // Envoyer l'email
    const result = await transporter.sendMail(mailOptions);
    console.log("Email envoyé :", result);
  }
  else{
    const mailOptions = {
      from: to.email, 
      to:`${process.env.GMAIL_EMAIL}`, 
      subject : subject,
      html: html,
      attachments: [
        {
          filename: "logo malaika.jpg",
          path: logoPath, // Chemin de l'image locale
          cid: "logoImage", // Content ID utilisé dans l'email
        },
      ],
    };

    // Envoyer l'email
    const result = await transporter.sendMail(mailOptions);
    console.log("Email envoyé :", result);
  }
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
  }
};

export const sendEmailRegister = async (to: any, verificationToken: any) => {
  const name = `${to.lastName} ${to.firstName}`;
  sendEmail(to, 'Bienvenue chez Inditekk!!', `
    <div>
    <img
      src="cid:logoImage"
      alt="logo"
    />
    <img
      src="cid:travelImage"
      alt="travel"
    />
    </div>
    <h3>Bonjour ${name},</h3>
    <p>Merci d'avoir rejoint Inditekk!. Vous pourrez bientôt envoyer tous vos colis de Paris vers Dakar! Il ne reste plus qu'une seule étape!.<br />
    Pour activer votre compte, cliquez sur le lien ci-dessous</p>
    <a href="${process.env.BASE_URL}/auth/verify/${verificationToken.token}"><button style="background-color:DodgerBlue; border-radius: 8px; padding: 5px; border: 2px solid DodgerBlue; ">Confirmer mon compte</button></a>
    <p>Cordialement</p>`, verificationToken)
};

export const sendEmailQuote = async (to: any) => {
  const name = `${to.lastName} - ${to.firstName}`;
  sendEmail(to, `[${name} - Demande de devis]`, `${to.text}`)
};

export const sendEmailReceived = async (to: any, idPkg:number) => {
  const name = `${to.lastName} ${to.firstName}`;
  sendEmail(to, `Votre colis #${idPkg} a été réceptionné!`, `
    <div>
    <img
      src="cid:logoImage"
      alt="logo"
    />
    <img
      src="cid:travelImage"
      alt="travel"
    />
    <p><b>Votre colis a été reçu</b></p>
    </div>
    <h3>Bonjour ${name},</h3>
    <p>Merci d'avoir choisi Inditekk!. Votre commande ${idPkg} a été reçue et sera expédiée sous peu!</p>
    <a href="/order/${idPkg}"><button>Voir ma commande</button></a>
    <p>Cordialement</p>`)
};

export const sendEmailCorrection = async (to: any, idPkg:number, correction:string, type:string) => {
  const name = `${to.lastName} ${to.firstName}`;
  if (type==="Renvoyer"){
    sendEmail(to, `Mise à jour de votre signalisation #${idPkg}`, `
      <div>
      <img
        src="cid:logoImage"
        alt="logo"
      />
      <img
        src="cid:travelImage"
        alt="travel"
      />
      </div>
      <h3>Bonjour ${name},</h3>
      <p>Malheureusement, il y a un problème avec l'enregistrement de votre colis! Votre signalisation a été renvoyée pour le motif suivant ${correction}. Veuillez corriger les informations en cliquant ci-dessous</p>
      <a href="/order/${idPkg}"><button>Corriger ma signalisation</button></a>
      <p>Cordialement</p>`)
  }
  else{
    sendEmail(to, `Mise à jour de votre colis #${idPkg}`, `
      <div>
      <img
        src="cid:logoImage"
        alt="logo"
      />
      <img
        src="cid:travelImage"
        alt="travel"
      />
      </div>
      <h3>Bonjour ${name},</h3>
      <p>Malheureusement, il y a un problème avec votre colis! L'envoi de votre colis a été annulé pour le motif suivant ${correction}. Nous espérons vous revoir bientôt! Vous pouvez voir les détails en cliquant ce-dessous</p>
      <a href="/order/${idPkg}"><button>Voir la liste de mes colis</button></a>
      <p>Cordialement</p>`)
  }
};

export const sendEmailValidation = async (to: any, idPkg:number) => {
  const name = `${to.lastName} ${to.firstName}`;
  sendEmail(to, `Mise à jour de votre signalisation #${idPkg}`, `
    <div>
    <img
      src="cid:logoImage"
      alt="logo"
    />
    <img
      src="cid:travelImage"
      alt="travel"
    />
    <p><b>Votre colis est à Dakar</b></p>
    </div>
    <h3>Bonjour ${name},</h3>
    <p>Félicitations! Votre enregistrement est colis. Nous attendons la réception de votre colis avec impatience! Dès que vous recevez votre numéro de suivi, veuillez nous fournir votre numéro de suivi pour qu'on puisse valider la réception.</p>
    <a href="/order/${idPkg}"><button>Voir ma commande</button></a>
    <p>Cordialement</p>`)
};

export const sendEmailDakar = async (to: any, idPkg:number) => {
  const name = `${to.lastName} ${to.firstName}`;
  sendEmail(to, `Votre colis #${idPkg} est arrivé à Dakar`, `
    <div>
    <img
      src="cid:logoImage"
      alt="logo"
    />
    <img
      src="cid:travelImage"
      alt="travel"
    />
    <p><b>Votre colis est à Dakar</b></p>
    </div>
    <h3>Bonjour ${name},</h3>
    <p>C'est pour bientôt! Votre colis arrive bientôt à votre porte! Il nous manque juste une information: comment voulez-vous recevoir votre colis ? Veuillez sélectionner votre mode de livraison en cliquant ci-dessous</p>
    <a href="/order/${idPkg}"><button>Sélectionner le mode de livraison</button></a>
    <p>Cordialement</p>`)
};

export const sendEmailDelivered = async (to: any) => {
  const name = `${to.lastName} ${to.firstName}`;
  sendEmail(to, `Livraison confirmée`, `
    <div>
    <img
      src="cid:logoImage"
      alt="logo"
    />
    <img
      src="cid:travelImage"
      alt="travel"
    />
    <p><b>Votre colis a été livré</b></p>
    </div>
    <h3>Bonjour ${name},</h3>
    <p>Votre colis a bien été livré! Merci d'avoir choisi Inditekk pour le transfert de votre colis. Nous espérons vous revoir très vite chez Inditekk!</p>
    <a href="/order"><button>Enregistrer un nouveau colis</button></a>
    <p>Cordialement</p>`)
};

// Fonction pour envoyer l'email
export const sendEmailReset = async (to: any, passwordResetToken: any, ) => {
  const name = `${to.lastName} ${to.firstName}`;
  sendEmail(to, 'Réinitialisation du mot de passe', `
    <div>
    <img
      src="cid:logoImage"
      alt="logo"
    />
    <img
      src="cid:travelImage"
      alt="travel"
    />
    </div>
    <h3>Bonjour ${name},</h3>
    <p>Bienvenue sur Inditekk! Vous avez oublié votre mot de passe ? Vous pouvez modifier votre mot de passe en cliquant ci-dessous. </p>
    <a href="${process.env.BASE_URL}/auth/reset/${passwordResetToken.token}"><button>Modifier mon mot de passe</button></a>
    <p>Cordialement</p>`, passwordResetToken)
};
