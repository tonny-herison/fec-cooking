import React from "react";
import Modal from "react-modal";
import { modalStyles } from "@/constants/styles";
import { getColumnIndex, getUniqueValues } from "@/utils/data";
import List from "../List";
import Button from "../Button";
import { formatCompAuxColumns, formatRows } from "@/utils/compAux";

type Props = {
  data: string[][];
};

type Racine = {
  racine: string;
  centralisateur: string;
};

function CompAux({ data }: Props) {
  const [open, setOpen] = React.useState(false);
  const [columns, setColumns] = React.useState<string[][]>([]);
  const [compAux, setCompAux] = React.useState<string[][]>([]);
  const [racines, setRacines] = React.useState<Racine[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatHeaders = () => {
    const headers = [...data[0], "Racine"];
    const columns = formatCompAuxColumns([headers], data);
    setColumns(columns);
  };

  const getAuxAccounts = () => {
    const datas = getUniqueValues(data, "CompAuxLib");
    const columnIndex = getColumnIndex(data, "CompAuxLib");
    if (columnIndex === -1) return [];
    const auxAccounts = datas
      .map((item) => {
        const row = data.find((row) => row[columnIndex] === item);
        return row;
      })
      .filter((row) => row !== undefined);
    setCompAux(formatCompAuxColumns(formatRows(auxAccounts, data), data));
  };

  const getRacines = () => {
    const datas = getUniqueValues([...columns, ...compAux], "Racine");
    const columnIndex = getColumnIndex(columns, "Racine");
    if (columnIndex === -1) return [];
    const racines = datas
      .map((item) => {
        const row = compAux.find((row) => row[columnIndex] === item);
        return row;
      })
      .filter((row) => row !== undefined)
      .map((row) => ({
        racine: row[getColumnIndex(columns, "Racine")],
        centralisateur: `${row[getColumnIndex(columns, "CompteNum")]} - ${
          row[getColumnIndex(columns, "CompteLib")]
        }`,
      }));
    setRacines(racines);
  };

  React.useEffect(() => {
    getAuxAccounts();
    formatHeaders();
  }, [data]);

  React.useEffect(() => {
    getRacines();
  }, [columns, compAux]);

  return (
    <div>
      <Button onClick={handleOpen}>
        Comptes auxiliaires ({compAux.length})
      </Button>
      <Modal
        isOpen={open}
        style={modalStyles as Modal.Styles}
        onRequestClose={handleClose}
        contentLabel="Comptes auxiliaires"
      >
        <h2 className="text-lg font-bold mb-4">
          Compte auxiliaires ({compAux.length})
        </h2>
        <div className="flex flex-col gap-1 mb-5">
          {racines.map((racine, index) => (
            <div key={index} className="text-sm border-t pt-2">
              Compte auxiliaire <strong>{racine.centralisateur}</strong>
              <br />
              <strong className="italic text-blue-600">
                Racine : {racine.racine[0]}
              </strong>
            </div>
          ))}
        </div>
        <List data={[...columns, ...compAux]} />
      </Modal>
    </div>
  );
}
export default CompAux;
