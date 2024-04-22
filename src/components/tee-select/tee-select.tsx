import React from "react";
import styles from "./tee-select.module.scss";
import stylesDataSelect from "../date-select/date-select.module.scss";
type SelectPropsType = {
  value: string;
  title: string;
  onChange: (value: string) => void;
  teeArray: string[];
};

export const TeeSelect: React.FC<SelectPropsType> = ({
  onChange,
  value,
  title,
  teeArray,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <div className={styles.container_teeSelect}>
      <div className={styles.col}>
        <label>{title}:</label>
        <div className={styles.col}>
          <div className={styles.row}>
            <select
              name={title}
              id={title}
              defaultValue={value}
              className={stylesDataSelect.select}
              onChange={handleChange}
            >
              <option className={styles.hidden}>{"Select a tee"}</option>
              {teeArray.map((el, index) => {
                return (
                  <option
                    key={`teeSelect_${index}`}
                    className={stylesDataSelect.items}
                  >
                    {el}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <a href="https://thegrint.com/course_uploader" className={styles.link}>
          Scorecard data needs update?
        </a>
      </div>
    </div>
  );
};
