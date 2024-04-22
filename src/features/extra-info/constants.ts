type Keys =
  | ""
  | "farLeft"
  | "farRight"
  | "left"
  | "right"
  | "hit"
  | "miss"
  | "missedEx"
  | "missLong";
export const keyHandlers: Record<
  string,
  (
    newTeeAccuracies: string[],
    changedKeysAccuracies: Keys[],
    nextInput: HTMLElement | null,
    index: number,
    setTeeAccuracy: (newAccuracies: string[]) => void,
    setKeyAccuracy: React.Dispatch<React.SetStateAction<Keys[]>>,
  ) => void
> = {
  Shift_KeyL: (
    newTeeAccuracies,
    changedKeysAccuracies,
    nextInput,
    index,
    setTeeAccuracy,
    setKeyAccuracy,
  ) => {
    newTeeAccuracies[index] = "7";
    setTeeAccuracy(newTeeAccuracies);

    changedKeysAccuracies[index] = "farLeft";
    setKeyAccuracy(changedKeysAccuracies);
    if (nextInput) {
      setTimeout(() => {
        nextInput.focus();
      }, 200);
    }
  },
  Shift_KeyR: (
    newTeeAccuracies,
    changedKeysAccuracies,
    nextInput,
    index,
    setTeeAccuracy,
    setKeyAccuracy,
  ) => {
    newTeeAccuracies[index] = "8";
    setTeeAccuracy(newTeeAccuracies);

    changedKeysAccuracies[index] = "farRight";
    setKeyAccuracy(changedKeysAccuracies);
    if (nextInput) {
      setTimeout(() => {
        nextInput.focus();
      }, 200);
    }
  },
  ArrowLeft: (
    newTeeAccuracies,
    changedKeysAccuracies,
    nextInput,
    index,
    setTeeAccuracy,
    setKeyAccuracy,
  ) => {
    newTeeAccuracies[index] = "1";
    setTeeAccuracy(newTeeAccuracies);

    changedKeysAccuracies[index] = "left";
    setKeyAccuracy(changedKeysAccuracies);
    if (nextInput) {
      setTimeout(() => {
        nextInput.focus();
      }, 200);
    }
  },
  KeyL: (
    newTeeAccuracies,
    changedKeysAccuracies,
    nextInput,
    index,
    setTeeAccuracy,
    setKeyAccuracy,
  ) => {
    newTeeAccuracies[index] = "1";
    setTeeAccuracy(newTeeAccuracies);

    changedKeysAccuracies[index] = "left";
    setKeyAccuracy(changedKeysAccuracies);
    if (nextInput) {
      setTimeout(() => {
        nextInput.focus();
      }, 200);
    }
  },
  ArrowRight: (
    newTeeAccuracies,
    changedKeysAccuracies,
    nextInput,
    index,
    setTeeAccuracy,
    setKeyAccuracy,
  ) => {
    newTeeAccuracies[index] = "2";
    setTeeAccuracy(newTeeAccuracies);

    changedKeysAccuracies[index] = "right";
    setKeyAccuracy(changedKeysAccuracies);
    if (nextInput) {
      setTimeout(() => {
        nextInput.focus();
      }, 200);
    }
  },
  KeyR: (
    newTeeAccuracies,
    changedKeysAccuracies,
    nextInput,
    index,
    setTeeAccuracy,
    setKeyAccuracy,
  ) => {
    newTeeAccuracies[index] = "2";
    setTeeAccuracy(newTeeAccuracies);

    changedKeysAccuracies[index] = "right";
    setKeyAccuracy(changedKeysAccuracies);
    if (nextInput) {
      setTimeout(() => {
        nextInput.focus();
      }, 200);
    }
  },
  ArrowUp: (
    newTeeAccuracies,
    changedKeysAccuracies,
    nextInput,
    index,
    setTeeAccuracy,
    setKeyAccuracy,
  ) => {
    newTeeAccuracies[index] = "3";
    setTeeAccuracy(newTeeAccuracies);

    changedKeysAccuracies[index] = "hit";
    setKeyAccuracy(changedKeysAccuracies);
    if (nextInput) {
      setTimeout(() => {
        nextInput.focus();
      }, 200);
    }
  },
  KeyH: (
    newTeeAccuracies,
    changedKeysAccuracies,
    nextInput,
    index,
    setTeeAccuracy,
    setKeyAccuracy,
  ) => {
    newTeeAccuracies[index] = "3";
    setTeeAccuracy(newTeeAccuracies);

    changedKeysAccuracies[index] = "hit";
    setKeyAccuracy(changedKeysAccuracies);
    if (nextInput) {
      setTimeout(() => {
        nextInput.focus();
      }, 200);
    }
  },
  ArrowDown: (
    newTeeAccuracies,
    changedKeysAccuracies,
    nextInput,
    index,
    setTeeAccuracy,
    setKeyAccuracy,
  ) => {
    newTeeAccuracies[index] = "4";
    setTeeAccuracy(newTeeAccuracies);

    changedKeysAccuracies[index] = "miss";
    setKeyAccuracy(changedKeysAccuracies);
    if (nextInput) {
      setTimeout(() => {
        nextInput.focus();
      }, 200);
    }
  },
  KeyS: (
    newTeeAccuracies,
    changedKeysAccuracies,
    nextInput,
    index,
    setTeeAccuracy,
    setKeyAccuracy,
  ) => {
    newTeeAccuracies[index] = "4";
    setTeeAccuracy(newTeeAccuracies);

    changedKeysAccuracies[index] = "miss";
    setKeyAccuracy(changedKeysAccuracies);
    if (nextInput) {
      setTimeout(() => {
        nextInput.focus();
      }, 200);
    }
  },
  KeyX: (
    newTeeAccuracies,
    changedKeysAccuracies,
    nextInput,
    index,
    setTeeAccuracy,
    setKeyAccuracy,
  ) => {
    newTeeAccuracies[index] = "5";
    setTeeAccuracy(newTeeAccuracies);

    changedKeysAccuracies[index] = "missedEx";
    setKeyAccuracy(changedKeysAccuracies);
    if (nextInput) {
      setTimeout(() => {
        nextInput.focus();
      }, 200);
    }
  },
  KeyP: (
    newTeeAccuracies,
    changedKeysAccuracies,
    nextInput,
    index,
    setTeeAccuracy,
    setKeyAccuracy,
  ) => {
    newTeeAccuracies[index] = "6";
    setTeeAccuracy(newTeeAccuracies);

    changedKeysAccuracies[index] = "missLong";
    setKeyAccuracy(changedKeysAccuracies);
    if (nextInput) {
      setTimeout(() => {
        nextInput.focus();
      }, 200);
    }
  },
  Backspace: (
    newTeeAccuracies,
    changedKeysAccuracies,
    nextInput,
    index,
    setTeeAccuracy,
    setKeyAccuracy,
  ) => {
    newTeeAccuracies[index] = "";
    changedKeysAccuracies[index] = "";
    setTeeAccuracy(newTeeAccuracies);
    setKeyAccuracy(changedKeysAccuracies);
  },
  Delete: (
    newTeeAccuracies,
    changedKeysAccuracies,
    nextInput,
    index,
    setTeeAccuracy,
    setKeyAccuracy,
  ) => {
    // Обработка события стирания
    newTeeAccuracies[index] = "";
    changedKeysAccuracies[index] = "";
    setTeeAccuracy(newTeeAccuracies);
    setKeyAccuracy(changedKeysAccuracies);
  },
};
