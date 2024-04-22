import { useContext, useEffect, useState } from "react";
import { ContainerDateSelects } from "@/features/container-inputs/container-date-selects/container-date-selects";
import { SelectCourse } from "@/components/select-course/select-course";
import style from "./container-inputs.module.scss";
import { TeeSelect } from "@/components/tee-select/tee-select";
import { TablesContext } from "@/App";
import { SelectUser } from "@/components/select-user/select-user";
import { getTeeArray } from "@/features/container-inputs/utils";
export const ContainerInputs = () => {
  const [inputValueCourse, setInputValueCourse] = useState("");

  const { setTeeValue, setInputUserValue } = useContext(TablesContext);

  const teeArray = getTeeArray(inputValueCourse);
  const [teeSelect, setTeeSelect] = useState("Select a tee");

  useEffect(() => {
    setTeeValue(teeSelect);
  }, [teeSelect, setTeeValue]);
  return (
    <div className={style.main_inputsContainer}>
      <div className={style.wrapper}>
        <ContainerDateSelects />
        <SelectUser onChangeValue={setInputUserValue} />
        <SelectCourse onChangeValue={setInputValueCourse} />
        <TeeSelect
          onChange={setTeeSelect}
          value={teeSelect}
          title={"Tee"}
          teeArray={teeArray ? teeArray : []}
        />
      </div>
    </div>
  );
};
