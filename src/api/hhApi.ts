import type { VacancyResponse } from "./types";

const BASE_URL = "https://api.hh.ru/vacancies";

export async function fetchVacancies(params: {
  page: number;
  skills: string[];
  search: string;
  city: string;
}): Promise<VacancyResponse> {
  const { page, skills, search, city } = params;

  const area =
    city === "Москва" ? 1 : city === "Санкт-Петербург" ? 2 : undefined;

  const query = new URLSearchParams({
    text: search,
    per_page: "10",
    page: (page - 1).toString(),
    industry: "7",
    professional_role: "96",
    ...(area ? { area: area.toString() } : {}),
    ...(skills.length ? { skill_set: skills.join(",") } : {}),
  });

  const res = await fetch(`${BASE_URL}?${query.toString()}`);
  if (!res.ok) throw new Error("Ошибка при загрузке данных");
  return res.json();
}
