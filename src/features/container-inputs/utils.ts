import { Options } from "@/utils/constants/courses-options";

export function getTeeArray(courseName: string) {
  const course = Options.find((option) => option.courseName === courseName);
  if (course) {
    return course.teeOptions.map((option) => option.tee);
  } else {
    return [];
  }
}
