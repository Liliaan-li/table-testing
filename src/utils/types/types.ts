export type Option = {
  label: string;
  value: string;
  place?:string
};

type TeeOptions = {
  tee: string;
  slope: number;
  rating: number;
};
export type Courses = {
  value: string;
  courseName: string;
  place: string;
  teeOptions: TeeOptions[];
};

export type People = {
  value: string;
  name: string;
  handicap: number;
};

