import React, { useContext, useEffect } from "react";
import { useAutoComplete } from "@/utils/hooks/useAutoComplete";
import styles from "./select-course.module.scss";
import { Options } from "@/utils/constants/courses-options";
import { getCourseOptions } from "@/components/select-course/utils";
import { TablesContext } from "@/App";
import { Input } from "@/components/input/input";

type SelectCoursePropsType = {
  onChangeValue: (value: string) => void;
};

export const SelectCourse: React.FC<SelectCoursePropsType> = ({
  onChangeValue,
}) => {
  const options = getCourseOptions(Options);
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
          <Input
            placeholder={"Type golf course name... "}
            {...bindInput}
            title={"Course"}
          />
          <ul {...bindOptions} className={styles.options_container}>
            {suggestions.map((_, index) => (
              <li key={index} {...bindOption} className={styles.suggestion}>
                <div>
                  <div>{suggestions[index].label}</div>
                  <div>{suggestions[index].place}</div>
                </div>
              </li>
            ))}
          </ul>
          <a
            href="https://thegrint.com/course_uploader"
            className={styles.link}
          >
            Can't find a golf course?
          </a>
        </div>
      </div>
    </>
  );
};
