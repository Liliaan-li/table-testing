import styles from "./date-select.module.scss";

type SelectPropsType = {
  value: number;
  name: string;
  options: number[];
  onChange: (value: number) => void;
};
export const DateSelect: React.FC<SelectPropsType> = ({
  options,
  onChange,
  value,
  name,
}) => {
  const editNumber = (number: number) => (number < 10 ? "0" + number : number);

  const onItemClick = (value: number) => {
    onChange(value);
  };

  return (
    <div className={`${styles.col} ${styles.mr1}`}>
      <select
        name={name}
        id={name}
        defaultValue={editNumber(value)}
        className={styles.select}
      >
        {options.map((el) => {
          return (
            <option
              key={el}
              className={styles.item}
              onClick={() => onItemClick(el)}
              disabled={el > value}
            >
              {editNumber(el)}
            </option>
          );
        })}
      </select>
    </div>
  );
};
