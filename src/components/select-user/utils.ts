import {Option, People} from "@/utils/types/types";

export const getUserOptions = (users: People[]): Option[] => {
  return users.map((el) => ({
    label: el.name,
    value:el.value,
  }));
};
