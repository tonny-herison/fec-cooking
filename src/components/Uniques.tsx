import React from "react";
import CompAux from "./CompAux/CompAux";
import Compte from "./Compte/Compte";
import Journal from "./Journal/Journal";

type Props = {
  data: string[][];
};

function Uniques({ data }: Props) {
  return (
    <div className="flex gap-3">
      <Journal data={data} />
      <Compte data={data} />
      <CompAux data={data} />
    </div>
  );
}

export default Uniques;
