import { useContext } from "react";
import { TableUserScore } from "@/components/tables/table-user-score";
import { TableOptionalDataInput } from "@/components/tables/table-optional-data-input";
import styles from "./card-with-tables.module.scss";
import { TableTeeScores } from "@/components/tables/table-tee-scores";
import { TablesContext } from "@/App";
const CardWithTables = () => {
  const Context = useContext(TablesContext);
  return (
    <div className={styles.main_container}>
      <TableTeeScores
        parArray={Context.parArray}
        setParArray={Context.setParArray}
      />
      <TableUserScore
        scores={Context.scores}
        handleScores={Context.setScores}
        parArray={Context.parArray}
      />
      <TableOptionalDataInput
        scores={Context.scores}
        putts={Context.putts}
        handlePutts={Context.setPutts}
        handlePenalties={Context.setPenalties}
        penalties={Context.penalties}
      />
    </div>
  );
};
export default CardWithTables;
