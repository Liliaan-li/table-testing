import {Courses, Option} from "@/utils/types/types";

export const getCourseOptions = (courses: Courses[]): Option[] => {
  return courses.map((el) => ({
    label: el.courseName,
    value: el.value,
    place: el.place
  }));
};
