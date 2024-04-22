import React, { useContext, useEffect } from "react";
import { useAutoComplete } from "@/utils/hooks/useAutoComplete";
import styles from "../select-course/select-course.module.scss";
import { TablesContext } from "@/App";
import { Input } from "@/components/input/input";
import { getUserOptions } from "@/components/select-user/utils";
import { People } from "@/utils/constants/people";

type SelectCoursePropsType = {
  onChangeValue: (value: string) => void;
};

export const SelectUser: React.FC<SelectCoursePropsType> = ({
  onChangeValue,
}) => {
  const options = getUserOptions(People);
  const { bindInput, bindOptions, bindOption, suggestions } = useAutoComplete({
    onChange: (value: string) => onChangeValue(value),
    source: (search: string) =>
      options.filter((option) =>
        new RegExp(`${search}`, "i").test(option.label),
      ),
  });

  const { setBindInputValue } = useContext(TablesContext);
  useEffect(() => {
    setBindInputValue(bindInput.value);
  }, [bindInput, setBindInputValue]);

  return (
    <>
      <div className={styles.container_coursesSelect}>
        <div className={styles.auto_wrap}>
          <Input {...bindInput} title={"User"} />
          <ul {...bindOptions} className={styles.options_container}>
            {suggestions.map((_, index) => (
              <li key={index} {...bindOption} className={styles.suggestion}>
                <div>
                  <div>{suggestions[index].label}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
