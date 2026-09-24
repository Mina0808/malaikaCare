"use server";

import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { registerUser } from "@/lib/db/users";
import { CustomError, z } from "@/lib/zod-fr";
//import { createPasswordResetToken } from "@/lib/db/users/password-reset-tokens";
import invariant from "tiny-invariant";

const schema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  email: z
    .string()
    .email()
    .transform((str) => str.toLowerCase()),
  indic: z.string(),
  phone : z.string(), 
  country : z.string().optional(), 
  address : z.string(),
  city : z.string(),
  password_confirmation: z.string(),
  password: z.string(),
})
.refine(
  (data: { password_confirmation: string; password: any }) =>
    data.password === data.password_confirmation,
  {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirmation"],
  },
);

export async function register(prevState: any, formData: FormData) {
  try {
    const payload = schema.parse(Object.fromEntries(formData));
    const [user] = await registerUser(payload);
    // console.log("in action.ts " , user)
     //sendEmailRegister( user, verificationToken)
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return error.format() as unknown as CustomError;
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002" &&
      typeof error.meta !== "undefined" &&
      Array.isArray(error.meta.target) &&
      error.meta.target.includes("email")
    ) {
      return [ "Cette adresse email est déjà utilisée"];
    }
    if (
      error instanceof z.ZodError && error.message.includes('password_confirmation')
    ){
      return ["Les mots de passe ne correspondent pas"];
    }
    console.error(error);
    return {error};
  }
  redirect("/auth/login");
}
