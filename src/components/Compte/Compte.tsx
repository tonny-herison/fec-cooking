import React from "react";
import Modal from "react-modal";
import { modalStyles } from "@/constants/styles";
import { getColumnIndex, getUniqueValues } from "@/utils/data";
import List from "../List";
import Button from "../Button";
import { formatCompteColumns } from "@/utils/comptes";

type Props = {
  data: string[][];
};

function Compte({ data }: Props) {
  const [open, setOpen] = React.useState(false);
  const [columns, setColumns] = React.useState<string[][]>([]);
  const [comptes, setComptes] = React.useState<string[][]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatHeaders = () => {
    const columns = formatCompteColumns([data[0]], data);
    setColumns(columns);
  };

  const getAccounts = () => {
    const datas = getUniqueValues(data, "CompteLib");
    const columnIndex = getColumnIndex(data, "CompteLib");
    if (columnIndex === -1) return [];
    const accounts = datas
      .map((item) => {
        const row = data.find((row) => row[columnIndex] === item);
        return row;
      })
      .filter((row) => row !== undefined);
    setComptes(formatCompteColumns(accounts, data));
  };

  React.useEffect(() => {
    getAccounts();
    formatHeaders();
  }, [data]);

  return (
    <div>
      <Button onClick={handleOpen}>Comptes ({comptes.length})</Button>
      <Modal
        isOpen={open}
        style={modalStyles as Modal.Styles}
        onRequestClose={handleClose}
        contentLabel="Comptes"
      >
        <h2 className="text-lg font-bold mb-4">Comptes ({comptes.length})</h2>
        <List data={[...columns, ...comptes]} />
      </Modal>
    </div>
  );
}
export default Compte;
