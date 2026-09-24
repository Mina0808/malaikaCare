import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === "custom") {
    return { message: issue.message ?? "" };
  }
  switch (issue.code) {
    case z.ZodIssueCode.too_small:
      return {
        message: `Le champ doit avoir au moins ${issue.minimum} caractères.`,
      };
    case z.ZodIssueCode.too_big:
      return {
        message: `Le champ doit avoir au plus ${issue.maximum} caractères.`,
      };
    case z.ZodIssueCode.invalid_string:
      if (issue.validation === "email") {
        return { message: "Le champ doit être une adresse email valide." };
      }
      if (issue.validation === "url") {
        return { message: "Le champ doit être une URL valide." };
      }
    case z.ZodIssueCode.invalid_date:
      return { message: "Le champ doit être une date valide." };

    // case z.ZodIssueCode.invalid_type:
    // case z.ZodIssueCode.invalid_literal:
    // case z.ZodIssueCode.invalid_union:
    // case z.ZodIssueCode.invalid_enum_value:
    // case z.ZodIssueCode.invalid_union_discriminator:
    // case z.ZodIssueCode.unrecognized_keys:
    // case z.ZodIssueCode.invalid_arguments:
    // case z.ZodIssueCode.invalid_return_type:
    // case z.ZodIssueCode.invalid_intersection_types:
    // case z.ZodIssueCode.not_multiple_of:
    // case z.ZodIssueCode.not_finite:
  }
  return { message: "Valeur invalide" };
};

z.setErrorMap(customErrorMap);

export type CustomError = {
  [x: string]: { _errors: string[] };
};

export { z };
