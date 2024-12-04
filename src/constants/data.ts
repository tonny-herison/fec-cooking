export const fecDatesColumns: (keyof typeof COLUMNS)[] = [
  "EcritureDate",
  "PieceDate",
  "DateLet",
  "ValidDate",
];

//FEC Columns
export enum COLUMNS {
  "JournalCode" = "Code de journal",
  "JournalLib" = "Libellé de journal",
  "EcritureNum" = "Numéro d'écriture",
  "EcritureDate" = "Date d'écriture",
  "CompteNum" = "Numéro de compte",
  "CompteLib" = "Compte",
  "CompAuxNum" = "Numéro de compte auxiliaire",
  "CompAuxLib" = "Compte auxiliaire",
  "PieceRef" = "Référence de la pièce",
  "PieceDate" = "Date de la pièce",
  "EcritureLib" = "Libellé",
  "Debit" = "Débit",
  "Credit" = "Crédit",
  "EcritureLet" = "Lettrage",
  "DateLet" = "Date de lettrage",
  "ValidDate" = "Date de validation",
  "Montantdevise" = "Montant en devise",
  "Idevise" = "Identifiant de la devise",
}

export enum COMPAUXCOLUMNS {
  "Racine" = "Racine",
}
