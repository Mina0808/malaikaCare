"use server";

import bcrypt from "bcryptjs";
import { homePage } from "@/lib/authorization";
import { findClientBy, findProfessionalBy } from "@/lib/db/users";
import { authenticate } from "@/lib/session";
import { z } from "@/lib/zod-fr";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

export async function login(prevState: any, formData: FormData) {
  let redirectTo: string | null = "/";
  try {
    const payload = loginSchema.parse(Object.fromEntries(formData));
    const user = await findProfessionalBy({ email: payload.email.toLowerCase() });

    if (!user || !user.password || user.status!=="ACTIF") {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) {
      throw new Error("Password is incorrect");
    }
    //console.log(user)
    redirectTo = await authenticate(user);
    console.log(redirectTo)
    redirectTo =  homePage(user.role);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.format());
    }
    return { _errors: ["Email ou mot de passe incorrect"] };
  }
  console.log( "redirect", redirectTo,)
  return { redirectTo };
}
