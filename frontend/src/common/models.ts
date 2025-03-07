export interface User {
  id: string;
  name: string;
}
export interface Break {
  id: number;
  in: Date;
  out: Date;
}
export interface Attendance {
  date: Date;
  workIn: Date | null;
  workOut: Date | null;
  breakingHours: number;
  workingHours: number;
  remark: string;
}
export interface TimecardData {
  workIn: Date | null;
  workOut: Date | null;
  breakIn: Date[];
  breakOut: Date[];
}

export const users: User[] = [
  { id: "0001", name: "Yuichi Yamada" },
  { id: "0002", name: "Hiroko Yoshii" },
  { id: "0003", name: "Junpei Hirano" },
  { id: "0004", name: "Kyoko Awaji" },
  { id: "0005", name: "Ichiro Bingo" },
];

export const attendance: Attendance = {
  date: new Date(),
  workIn: null,
  workOut: null,
  breakingHours: 0.0,
  workingHours: 8.0,
  remark: "",
};

export const initialTimeCard: TimecardData = {
  workIn: null,
  workOut: null,
  breakIn: [],
  breakOut: [],
};
