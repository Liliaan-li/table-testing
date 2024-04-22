import styles from "./upload.module.scss";

export const Upload = () => {
  return (
    <div className={styles.row}>
      <div className={styles.upload_container}>
        <a
          href="https://thegrint.com/score"
          className={styles.tg_button_cancel}
        >
          Cancel
        </a>
        <a href="#" className={styles.tg_button_submit}>
          Submit
        </a>
        <span
          id="score-message"
          className={styles.tg_button_submit}
          style={{ display: "none" }}
        >
          Saving
          <i
            className={`${styles.fa} ${styles.fa_refresh} ${styles.fa_spin} ${styles.fa_fw}`}
          ></i>
        </span>
        <p className={styles.issues} style={{ fontSize: "12px" }}>
          Having issues uploading your scores? Let us know at{" "}
          <a href="mailto:contactus@thegrint.com">contactus@thegrint.com</a>
        </p>
      </div>
    </div>
  );
};
