import { getColumnIndex } from "./data";

export const formatJournalColumns = (list: string[][], data: string[][]) => {
  const removeColumns = [
    getColumnIndex(data, "CompteNum"),
    getColumnIndex(data, "CompteLib"),
    getColumnIndex(data, "CompAuxNum"),
    getColumnIndex(data, "CompAuxLib"),
    getColumnIndex(data, "EcritureNum"),
    getColumnIndex(data, "EcritureDate"),
    getColumnIndex(data, "EcritureLib"),
    getColumnIndex(data, "PieceRef"),
    getColumnIndex(data, "PieceDate"),
    getColumnIndex(data, "Debit"),
    getColumnIndex(data, "Credit"),
    getColumnIndex(data, "EcritureLet"),
    getColumnIndex(data, "DateLet"),
    getColumnIndex(data, "ValidDate"),
    getColumnIndex(data, "Montantdevise"),
    getColumnIndex(data, "Idevise"),
  ];
  list = list.map((item) =>
    item.filter((_, index) => !removeColumns.includes(index))
  );
  return list;
};
