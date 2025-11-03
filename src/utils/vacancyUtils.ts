import type { Vacancy } from "../api/types";

export const formatNumber = (num?: number) => {
  if (!num) return "";
  return new Intl.NumberFormat("ru-RU").format(num);
};

export const formatCurrency = (currencyName?: string) => {
  if (currencyName?.includes("RUR")) return "₽";
  if (currencyName?.includes("KZT")) return "₸";
  if (currencyName?.includes("USD")) return "$";
  return currencyName;
};

export const formatSalary = (vacancy: Vacancy) => {
  const salary = vacancy.salary;
  if (!salary) return "Не указана";

  const from = salary.from ? `${formatNumber(salary.from)}` : "";
  const to = salary.to ? `${formatNumber(salary.to)}` : "";
  const currency = formatCurrency(salary.currency) || "";

  if (from && to) return `${from} – ${to} ${currency}`.trim();
  if (!from && to) return `До ${to} ${currency}`.trim();
  if (from && !to) return `От ${from} ${currency}`.trim();
};

export const formatExperience = (experienceName?: string) => {
  if (!experienceName) return "Не указано";

  const normalized = experienceName.toLowerCase().trim();

  if (normalized.includes("нет опыта")) {
    return "Без опыта";
  }

  if (/от\s*\d+.*до\s*\d+/i.test(normalized)) {
    const match = normalized.match(/от\s*(\d+).+до\s*(\d+)/i);
    if (match) {
      const from = Number(match[1]);
      const to = Number(match[2]);
      const yearsWord = to > 5 ? "лет" : "года";
      return `Опыт ${from}–${to} ${yearsWord}`;
    }
  }

  return experienceName;
};

type WorkFormatData = { label: string; bg: string; color: string };

const getWorkFormatData = (formatId: string) => {
  switch (formatId) {
    case "REMOTE":
      return {
        label: "Можно удалённо",
        bg: "var(--mantine-color-primary-4)",
        color: "var(--mantine-color-white-0)",
      };
    case "ON_SITE":
      return {
        label: "Офис",
        bg: "var(--mantine-color-ultraLight-9)",
        color: "var(--mantine-color-gray-9)",
      };
    case "HYBRID":
      return {
        label: "Гибрид",
        bg: "var(--mantine-color-black-9)",
        color: "var(--mantine-color-white-0)",
      };
    default:
      return {
        label: "Не указано",
        bg: "var(--mantine-color-gray-1)",
        color: "var(--mantine-color-black-9)",
      };
  }
};

export const getWorkFormat = (vacancy: Vacancy): WorkFormatData => {
  const id = vacancy.work_format?.[0]?.id;
  return getWorkFormatData(id);
};
