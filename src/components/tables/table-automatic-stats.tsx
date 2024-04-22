import { useContext, useEffect, useState } from "react";
import styles from "@/components/tables/tables-common.module.scss";
import backgroundStyles from "@/components/tables/table-optional-data.module.scss";
import { TablesContext } from "@/App";
import { calculatePercentage } from "@/components/tables/utils";

const TableAutomaticStats = () => {
  const [gir, setGir] = useState<(1 | 0 | null)[]>(Array(18).fill(null));
  const [grints, setGrints] = useState<(1 | 0 | null)[]>(Array(18).fill(null));
  const [parSaves, setParSaves] = useState<(1 | 0 | null)[]>(
    Array(18).fill(null),
  );
  const [sandSaves, setSandSaves] = useState<(1 | 0 | null)[]>(
    Array(18).fill(null),
  );

  const { scores, parArray, putts, penalties } = useContext(TablesContext);

  useEffect(() => {
    const newGir = scores.map((score, index) => {
      if (
        parArray[index] &&
        !isNaN(parArray[index]) &&
        score !== "" &&
        putts[index]
      ) {
        const parForGir = parArray[index] - 2;
        const scoreForGir = +score - +putts[index];
        if (scoreForGir <= parForGir) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return null;
      }
    });
    setGir(newGir);
  }, [parArray, putts, scores]);

  useEffect(() => {
    const newGrints = scores.map((score, index) => {
      if (parArray[index] && !isNaN(parArray[index]) && score !== "") {
        if (+score === 0) return null;

        return +score === +parArray[index]
          ? 1
          : +score < +parArray[index]
          ? 1
          : +score > +parArray[index]
          ? 0
          : null;
      } else {
        return null;
      }
    });
    setGrints(newGrints);
  }, [parArray, scores]);

  useEffect(() => {
    const newParSaves = scores.map((score, index) => {
      if (
        parArray[index] &&
        !isNaN(parArray[index]) &&
        score !== "" &&
        putts[index]
      ) {
        if (+score === +parArray[index] && +putts[index] < 2) {
          return 1;
        } else if (
          +score > +parArray[index] &&
          +score - +parArray[index] - +putts[index] === -1
        ) {
          return 0;
        } else {
          return null;
        }
      } else {
        return null;
      }
    });
    setParSaves(newParSaves);
  }, [parArray, scores, putts]);

  useEffect(() => {
    const newSandSaves = penalties.map((penalty, index) => {
      if (
        parArray[index] &&
        !isNaN(parArray[index]) &&
        scores[index] !== "" &&
        penalty.includes("s")
      ) {
        const puttNum = +putts[index];
        const scoreNum = +scores[index];
        const parNum = +parArray[index];

        if (puttNum >= 2) {
          return 0;
        } else if (puttNum === 1 && scoreNum <= parNum) {
          return 1;
        } else {
          return null;
        }
      } else {
        return null;
      }
    });
    setSandSaves(newSandSaves);
  }, [parArray, scores, putts, penalties]);

  return (
    <div style={{ padding: "0 10px" }}>
      <table className={styles.table}>
        <tbody>
          <tr style={{ height: "100%" }}>
            <td colSpan={22} className={styles.heading_automatic}>
              automatic stats
            </td>
          </tr>

          <tr>
            <td className={`${styles.td_title} ${styles.auto_title}`}>GIR</td>
            {gir.slice(0, 9).map((value, index) => {
              return (
                <td
                  key={`gir_${index}`}
                  className={`${styles.td_scores} ${
                    value === 1 && backgroundStyles.hit
                  } ${value === 0 && backgroundStyles.missedEx}`}
                ></td>
              );
            })}
            <td className={styles.td_total_scores}>
              {calculatePercentage(gir, 0, 9)}%
            </td>
            {gir.slice(9, 18).map((value, index) => (
              <td
                key={`gir_1${index}`}
                className={`${styles.td_scores} ${
                  value === 1 && backgroundStyles.hit
                } ${value === 0 && backgroundStyles.missedEx}`}
              ></td>
            ))}
            <td className={styles.td_total_scores}>
              {calculatePercentage(gir, 9, 18)}%
            </td>
            <td colSpan={3} className={styles.td_total_scores}>
              {calculatePercentage(gir, 0, 18)}%
            </td>
          </tr>

          <tr>
            <td className={`${styles.td_title} ${styles.auto_title}`}>
              GRINTS
            </td>
            {grints.slice(0, 9).map((grint, index) => {
              return (
                <td
                  key={`grints_${index}`}
                  className={`${styles.td_scores} ${
                    grint === 1 && backgroundStyles.hit
                  } ${grint === 0 && backgroundStyles.missedEx}`}
                ></td>
              );
            })}
            <td className={styles.td_total_scores}>
              {calculatePercentage(grints, 0, 9)}%
            </td>
            {grints.slice(9, 18).map((grint, index) => (
              <td
                key={`grints_1${index}`}
                className={`${styles.td_scores} ${
                  grint === 1 && backgroundStyles.hit
                } ${grint === 0 && backgroundStyles.missedEx}`}
              ></td>
            ))}
            <td className={styles.td_total_scores}>
              {calculatePercentage(grints, 9, 18)}%
            </td>
            <td colSpan={3} className={styles.td_total_scores}>
              {calculatePercentage(grints, 0, 18)}%
            </td>
          </tr>

          <tr>
            <td className={`${styles.td_title} ${styles.auto_title}`}>
              PAR SAVES
            </td>
            {parSaves.slice(0, 9).map((par, index) => {
              return (
                <td
                  key={`parSaves_${index}`}
                  className={`${styles.td_scores} ${
                    par === 1 && backgroundStyles.hit
                  } ${par === 0 && backgroundStyles.missedEx}`}
                ></td>
              );
            })}
            <td className={styles.td_total_scores}>
              {calculatePercentage(parSaves, 0, 9)}%
            </td>
            {parSaves.slice(9, 18).map((par, index) => (
              <td
                key={`parSaves_1${index}`}
                className={`${styles.td_scores} ${
                  par === 1 && backgroundStyles.hit
                } ${par === 0 && backgroundStyles.missedEx}`}
              ></td>
            ))}
            <td className={styles.td_total_scores}>
              {calculatePercentage(parSaves, 9, 18)}%
            </td>
            <td colSpan={3} className={styles.td_total_scores}>
              {calculatePercentage(parSaves, 0, 18)}%
            </td>
          </tr>

          <tr>
            <td className={`${styles.td_title} ${styles.auto_title}`}>
              SAND SAVES
            </td>
            {sandSaves.slice(0, 9).map((sand, index) => {
              return (
                <td
                  key={`sandSaves_${index}`}
                  className={`${styles.td_scores} ${
                    sand === 1 && backgroundStyles.hit
                  } ${sand === 0 && backgroundStyles.missedEx}`}
                ></td>
              );
            })}
            <td className={styles.td_total_scores}>
              {/*{scoreOut === 0 ? "" : scoreOut}*/}
            </td>
            {sandSaves.slice(9, 18).map((sand, index) => (
              <td
                key={`sandSaves_1${index}`}
                className={`${styles.td_scores} ${
                  sand === 1 && backgroundStyles.hit
                } ${sand === 0 && backgroundStyles.missedEx}`}
              ></td>
            ))}
            <td className={styles.td_total_scores}>
              {/*{scoreIn === 0 ? "" : scoreIn}*/}
            </td>
            <td colSpan={3} className={styles.td_total_scores}>
              {/*{totalScoreSum === 0 ? "" : totalScoreSum}*/}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableAutomaticStats;
