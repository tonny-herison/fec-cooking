import React from "react";
import { formatColumns, formatData } from "@/utils/data";
import DataTable, { TableColumn } from "react-data-table-component";

type Props = {
  data: string[][];
};

function List({ data }: Props) {
  const [columns, setColumns] = React.useState<TableColumn<string[]>[]>([]);

  const updateColumns = (data: string[][]) => {
    const cols: TableColumn<any>[] = formatColumns(data);
    setColumns(cols);
  };

  React.useEffect(() => {
    updateColumns(data);
  }, [data]);

  return <DataTable columns={columns} data={formatData(data)} pagination />;
}

export default List;
