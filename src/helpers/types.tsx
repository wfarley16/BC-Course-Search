export type Subject = {
  subjectName: string;
  subjectCode: string;
};

export type School = {
  schoolCode: string;
  schoolName: string;
  subjectList: Array<Subject>;
};

export type Course = {
  title: string;
  code: string;
  alert?: 'OPEN' | 'CLOSED' | 'CANCELLED';
  start?: number;
  end?: number;
  url?: string;
  corequisites?: string;
  courseIndex?: string;
  credits?: number;
  crossListings?: string;
  day?: Array<string>;
  department?: string;
  description?: string;
  faculties?: Array<string>;
  time?: Array<string>;
};

export type Filter = {
  id: number;
  label: string;
  type: 'input' | 'checkbox' | 'single' | 'multi';
  attachedValue: string | Array<string>;
  options?: Array<string>;
};

export type DropDownOptions = {
  id: number;
  value: string;
  text: string;
};

export type Review = {
  id: number;
  postedBy: string;
  title: string;
  body: string;
};
