import styles from "./tables-common.module.scss";
import {
  ChangeEvent,
  useRef,
  KeyboardEvent,
  useState,
  FocusEvent,
  useContext,
  useEffect,
} from "react";
import inputBackStyles from "./table-optional-data.module.scss";
import {
  calculatePenalties,
  calculatePercentageTeeAccuracy,
  calculateTotal,
} from "@/components/tables/utils";
import { TablesContext } from "@/App";
import { keyHandlers } from "@/features/extra-info/constants";

type TableOptionalDataInputPropsType = {
  scores: string[];
  putts: string[];
  penalties: string[];
  handlePutts: (newPutts: string[]) => void;
  handlePenalties: (newPenalties: string[]) => void;
};
export const TableOptionalDataInput: React.FC<
  TableOptionalDataInputPropsType
> = ({ scores, putts, penalties, handlePutts, handlePenalties }) => {
  const [keyAccuracy, setKeyAccuracy] = useState<
    Array<
      | "hit"
      | "left"
      | "right"
      | "miss"
      | "missLong"
      | "missedEx"
      | "farLeft"
      | "farRight"
      | ""
    >
  >(Array(18).fill(""));
  const [teeAccuracy, setTeeAccuracy] = useState<string[]>(Array(18).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const { focusedInput, setFocusedInput, parArray } = useContext(TablesContext);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (focusedInput !== null) {
      setFocusedInput(null);
    }
    setFocusedInput(e.currentTarget);
  };
  const handlePuttsChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (scores[index].length === 0) {
      alert("Enter a score first");
      const newPutts = [...putts];
      newPutts[index] = "";
      handlePutts(newPutts);
    } else {
      const newPutts = [...putts];
      const currentValue = e.currentTarget.value.replace(/\D/, "");
      newPutts[index] = currentValue;
      handlePutts(newPutts);

      if (currentValue.length === 0) {
        const currentInput = inputRefs.current[index];
        if (currentInput) {
          setTimeout(() => {
            currentInput.focus();
          }, 200);
        }
      } else {
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          setTimeout(() => {
            nextInput.focus();
          }, 200);
        } else {
          const firstPuttInput = document.getElementById("penH1");
          setTimeout(() => {
            firstPuttInput && firstPuttInput.focus();
          }, 200);
        }
      }
    }
  };
  useEffect(() => {
    const autoFillTeeAccur = putts.map((putt, index) => {
      if (parArray[index] === 3 && scores[index] !== "" && putt) {
        if (+scores[index] === 1) {
          return "hit";
        } else if (+scores[index] === 2 && +putts[index] === 1) {
          return "hit";
        } else if (+scores[index] - +putts[index] <= 1) {
          return "hit";
        } else {
          return "missedEx";
        }
      } else {
        return "";
      }
    });
    setKeyAccuracy(autoFillTeeAccur);
  }, [putts]);

  const handlePenaltiesChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (scores[index].length === 0) {
      alert("Enter a score first");
      const newPutts = [...putts];
      newPutts[index] = "";
      handlePutts(newPutts);
    } else {
      const newPenalties = [...penalties];
      newPenalties[index] = e.currentTarget.value.replace(/[^wdosfWDOSF]/, "");
      handlePenalties(newPenalties);
      const nextInput = inputRefs.current[index + 19];
      if (nextInput) {
        if (e.currentTarget.value.length > 2) {
          setTimeout(() => {
            nextInput.focus();
          }, 200);
        }
      } else {
        const firstPuttInput = document.getElementById("teeAcH1");
        setTimeout(() => {
          firstPuttInput && firstPuttInput.focus();
        }, 200);
      }
    }
  };

  const handleTeeAccuraciesChange = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    e.preventDefault();
    const newTeeAccuracies = [...teeAccuracy];
    const changedKeysAccuracies = [...keyAccuracy];

    const nextInput = document.getElementById(
      inputRefs.current[index + 37]?.id,
    );

    const key = `${e.shiftKey ? "Shift_" : ""}${e.code}`;

    if (keyHandlers[key] as () => void) {
      keyHandlers[key](
        newTeeAccuracies,
        changedKeysAccuracies,
        nextInput,
        index,
        setTeeAccuracy,
        setKeyAccuracy,
      );
    } else if (e.code === 'Backspace' || e.code === 'Delete') {
      newTeeAccuracies[index] = '';
      changedKeysAccuracies[index] = '';
      setTeeAccuracy(newTeeAccuracies);
      setKeyAccuracy(changedKeysAccuracies);
    }
  };

  const puttOut = calculateTotal(putts, 0, 8);
  const puttIn = calculateTotal(putts, 9, 17);
  const totalPutt = puttOut + puttIn;

  const penaltiesOut = calculatePenalties(penalties.slice(0, 8));
  const penaltiesIn = calculatePenalties(penalties.slice(9, 17));
  const totalPenalties = penaltiesOut + penaltiesIn;

  const teeAccuracyOut = calculatePercentageTeeAccuracy(keyAccuracy, 0, 9);
  const teeAccuracyIn = calculatePercentageTeeAccuracy(keyAccuracy, 9, 18);

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td colSpan={24} className={styles.td_heading}>
            optional data input
          </td>
        </tr>

        <tr>
          <td className={styles.td_title}>PUTTS</td>
          {putts.slice(0, 9).map((score, index) => (
            <td key={`putts_${index}`} className={styles.td_scores}>
              <input
                type="text"
                width={"100%"}
                value={score}
                id={`ptH${index + 1}`}
                onChange={(e) => handlePuttsChange(e, index)}
                onFocus={handleFocus}
                ref={(ref) =>
                  (inputRefs.current[index] = ref as HTMLInputElement)
                }
              />
            </td>
          ))}

          <td className={styles.td_total_scores}>
            {puttOut === 0 ? "" : puttOut}
          </td>

          {putts.slice(9, 18).map((score, index) => (
            <td key={`putts_1${index}`} className={styles.td_scores}>
              <input
                type="text"
                width={"100%"}
                value={score}
                id={`ptH${index + 10}`}
                onChange={(e) => handlePuttsChange(e, index + 9)}
                onFocus={handleFocus}
                ref={(ref) =>
                  (inputRefs.current[index + 9] = ref as HTMLInputElement)
                }
              />
            </td>
          ))}

          <td className={styles.td_total_scores}>
            {puttIn === 0 ? "" : puttIn}
          </td>
          <td colSpan={3} className={styles.td_total_scores}>
            {totalPutt === 0 ? "" : totalPutt}
          </td>
        </tr>

        <tr>
          <td className={styles.td_title}>PENALTIES</td>

          {penalties.slice(0, 9).map((score, index) => {
            return (
              <td key={`penalties_${index}`} className={styles.td_scores}>
                <input
                  type="text"
                  width={"100%"}
                  value={score}
                  id={`penH${index + 1}`}
                  onChange={(e) => handlePenaltiesChange(e, index)}
                  onFocus={handleFocus}
                  ref={(ref) =>
                    (inputRefs.current[index + 18] = ref as HTMLInputElement)
                  }
                />
              </td>
            );
          })}

          <td className={styles.td_total_scores}>
            {penaltiesOut === 0 ? "" : penaltiesOut}
          </td>

          {penalties.slice(9, 18).map((score, index) => (
            <td key={`penalties_1${index}`} className={styles.td_scores}>
              <input
                type="text"
                width={"100%"}
                value={score}
                id={`penH${index + 10}`}
                onChange={(e) => handlePenaltiesChange(e, index + 9)}
                onFocus={handleFocus}
                ref={(ref) =>
                  (inputRefs.current[index + 27] = ref as HTMLInputElement)
                }
              />
            </td>
          ))}

          <td className={styles.td_total_scores}>
            {penaltiesIn === 0 ? "" : penaltiesIn}
          </td>
          <td colSpan={3} className={styles.td_total_scores}>
            {totalPenalties === 0 ? "" : totalPenalties}
          </td>
        </tr>

        <tr>
          <td className={styles.td_title}>TEE ACCURACY</td>

          {teeAccuracy.slice(0, 9).map((score, index) => (
            <td key={`teeAccuracy_${index}`} className={styles.td_scores}>
              <input
                type="text"
                id={`teeAcH${index + 1}`}
                onKeyDown={(e) => handleTeeAccuraciesChange(e, index)}
                onFocus={handleFocus}
                ref={(ref) =>
                  (inputRefs.current[index + 36] = ref as HTMLInputElement)
                }
                className={
                  keyAccuracy[index] !== ""
                    ? inputBackStyles[keyAccuracy[index]]
                    : ""
                }
              />
              <input type={"hidden"} value={score} />
            </td>
          ))}

          <td className={styles.td_total_scores}>
            {teeAccuracyOut === 0 ? "" : teeAccuracyOut + "%"}
          </td>

          {teeAccuracy.slice(9, 18).map((score, index) => {
            return (
              <td key={`teeAccuracy_1${index}`} className={styles.td_scores}>
                <input
                  type="text"
                  id={`teeAcH${index + 10}`}
                  onKeyDown={(e) => handleTeeAccuraciesChange(e, index + 9)}
                  onFocus={handleFocus}
                  ref={(ref) =>
                    (inputRefs.current[index + 45] = ref as HTMLInputElement)
                  }
                  className={
                    keyAccuracy[index + 9] !== ""
                      ? inputBackStyles[keyAccuracy[index + 9]]
                      : ""
                  }
                />
                <input type="hidden" value={score} />
              </td>
            );
          })}

          <td className={styles.td_total_scores}>
            {teeAccuracyIn === 0 ? "" : teeAccuracyIn + "%"}
          </td>

          <td className={styles.total}>
            <table>
              <tbody>
                <tr>
                  <td className={styles.head}>FAIRWAY</td>
                  <td className={styles.head}>PAR 3'S</td>
                  <td className={styles.head}>OVERALL</td>
                </tr>
                <tr>
                  <td className={styles.total_percent}>
                    {calculatePercentageTeeAccuracy(
                      keyAccuracy.filter((_, index) => parArray[index] !== 3),
                      0,
                      18,
                    )}
                    %
                  </td>
                  <td className={styles.total_percent}>
                    {calculatePercentageTeeAccuracy(
                      keyAccuracy.filter((_, index) => parArray[index] === 3),
                      0,
                      18,
                    )}
                    %
                  </td>
                  <td className={styles.total_percent}>
                    {calculatePercentageTeeAccuracy(
                      keyAccuracy.filter((value) => value !== ""),
                      0,
                      18,
                    )}
                    %
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
