// "use server";

// import { parseWithZod } from "@conform-to/zod";
// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";
// import { CustomError, z } from "@/lib/zod-fr";

// const schema = z.object({
//   firstName: z.string(),
//   lastName: z.string(),
//   phone: z.string().optional(),
//   email: z.string().email(),
//   role: z.string(),
// });

// const updateSchema = z.object({
//   firstName: z.string(),
//   lastName: z.string(),
//   phone: z.string().optional(),
//   role: z.string(),
// });

// export async function editUser(prevState: any, formData: FormData) {
//   const userId = formData.get("id") as string;
//   try {
//     const submission = parseWithZod(formData, { schema: updateSchema });
//     if (submission.status !== "success") {
//       throw submission.error;
//     }
//     await prisma.user.update({
//       where: { id: userId },
//       data: {
//         ...submission.value,
//         role: "ADMIN",
//       },
//     });
//     revalidatePath("/backoffice/users");
//   } catch (error) {
//     console.log({ error });
//     if (error instanceof z.ZodError) {
//       return error.format() as unknown as CustomError;
//     }
//     return {};
//   }
// }
