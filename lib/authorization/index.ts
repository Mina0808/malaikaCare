// export type Resource =
//   | "PAYMENTS"
//   | "USER";

// export function can(groups: Group[], resource: Resource) {
//   if (groups.includes(Group.USER)) {
//     return true;
//   }
//   if (resource === "PAYMENTS") {
//     return groups.includes(Group.PAYMENTS);
//   }

//   return false;
// }

// export function cannot(groups: Group[], resource: Resource) {
//   return !can(groups, resource);
// }

export function homePage(role: string) {

  if ( role !== "INDIVIDUAL" ) {
    return "/backoffice";
  }

  // else if ( role != Role.INDIVIDUAL && role != Role.ENTERPRISE ) {
  //   return "/backoffice/customers";
  // }

  return "/";
}
