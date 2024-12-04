import { COLUMNS, COMPAUXCOLUMNS, fecDatesColumns } from "@/constants/data";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
import { TableColumn } from "react-data-table-component";

dayjs.extend(minMax);

export function formatFecDate(date: string): string {
  return `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(
    6,
    8
  )}`;
}

export function formatColumns(data: string[][]): TableColumn<any>[] {
  return data[0]
    ? data[0].map((label, index) => ({
        name: label,
        selector: (row: any) => row[`column-${index}`],
        format: (row: any) => {
          if (
            fecDatesColumns
              .map((item) => item.toLowerCase())
              .includes(label.toLowerCase())
          ) {
            const value = row[`column-${index}`];
            const formatted = formatFecDate(value);
            return value ? dayjs(formatted).format("DD/MM/YYYY") : value;
          }
          return row[`column-${index}`];
        },
      }))
    : [];
}

export function getColumnIndex(
  data: string[][],
  columnLabel: keyof typeof COLUMNS | keyof typeof COMPAUXCOLUMNS
): number {
  const columns = formatColumns(data);
  const columnIndex = columns.findIndex(
    (col) => col.name?.toString().toLowerCase() === columnLabel.toLowerCase()
  );
  return columnIndex;
}

export function formatData(data: string[][]): any[] {
  const d = data.slice(1);
  return d.map((row: string[]) => {
    let obj: any = {};
    row.map((value, index) => {
      obj[`column-${index}`] = value;
    });
    return obj;
  });
}

export function getUniqueValues(
  data: string[][],
  columnLabel: keyof typeof COLUMNS | keyof typeof COMPAUXCOLUMNS
): string[] {
  const columns = formatColumns(data);
  const rows = formatData(data);
  const columnIndex = columns.findIndex(
    (col) => col.name?.toString().toLowerCase() === columnLabel.toLowerCase()
  );
  if (columnIndex === -1) {
    return [];
  }
  const columnValues = rows
    .map((row) => row[`column-${columnIndex}`])
    .filter((value) => value !== "");
  return [...new Set(columnValues)];
}

export function getExerciceData(data: string[][]): {
  debut: string;
  fin: string;
} {
  const dates = getUniqueValues(data, "EcritureDate").map((date) =>
    dayjs(formatFecDate(date))
  );
  const minDate = dayjs.min(dates) ?? dayjs();
  const maxDate = dayjs.max(dates) ?? dayjs();
  return {
    debut: minDate.format("DD/MM/YYYY"),
    fin: maxDate.format("DD/MM/YYYY"),
  };
}