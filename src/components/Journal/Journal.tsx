import React from "react";
import Modal from "react-modal";
import { modalStyles } from "@/constants/styles";
import { getColumnIndex, getUniqueValues } from "@/utils/data";
import List from "../List";
import Button from "../Button";
import { formatJournalColumns } from "@/utils/journal";

type Props = {
  data: string[][];
};

function Journal({ data }: Props) {
  const [open, setOpen] = React.useState(false);
  const [columns, setColumns] = React.useState<string[][]>([]);
  const [journaux, setJournaux] = React.useState<string[][]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatHeaders = () => {
    const columns = formatJournalColumns([data[0]], data);
    setColumns(columns);
  };

  const getJournaux = () => {
    const datas = getUniqueValues(data, "JournalCode");
    const columnIndex = getColumnIndex(data, "JournalCode");
    if (columnIndex === -1) return [];
    const journal = datas
      .map((item) => {
        const row = data.find((row) => row[columnIndex] === item);
        return row;
      })
      .filter((row) => row !== undefined);
    setJournaux(formatJournalColumns(journal, data));
  };

  React.useEffect(() => {
    getJournaux();
    formatHeaders();
  }, [data]);

  return (
    <div>
      <Button onClick={handleOpen}>Journaux ({journaux.length})</Button>
      <Modal
        isOpen={open}
        style={modalStyles as Modal.Styles}
        onRequestClose={handleClose}
        contentLabel="Journaux"
      >
        <h2 className="text-lg font-bold mb-4">Journaux ({journaux.length})</h2>
        <List data={[...columns, ...journaux]} />
      </Modal>
    </div>
  );
}
export default Journal;
