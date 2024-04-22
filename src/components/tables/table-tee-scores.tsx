import styles from "@/components/tables/tables-common.module.scss";
import { useContext, useEffect, useState } from "react";
import { TablesContext } from "@/App";
import { Options } from "@/utils/constants/courses-options";
import {
  calculateTotal,
  getRatingTee,
  getSlopeTee,
  setTeeStyle,
} from "@/components/tables/utils";
import { People } from "@/utils/constants/people";

type TableTeeScoresPropsType = {
  parArray: number[];
  setParArray: (value: number[]) => void;
};

export const TableTeeScores: React.FC<TableTeeScoresPropsType> = ({
  parArray,
  setParArray,
}) => {
  const { bindInputValue, teeValue, inputUserValue } =
    useContext(TablesContext);

  const [teeRandomNumbers, setTeeRandomNumbers] = useState<number[]>(
    Array(18).fill(""),
  );
  const [indexArray, setIndexArray] = useState<number[]>(Array(18).fill(""));

  const numbers = Array.from({ length: 18 }, (_, i) => i + 1);

  useEffect(() => {
    if (teeValue !== "Select a tee") {
      const course = Options.find((el) => el.courseName === bindInputValue);
      if (course) {
        setTeeRandomNumbers(
          Array.from(
            { length: 18 },
            () => Math.floor(Math.random() * (600 - 80 + 1)) + 80,
          ),
        );
        setParArray(course.par);
        setIndexArray(course.index);
      }
    }
  }, [teeValue]);

  const teeOut = calculateTotal(teeRandomNumbers, 0, 8);
  const teeIn = calculateTotal(teeRandomNumbers, 9, 17);
  const totalTee = teeIn + teeOut;
  const parOut = calculateTotal(parArray, 0, 8);
  const parIn = calculateTotal(parArray, 9, 17);
  const totalPar = parIn + parOut;

  return (
    <table className={`${styles.table} ${styles.tee_scores_table}`}>
      <tbody>
        <tr>
          <td className={`${styles.td_title} ${styles.optional_title}`}>
            HOLE
          </td>

          {numbers.slice(0, 9).map((el) => (
            <td key={el} className={styles.td_scores}>
              {el}
            </td>
          ))}

          <td className={styles.td_total_scores}>OUT</td>

          {numbers.slice(9, 18).map((el) => (
            <td key={el} className={styles.td_scores}>
              {el}
            </td>
          ))}

          <td className={styles.td_total_scores}>IN</td>
          <td className={styles.td_total_scores}>TOT</td>
          <td colSpan={2} className={styles.user_hdcp}>
            <em>Handicap: </em>
            <span>
              <b>
                {inputUserValue === ""
                  ? "~15"
                  : People.find((el) => el.name === inputUserValue)!.handicap}
              </b>
            </span>
          </td>
        </tr>

        <tr style={setTeeStyle(teeValue)}>
          <td className={styles.td_title}>
            {teeValue === "Select a tee" ? "TEE" : teeValue}
            {teeValue !== "Select a tee" && (
              <span>
                {getRatingTee(bindInputValue, teeValue)}/
                {getSlopeTee(bindInputValue, teeValue)}
              </span>
            )}
          </td>

          {teeRandomNumbers.slice(0, 9).map((el, index) => (
            <td key={`11_${index}`} className={styles.td_scores_tee}>
              {el}
            </td>
          ))}

          <td className={styles.td_total_scores_tee}>
            {teeOut === 0 ? "" : teeOut}
          </td>

          {teeRandomNumbers.slice(9, 18).map((el, index) => (
            <td key={`12_${index}`} className={styles.td_scores_tee}>
              {el}
            </td>
          ))}

          <td className={styles.td_total_scores_tee}>
            {teeIn === 0 ? "" : teeIn}
          </td>
          <td className={styles.td_total_scores_tee}>
            {totalTee === 0 ? "" : totalTee}
          </td>
          <td colSpan={2} className={styles.user_hdcp}></td>
        </tr>

        <tr>
          <td className={`${styles.td_title} ${styles.optional_title}`}>PAR</td>

          {parArray.slice(0, 9).map((el, index) => (
            <td key={`13_${index}`} className={styles.td_scores}>
              {el}
            </td>
          ))}

          <td className={styles.td_total_scores}>
            {parOut === 0 ? "" : parOut}
          </td>

          {parArray.slice(9, 18).map((el, index) => (
            <td key={`14_${index}`} className={styles.td_scores}>
              {el}
            </td>
          ))}

          <td className={styles.td_total_scores}>{parIn === 0 ? "" : parIn}</td>
          <td className={styles.td_total_scores}>
            {totalPar === 0 ? "" : totalPar}
          </td>
          <td colSpan={2} className={styles.user_hdcp}></td>
        </tr>

        <tr>
          <td className={`${styles.td_title} ${styles.optional_title}`}>
            INDEX
          </td>

          {indexArray.slice(0, 9).map((el, index) => (
            <td key={`15_${index}`} className={styles.td_scores}>
              {el}
            </td>
          ))}

          <td className={styles.td_total_scores}></td>

          {indexArray.slice(9, 18).map((el, index) => (
            <td key={`16_${index}`} className={styles.td_scores}>
              {el}
            </td>
          ))}

          <td className={styles.td_total_scores}></td>
          <td className={styles.td_total_scores}></td>
          <td className={styles.td_total_scores}>HCP</td>
          <td className={styles.td_total_scores}>NET</td>
        </tr>
      </tbody>
    </table>
  );
};
