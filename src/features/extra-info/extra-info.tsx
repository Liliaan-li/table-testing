import { useContext, useState } from "react";
import Checkbox from "@/components/checkbox/checkbox";
import styles from "./extra-info.module.scss";
import { TablesContext } from "@/App";
import albatross from "@/assets/images/scorecard/albatross.png";
import parBirdie from "@/assets/images/scorecard/parBirdie.png";
import parEagle from "@/assets/images/scorecard/parEagle.png";
import parBogey from "@/assets/images/scorecard/parBogey.png";
import parDoubleBogey from "@/assets/images/scorecard/parDoubleBogey.png";
import parMoreDoubleBogey from "@/assets/images/scorecard/parMoreDoubleBogey.png";
const ExtraInfo = () => {
  const [practiceValue, setPracticeValue] = useState<boolean>(false);
  const [tournamentValue, setTournamentValue] = useState<boolean>(false);
  const [privateValue, setPrivateValue] = useState<boolean>(false);

  const { focusedInput } = useContext(TablesContext);
  return (
    <div className={styles.container_extraInfo}>
      <div className={styles.info_container}>
        <div className={styles.infoBar}>
          <div
            className={`${styles.info} ${
              focusedInput?.id?.includes("scH") ? styles.info_active : ""
            }`}
          >
            <ul className={`${styles.style_ul} ${styles.float_left}`}>
              <li>
                <img src={albatross} alt="Albatross" /> = Albatross
              </li>
              <li>
                <img src={parEagle} alt="Eagle" /> = Eagle
              </li>
              <li>
                <img src={parBirdie} alt="Birdie" /> = Birdie
              </li>
              <li> = Par</li>
            </ul>
            <ul className={`${styles.style_ul} ${styles.float_left}`}>
              <li>
                <img src={parBogey} alt="Bogey" /> = Bogey
              </li>
              <li>
                <img src={parDoubleBogey} alt="parDoubleBogey" /> = D.Bogey
              </li>
              <li>
                <img src={parMoreDoubleBogey} alt="parMoreDoubleBogey" /> =
                +D.Bogey
              </li>
            </ul>
          </div>

          <div
            className={`${styles.info} ${
              focusedInput?.id?.includes("ptH") ? styles.info_active : ""
            }`}
          >
            Putts: Enter how many putts you took once you were inside the green.
          </div>

          <div
            className={`${styles.info} ${
              focusedInput?.id?.includes("penH") ? styles.info_active : ""
            }`}
          >
            <div>Penalties:</div>
            <ul className={`${styles.style_ul} ${styles.float_left}`}>
              <li>
                <b>W</b>=Penalty area
              </li>
              <li>
                <b>D</b>=Drop shot
              </li>
              <li>
                <b>O</b>=Out of bounds
              </li>
              <li>
                <b>S</b>=Greenside Bunker
              </li>
              <li>
                <b>F</b>=Fairway Bunker
              </li>
            </ul>
          </div>

          <div
            className={`${styles.info} ${
              focusedInput?.id?.includes("teeAcH") ? styles.info_active : ""
            }`}
          >
            <div className={styles.clearfix}>
              <div className={styles.float_left}>
                Use the arrow keys:
                <ul className={styles.style_ul}>
                  <li>
                    <b>up</b>=hit fairway
                  </li>
                  <li>
                    <b>left</b>=missed left
                  </li>
                  <li>
                    <b>right</b>=missed right
                  </li>
                  <li>
                    <b>down</b>=missed short
                  </li>
                </ul>
              </div>

              <div className={styles.float_left}>
                Or use letters:
                <ul className={styles.style_ul}>
                  <li>
                    <b>H</b> = hit fairway
                  </li>
                  <li>
                    <b>L</b> = missed left
                  </li>
                  <li>
                    <b>R</b> = missed right
                  </li>
                  <li>
                    <b>S</b> = missed short
                  </li>
                  <li>
                    <b>P</b> = missed long
                  </li>
                  <li>
                    <b>X</b> = missed
                  </li>
                </ul>
              </div>

              <div className={styles.float_left}>
                Or use combinated shift + arrow or letter:
                <ul className={styles.style_ul}>
                  <li>
                    <b>Shift + L</b> = far left
                  </li>
                  <li>
                    <b>Shift + left</b> = far left
                  </li>
                  <li>
                    <b>Shift + R</b> = far right
                  </li>
                  <li>
                    <b>Shift + Right</b> = far right
                  </li>
                </ul>
              </div>
            </div>
            NOTE: Cells left blank will not count toward statistics.
          </div>
        </div>
      </div>
      <div className={styles.col_19}>
        <Checkbox
          onChange={setPracticeValue}
          checked={practiceValue}
          name={"practice_score"}
          label={"Practice / Offseason Round"}
          disabled={tournamentValue}
        />
        <div className={styles.note}>
          <span>This round will not count towards your handicap.</span>
          <span>
            <b>Note: </b>
            Rounds played alone should be marked as practice
          </span>
        </div>
      </div>
      <div className={styles.col_19}>
        <Checkbox
          onChange={setTournamentValue}
          checked={tournamentValue}
          name={"club_tournament"}
          label={"Tournament Score"}
          disabled={practiceValue}
        />
      </div>
      <div>
        <Checkbox
          onChange={setPrivateValue}
          checked={privateValue}
          name={"private_score"}
          label={"Private Score Upload"}
        />
      </div>
    </div>
  );
};

export default ExtraInfo;
