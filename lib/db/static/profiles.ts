import invariant from "tiny-invariant";

// TODO: transform ids to string
const profiles = [
  {
    id: 1,
    name: "Sociétés minières ou Cimenteries",
    rules: [
      {
        min_revenues: 25_000_000_000,
        subscription_fee: 20_000_000,
      },
      {
        min_revenues: 5_000_000_000,
        max_revenues: 25_000_000_000,
        subscription_fee: 12_500_000,
      },
      {
        min_revenues: 1_000_000_000,
        max_revenues: 5_000_000_000,
        subscription_fee: 5_000_000,
      },
      {
        min_revenues: 200_000_000,
        max_revenues: 1_000_000_000,
        subscription_fee: 2_000_000,
      },
      {
        min_revenues: 30_000_000,
        max_revenues: 200_000_000,
        subscription_fee: 500_000,
      },
      {
        max_revenues: 30_000_000,
        subscription_fee: 200_000,
      },
    ],
  },
  {
    id: 2,
    name: "Entreprises avec permis de recherche",
    rules: [
      {
        subscription_fee: 5_000_000,
      },
    ],
  },
  {
    id: 3,
    name: "Sous-traitants",
    rules: [
      {
        subscription_fee: 4_000_000,
      },
    ],
  },
  {
    id: 4,
    name: "Fournisseurs et Prestataires étrangers",
    rules: [
      {
        subscription_fee: 4_000_000,
      },
    ],
  },
  {
    id: 5,
    name: "Fournisseurs et Prestataires locaux",
    help: `Si 51% de votre capital est détenu par des sénégalais,
     80% de votre personnel d'encadrement est sénégalais et si
      51% du reste de votre personnel est sénégalais alors cochez cette case Sinon cochez la dernière case`,
    rules: [
      {
        subscription_fee: 150_000,
      },
    ],
  },
  {
    id: 6,
    name: "Fournisseurs et Prestataires de droit sénégalais",
    rules: [
      {
        subscription_fee: 2_000_000,
      },
    ],
  },
  {
    id: 7,
    name: "Fournisseurs et prestataires locaux (GPF ou GIE)",
    rules: [
      {
        subscription_fee: 100_000,
      },
    ],
  },
];

type Rule = {
  min_revenues?: number;
  max_revenues?: number;
  subscription_fee: number;
};

export function computeFees(
  profileId: number,
  revenues?: number | bigint,
): number {
  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) {
    throw new Error(`Profile ${profileId} not found`);
  }
  if (profile.rules.length === 1) {
    invariant(
      profile.rules[0].subscription_fee,
      `No subscription_fee for profile ${profileId}`,
    );
    return Math.round(profile.rules[0].subscription_fee * 1.18);
  }
  invariant(revenues !== undefined, `No revenues for profile ${profileId}`);
  const rules = profile.rules as Rule[];
  const foundRules = rules.filter(
    (r) =>
      (!r.min_revenues || r.min_revenues <= revenues) &&
      (!r.max_revenues || r.max_revenues > revenues),
  );
  if (foundRules.length !== 1) {
    throw new Error(
      `No rule found for profile ${profileId} and revenues ${revenues}`,
    );
  }
  const rule = foundRules[0];
  return Math.round(rule.subscription_fee * 1.18);
}

export function getProfile(profile_id: number) {
  const profile = profiles.find((p) => p.id === profile_id);
  if (!profile) {
    throw new Error(`Profile ${profile_id} not found`);
  }
  return profile;
}

export default profiles;
