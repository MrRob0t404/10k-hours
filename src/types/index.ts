export interface Session {
  date: Date;
  duration: number;
}

export interface Skill {
  id: number;
  name: string;
  totalHours: number;
  goalHours: number;
  sessions: Session[];
} 