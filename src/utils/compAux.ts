import { getColumnIndex } from "./data";

export const formatRows = (list: string[][], data: string[][]) => {
  return list.map((item) => [
    ...item,
    item[getColumnIndex(data, "CompAuxNum")][0],
  ]);
};

export const formatCompAuxColumns = (list: string[][], data: string[][]) => {
  const removeColumns = [
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
