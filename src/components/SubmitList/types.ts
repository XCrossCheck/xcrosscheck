export interface ISubmit {
  id: string;
  taskName: string;
  studentGithubId: string;
  status: string;
}

export interface IFilters {
  tasks: string[];
  students: string[];
  statuses: string[];
}
