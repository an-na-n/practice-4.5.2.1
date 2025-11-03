export interface WorkFormat {
  id: "REMOTE" | "ON_SITE" | "HYBRID" | string;
  name: string;
}

export interface Vacancy {
  id: string;
  name: string;
  area: { name: string };
  employer: { name: string };
  salary: { from?: number; to?: number; currency?: string } | null;
  experience: { name: string };
  work_format: WorkFormat[];
  alternate_url: string;
  snippet: { requirement: string; responsibility: string };
}

export interface VacancyResponse {
  items: Vacancy[];
  found: number;
  pages: number;
}
