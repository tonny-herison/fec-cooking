import { getExerciceData } from "@/utils/data";
import React from "react";

type Props = {
  data: string[][];
};

function Exercice({ data }: Props) {
  const [dates, setDates] = React.useState<{ debut: string; fin: string }>({
    debut: "",
    fin: "",
  });

  React.useEffect(() => {
    const dates = getExerciceData(data);
    setDates(dates);
  }, [data]);

  return (
    <div className="flex flex-col gap-2">
      <div>
        Début de l'exercice : <strong>{dates.debut}</strong>
      </div>
      <div>
        Fin de l'exercice : <strong>{dates.fin}</strong>
      </div>
    </div>
  );
}

export default Exercice;
