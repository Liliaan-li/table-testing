import { useState } from "react";
import { DateSelect } from "@/components/date-select/date-select";
import styles from "./container-date-selects.module.scss";
export const ContainerDateSelects = () => {
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const [valueYear, setValueYear] = useState(currentYear);
  const [valueMonth, setValueMonth] = useState(currentMonth);
  const [valueDay, setValueDay] = useState(currentDay);

  const years = [];
  for (let i = 2000; i <= currentYear; i++) {
    years.push(i);
  }
  const month = [];
  for (let i = 1; i <= 12; i++) {
    month.push(i);
  }
  const days = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  return (
    <div className={styles.container_dateSelects}>
      <div className={styles.row}>
        <div className={styles.col}>
          <label>Date:</label>
        </div>
      </div>
      <div className={styles.row}>
        <DateSelect
          options={years}
          onChange={setValueYear}
          value={valueYear}
          name={"year"}
        />
        <DateSelect
          options={month}
          onChange={setValueMonth}
          value={valueMonth}
          name={"month"}
        />
        <DateSelect
          options={days}
          onChange={setValueDay}
          value={valueDay}
          name={"day"}
        />
      </div>
    </div>
  );
};
