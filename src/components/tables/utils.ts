import styles from "@/components/tables/tables-common.module.scss";
import { People } from "@/utils/constants/people";
import { Options } from "@/utils/constants/courses-options";

export const calculateTotal = (
  array: (number | string)[],
  start: number,
  end: number,
): number => {
  return array
    .slice(start, end + 1)
    .reduce((total: number, score: number | string) => {
      if (typeof score === "number") {
        return total + score;
      } else {
        const numericScore = parseFloat(String(score));
        return isNaN(numericScore) ? total : total + numericScore;
      }
    }, 0);
};
export const calculatePercentage = (
  array: (1 | 0 | null)[],
  start: number,
  end: number,
) => {
  const totalItems = array
    .slice(start, end)
    .filter((value) => value !== null).length;
  const numHits = array.slice(start, end).filter((value) => value === 1).length;
  return totalItems > 0 ? Math.round((numHits / totalItems) * 100) : 0;
};
export const calculatePercentageTeeAccuracy = (
  array: string[],
  start: number,
  end: number,
) => {
  const totalItems = array
    .slice(start, end)
    .filter((value) => value !== "").length;
  const numHits = array
    .slice(start, end)
    .filter((value) => value === "hit").length;
  return totalItems > 0 ? Math.round((numHits / totalItems) * 100) : 0;
};
export const calculatePenalties = (arr: string[]) => {
  const letterValues: { [key: string]: number } = {
    W: 1,
    D: 1,
    O: 2,
    S: 0.5,
    F: 0.5,
  };
  return arr.reduce((total, str) => {
    let currentSum = 0;
    for (const char of str) {
      currentSum += letterValues[char.toUpperCase()] || 0;
    }
    return total + currentSum;
  }, 0);
};
export function getClassName(scoreDiff: number): string {
  switch (true) {
    case scoreDiff >= 3:
      return styles.albatross;
    case scoreDiff === 1:
      return styles.parBirdie;
    case scoreDiff === 2:
      return styles.parEagle;
    case scoreDiff === -1:
      return styles.parBogey;
    case scoreDiff === -2:
      return styles.parDoubleBogey;
    case scoreDiff <= -3:
      return styles.parMoreDoubleBogey;
    default:
      return "";
  }
}

export const setTeeStyle = (
  teeValue: string,
): { color: string; backgroundColor: string } => {
  switch (teeValue) {
    case "Red":
      return { color: "white", backgroundColor: "#c00000" };
    case "Yellow":
      return { color: "#383838", backgroundColor: "#ffff00" };
    case "White":
      return { color: "#383838", backgroundColor: "white" };
    case "Black":
      return { color: "white", backgroundColor: "#404040" };
    case "Blue":
      return { color: "white", backgroundColor: "#376092" };
    case "Light Green":
      return { color: "#383838", backgroundColor: "#9ecd3a" };
    case "Gold":
      return { color: "white", backgroundColor: "#ad7e01" };
    case "Dark Green":
      return { color: "white", backgroundColor: "#4c6615" };
    case "Aqua":
      return { color: "#383838", backgroundColor: "aqua" };
    default:
      return { color: "", backgroundColor: "" };
  }
};

export const calculateHCP = (
  inputUserValue: string,
  courseName: string,
  tee: string,
  parArray: number[],
  allowance: number,
) => {
  const userHandicap =
    inputUserValue === ""
      ? 15
      : People.find((el) => el.name === inputUserValue)!.handicap;
  const slope = getSlopeTee(courseName, tee);
  const rating = getRatingTee(courseName, tee);
  const par = parArray.reduce((acc, curr) => acc + curr, 0);

  return (userHandicap * (slope! / 113) + (rating! - par)) * allowance;
};

export function getSlopeTee(courseName: string, tee: string) {
  const course = Options.find((option) => option.courseName === courseName);
  if (course) {
    const teeOption = course.teeOptions.find((option) => option.tee === tee);
    if (teeOption) {
      return teeOption.slope;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
export function getRatingTee(courseName: string, tee: string) {
  const course = Options.find((option) => option.courseName === courseName);
  if (course) {
    const teeOption = course.teeOptions.find((option) => option.tee === tee);
    if (teeOption) {
      return teeOption.rating;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
export function fillHCPIndexArray(indexArray: number[], HCP: number) {
  const newArray = new Array(18).fill(0);

  for (let i = 0; i < indexArray.length; i++) {
    if (indexArray[i] <= HCP) {
      newArray[i] = 1;
    } else {
      newArray[i] = 0;
    }
  }

  if (HCP > 18) {
    newArray.fill(1);
    HCP = HCP - 18;
    for (let i = 0; i < indexArray.length; i++) {
      if (indexArray[i] <= HCP) {
        newArray[i] += 1;
      }
    }
  }

  return newArray;
}

export function fillScoreHDCPArray(
  parArray: number[],
  HCPIndexArray: number[],
  score: string[],
) {
  const HDCPArray = new Array(18).fill(null);
  for (let i = 0; i < HDCPArray.length; i++) {
    if (parArray[i] + HCPIndexArray[i] + 2 >= +score[i]) {
      HDCPArray[i] = score[i];
    } else {
      HDCPArray[i] = parArray[i] + HCPIndexArray[i] + 2;
    }
  }
  return HDCPArray;
}
