export interface Job {
  id?: string;
  title: string;
  company: string;
  description: string;
  link: string;
  location: string;
  salary?: string;
  date: Date;
}
