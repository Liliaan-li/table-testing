import { ChangeEvent, useRef, useState, MouseEvent, RefObject } from "react";
import { Option, PeopleOption } from "@/utils/types/types";

type UseAutoCompleteParams = {
  delay?: number;
  source: (search: string) => Option[] | PeopleOption[];
  onChange: (value: string) => void;
};
type UseAutoCompleteReturn = {
  bindOption: {
    onClick: (e: MouseEvent<HTMLLIElement>) => void;
  };
  bindInput: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
  };
  bindOptions: {
    ref: RefObject<HTMLUListElement>;
  };
  suggestions: Option[] | PeopleOption[];
};
type UseAutoComplete = (params: UseAutoCompleteParams) => UseAutoCompleteReturn;

export const useAutoComplete: UseAutoComplete = ({
  delay = 500,
  source,
  onChange,
}) => {
  const [myTimeout, setMyTimeOut] = useState(setTimeout(() => {}, 0));
  const listRef = useRef<HTMLUListElement>(null);
  const [suggestions, setSuggestions] = useState<Option[] | PeopleOption[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [textValue, setTextValue] = useState<string>("");

  function delayInvoke(cb: () => void) {
    if (myTimeout) {
      clearTimeout(myTimeout);
    }
    setMyTimeOut(setTimeout(cb, delay));
  }

  function selectOption(index: number) {
    if (index > -1) {
      onChange(suggestions[index].label);
      setTextValue(suggestions[index].label);
      const activeIndex = source("").findIndex(
        (el) => el.label === suggestions[index].label,
      );
      setSelectedIndex(activeIndex);
    }
    clearSuggestions();
  }

  async function getSuggestions(searchTerm: string) {
    if (searchTerm && source) {
      const options = await source(searchTerm);
      setSuggestions(options);
    }
  }

  function clearSuggestions() {
    setSuggestions([]);
  }

  function onTextChange(searchTerm: string) {
    setTextValue(searchTerm);
    clearSuggestions();
    delayInvoke(() => getSuggestions(searchTerm));
  }

  return {
    bindOption: {
      onClick: (e: MouseEvent<HTMLLIElement>) => {
        if (listRef.current) {
          const nodes = Array.from(listRef.current.children);
          selectOption(
            nodes.indexOf((e.target as Element).closest("li") as HTMLElement),
          );
        }
      },
    },
    bindInput: {
      value: textValue,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onTextChange(e.target.value),
      onFocus: () => {
        if (selectedIndex > -1) {
          setTextValue("");
        }
      },
      onBlur: () => {
        if (selectedIndex !== -1) {
          setTextValue(source("")[selectedIndex]?.label || "");
        }
      },
    },
    bindOptions: {
      ref: listRef,
    },
    suggestions,
  };
};
