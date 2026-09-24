"use server";

import { redirect } from "next/navigation";
import { findUserBy } from "@/lib/db/users";
//import { createPasswordResetToken } from "@/lib/db/users/password-reset-tokens";
import { sendEmailReset } from '@/lib/emails/mailer'
import { z } from "zod";


const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function sendResetEmail(prevState: any, formData: FormData) {
  try {
    const payload = forgotPasswordSchema.parse(Object.fromEntries(formData));
    const user = await findUserBy({ email: payload.email });
    console.log("user : ", user)
    if (!user) {
      console.log("user not found");
      throw new Error("User not found");
    }
    if (user.status === "INACTIF") {
      console.log("User desactivated");
      throw new Error("User desactivated");
    }
  } catch (error) {
    return { _errors: ["Email not found or not verified"] };
  }
  redirect("/auth/confirmation");
}
