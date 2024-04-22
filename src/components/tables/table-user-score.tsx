import {
  ChangeEvent,
  FocusEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./tables-common.module.scss";
import {
  calculateHCP,
  calculateTotal,
  fillHCPIndexArray,
  fillScoreHDCPArray,
  getClassName,
} from "@/components/tables/utils";
import { TablesContext } from "@/App";
import { Options } from "@/utils/constants/courses-options";

type TableUserScorePropsType = {
  scores: string[];
  handleScores: (newScores: string[]) => void;
  parArray: number[];
};

export const TableUserScore: React.FC<TableUserScorePropsType> = ({
  scores,
  handleScores,
  parArray,
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const {
    teeValue,
    setFocusedInput,
    focusedInput,
    inputUserValue,
    bindInputValue,
  } = useContext(TablesContext);
  const [className, setClassName] = useState<string[]>(Array(18).fill(""));

  const [indexArray, setIndexArray] = useState<number[]>([]);
  const [scoreHCPArray, setScoreHCPArray] = useState<number[]>([]);
  // const [netScore, setNetScore] = useState<number[]>([]);

  const [HCP, setHCP] = useState(0);
  const [HCPIndexArray, setHCPIndexArray] = useState<number[]>(
    Array(18).fill(0),
  );

  useEffect(() => {
    if (HCP) {
      setScoreHCPArray(fillScoreHDCPArray(parArray, HCPIndexArray, scores));

      if (indexArray) {
        setHCPIndexArray(fillHCPIndexArray(indexArray, HCP));
      }
    }
  }, [parArray, scores]);

  const netScore = scores.slice(0, 18).map((score, index) => {
    return +score - HCPIndexArray[index];
  });
  const toPar = netScore.slice(0, 18).map((score, index) => {
    return score - parArray[index];
  });

  console.log(toPar);
  useEffect(() => {
    if (teeValue !== "Select a tee") {
      const course = Options.find((el) => el.courseName === bindInputValue);
      if (course) {
        setIndexArray(course.index);
      }
      const calculatedHCP = calculateHCP(
        inputUserValue,
        bindInputValue,
        teeValue,
        parArray,
        1,
      );
      setHCP(Math.round(calculatedHCP));
    } else setHCP(0);
  }, [teeValue, parArray]);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (focusedInput !== null) {
      setFocusedInput(null);
    }
    setFocusedInput(e.currentTarget);
  };

  useEffect(() => {
    const newClassName = parArray.map((par, index) => {
      if (par && !isNaN(par) && scores[index] !== "") {
        const diff = par - +scores[index];
        return getClassName(diff);
      } else {
        return "";
      }
    });
    setClassName(newClassName);
  }, [parArray, scores]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newScores = [...scores];
    newScores[index] = e.currentTarget.value.replace(/^0|[^1-9\d]/, "");
    handleScores(newScores);

    const nextInput = inputRefs.current[index + 1];
    if (nextInput) {
      if (parseInt(e.currentTarget.value) > 1) {
        setTimeout(() => {
          nextInput.focus();
        }, 200);
      }
    } else {
      const firstPuttInput = document.getElementById("ptH1");
      setTimeout(() => {
        firstPuttInput && firstPuttInput.focus();
      }, 200);
    }
  };
  const scoreOut = calculateTotal(scores, 0, 8);
  const scoreIn = calculateTotal(scores, 9, 17);
  const totalScoreSum = scoreOut + scoreIn;
  const scoreHDSPOut = calculateTotal(scoreHCPArray, 0, 8);
  const scoreHDSPIn = calculateTotal(scoreHCPArray, 9, 17);
  const totalScoreHDSPSum = scoreHDSPOut + scoreHDSPIn;

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td className={styles.td_title}>SCORE</td>
          {scores.slice(0, 9).map((score, index) => {
            return (
              <td key={`scores_${index}`} className={styles.td_scores}>
                <input
                  type="text"
                  width={"100%"}
                  value={score}
                  className={className[index]}
                  id={`scH${index + 1}`}
                  onChange={(e) => handleInputChange(e, index)}
                  onFocus={(e) => handleFocus(e)}
                  ref={(ref) =>
                    (inputRefs.current[index] = ref as HTMLInputElement)
                  }
                />
              </td>
            );
          })}
          <td className={styles.td_total_scores}>
            {scoreOut === 0 ? "" : scoreOut}
          </td>
          {scores.slice(9, 18).map((score, index) => (
            <td key={`scores_1${index}`} className={styles.td_scores}>
              <input
                type="text"
                width={"100%"}
                value={score}
                className={className[index + 9]}
                id={`scH${index + 10}`}
                onFocus={(e) => handleFocus(e)}
                onChange={(e) => handleInputChange(e, index + 9)}
                ref={(ref) =>
                  (inputRefs.current[index + 9] = ref as HTMLInputElement)
                }
              />
            </td>
          ))}
          <td className={styles.td_total_scores}>
            {scoreIn === 0 ? "" : scoreIn}
          </td>
          <td className={styles.td_total_scores}>
            {totalScoreSum === 0 ? "" : totalScoreSum}
          </td>
          <td className={styles.td_total_scores}>
            {teeValue !== "Select a tee" ? HCP : ""}
          </td>
          <td className={styles.td_total_scores}>
            {totalScoreSum !== 0 && teeValue ? totalScoreSum - HCP : ""}
          </td>
        </tr>

        <tr>
          <td className={styles.td_title}>NET SCORE</td>
          {scores.slice(0, 9).map((score, index) => {
            return (
              <td key={`netScores_${index}`} className={styles.td_net_score}>
                {HCP && score ? netScore[index] : ""}
              </td>
            );
          })}
          <td className={styles.td_net_score}></td>
          {scores.slice(9, 18).map((score, index) => {
            return (
              <td key={`netScores_1${index}`} className={styles.td_net_score}>
                {HCP && score ? netScore[index] : ""}
              </td>
            );
          })}
          <td className={styles.td_net_score}></td>
          <td className={styles.td_net_score}></td>
          <td colSpan={2} className={styles.td_net_score}></td>
        </tr>

        <tr>
          <td className={styles.td_title}>STABLE FOR NET</td>
          {netScore.slice(0, 9).map((score, index) => {
            return (
              <td key={`netScores_${index}`} className={styles.td_net_score}>
                {+scores[index] !== 0 && score !== 0
                  ? Math.max(-toPar[index] + 2, 0)
                  : ""}
              </td>
            );
          })}
          <td className={styles.td_net_score}></td>
          {netScore.slice(9, 18).map((score, index) => {
            return (
              <td key={`netScores_1${index}`} className={styles.td_net_score}>
                {+scores[index + 9] !== 0 && score !== 0
                  ? Math.max(-toPar[index] + 2, 0)
                  : ""}
              </td>
            );
          })}
          <td className={styles.td_net_score}></td>
          <td className={styles.td_net_score}>
            {+scores && netScore
              ? netScore.slice(0, 18).reduce((acc, score, index) => {
                  return (
                    acc +
                    (HCP && score && netScore[index]
                      ? Math.max(-toPar[index] + 2, 0)
                      : 0)
                  );
                }, 0)
              : ""}
          </td>
          <td colSpan={2} className={styles.td_net_score}></td>
        </tr>

        <tr>
          <td
            className={styles.td_heading}
            style={{ color: "#676161", fontSize: "13px" }}
          >
            Score for hdcp purposes (Adjusted Gross Score)
          </td>
          {scores.slice(0, 9).map((_, index) => (
            <td key={`3_${index}`} className={styles.td_scores_no_border}>
              <input
                type="text"
                width={"100%"}
                defaultValue={scoreHCPArray[index]}
                id={`scH${index + 10}`}
                readOnly={true}
              />
            </td>
          ))}

          <td className={styles.td_scores_no_border}>
            {scoreHDSPOut === 0 ? "" : scoreHDSPOut}
          </td>
          {scores.slice(9, 18).map((_, index) => (
            <td key={`4_${index}`} className={styles.td_scores_no_border}>
              <input
                type="text"
                width={"100%"}
                defaultValue={scoreHCPArray[index + 9]}
                id={`scH${index + 10}`}
                readOnly={true}
              />
            </td>
          ))}
          <td className={styles.td_scores_no_border}>
            {scoreHDSPIn === 0 ? "" : scoreHDSPIn}
          </td>
          <td className={styles.td_scores_no_border}>
            {totalScoreHDSPSum === 0 ? "" : totalScoreHDSPSum}
          </td>
          <td
            className={styles.td_total_scores}
            style={{ borderRight: "none" }}
          ></td>
          <td className={styles.td_scores_no_border}></td>
        </tr>
      </tbody>
    </table>
  );
};
