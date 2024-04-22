import { forwardRef, ChangeEvent, ComponentPropsWithoutRef } from "react";
import styles from "./input.module.scss";
type InputPropsType = {
  inputValue?: string;
  onChangeValue?: (value: string) => void;
  title?: string;
  placeholder?: string;
} & ComponentPropsWithoutRef<"input">;
export const Input = forwardRef<HTMLInputElement, InputPropsType>(
  ({ inputValue, onChangeValue, title, placeholder, ...rest }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeValue?.(e.target.value);
    };
    return (
      <div>
        <div className={styles.row}>
          <div className={styles.col}>
            <label>{title}:</label>
          </div>
        </div>

        <input
          placeholder={placeholder}
          className={styles.input}
          type={"text"}
          value={inputValue}
          onChange={handleChange}
          ref={ref}
          {...rest}
        />
      </div>
    );
  },
);
