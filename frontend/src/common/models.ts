export interface User {
  id: string;
  name: string;
  password?: string;
}

export interface Attendance {
  id: number;
  date: Date;
  workIn: Date | null;
  workOut: Date | null;
  breakIn: Date | null;
  breakOut: Date | null;
  workingHours: number;
  remark: string;
}
export interface TimecardData {
  id: number;
  workIn: Date | null;
  workOut: Date | null;
  breakIn: Date | null;
  breakOut: Date | null;
}

export const initialTimeCard: TimecardData = {
  id: 1,
  workIn: null,
  workOut: null,
  breakIn: null,
  breakOut: null,
};
export const API_HOST = "http://localhost:8000/";
