import { People, PeopleOption } from "@/utils/types/types";

export const getUserOptions = (users: People[]): PeopleOption[] => {
  return users.map((el) => ({
    label: el.name,
    handicap: el.handicap,
  }));
};
