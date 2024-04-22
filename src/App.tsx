import { ContainerInputs } from "@/features/container-inputs/container-inputs";
import styles from "./app.module.scss";
import CardWithTables from "@/features/card-with-tables/card-with-tables";
import { createContext, useState } from "react";
import ExtraInfo from "@/features/extra-info/extra-info";
import { Upload } from "@/features/upload/upload";
import TableAutomaticStats from "@/components/tables/table-automatic-stats";

type TablesContextType = {
  bindInputValue: string;
  setBindInputValue: (value: string) => void;
  teeValue: string;
  setTeeValue: (value: string) => void;
  focusedInput: HTMLInputElement | null;
  setFocusedInput: (input: HTMLInputElement | null) => void;
  parArray: number[];
  setParArray: (value: number[]) => void;
  scores: string[];
  setScores: (value: string[]) => void;
  putts: string[];
  setPutts: (value: string[]) => void;
  penalties: string[];
  setPenalties: (value: string[]) => void;
  inputUserValue: string;
  setInputUserValue: (value: string) => void;
};

export const TablesContext = createContext<TablesContextType>({
  bindInputValue: "",
  setBindInputValue: () => {},
  teeValue: "",
  setTeeValue: () => {},
  focusedInput: null,
  setFocusedInput: () => {},
  parArray: [],
  setParArray: () => {},
  scores: [],
  setScores: () => {},
  putts: [],
  setPutts: () => {},
  penalties: [],
  setPenalties: () => {},
  inputUserValue: "",
  setInputUserValue: () => {},
});
function App() {
  const [bindInputValue, setBindInputValue] = useState<string>("");
  const [teeValue, setTeeValue] = useState<string>("");
  const [focusedInput, setFocusedInput] = useState<HTMLInputElement | null>(
    null,
  );
  const [parArray, setParArray] = useState<number[]>(Array(18).fill(""));

  const [scores, setScores] = useState<string[]>(Array(18).fill(""));
  const [putts, setPutts] = useState<string[]>(Array(18).fill(""));
  const [penalties, setPenalties] = useState<string[]>(Array(18).fill(""));
  const [inputUserValue, setInputUserValue] = useState("");
  return (
    <>
      <div className={styles.body_container}>
        <div className={styles.line_green}></div>
        <TablesContext.Provider
          value={{
            teeValue,
            bindInputValue,
            focusedInput,
            parArray,
            scores,
            putts,
            penalties,
            inputUserValue,
            setParArray,
            setScores,
            setPutts,
            setPenalties,
            setTeeValue,
            setBindInputValue,
            setFocusedInput,
            setInputUserValue,
          }}
        >
          <ContainerInputs />
          <CardWithTables />
          <ExtraInfo />
          <Upload />
          <TableAutomaticStats />
        </TablesContext.Provider>
      </div>
    </>
  );
}

export default App;
