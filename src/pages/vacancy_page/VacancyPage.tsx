/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Button, Text, Group, Badge, Loader } from "@mantine/core";
import type { Vacancy } from "../../api/types";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  formatSalary,
  formatExperience,
  getWorkFormat,
} from "../../utils/vacancyUtils";
import { loadVacancies } from "../../store/vacanciesSlice";
import classes from "./VacancyPage.module.css";
import clsx from "clsx";

export const VacancyPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as { vacancy?: Vacancy } | undefined;
  const dispatch = useAppDispatch();

  const [vacancy, setVacancy] = useState<Vacancy | null>(
    state?.vacancy || null
  );
  const [loading, setLoading] = useState(!vacancy);

  const vacanciesFromStore = useAppSelector((state) => state.vacancies.items);

  useEffect(() => {
    if (!id) return;

    if (!vacancy) {
      const found = vacanciesFromStore.find((v) => v.id === id);
      if (found) {
        setVacancy(found);
        setLoading(false);
      } else {
        const fetchVacancies = async () => {
          setLoading(true);
          try {
            await dispatch(loadVacancies());
          } catch (err) {
            console.error(err);
          } finally {
            const updated = (await import("../../store/hooks"))
              .useAppSelector((state: any) => state.vacancies.items)
              .find((v: Vacancy) => v.id === id);
            setVacancy(updated || null);
            setLoading(false);
          }
        };
        fetchVacancies();
      }
    }
  }, [id, vacancy, vacanciesFromStore, dispatch]);

  if (loading) return <Loader />;

  if (!vacancy) return <Text>Вакансия не найдена</Text>;

  const { label, bg, color } = getWorkFormat(vacancy);

  return (
    <Group className={classes.page}>
      <div className={classes.card}>
        <Text className={classes.title}>{vacancy.name}</Text>
        <Group className={classes.wrapper}>
          <Text className={classes.salary}>{formatSalary(vacancy)}</Text>
          <Text className={classes.experience}>
            {formatExperience(vacancy.experience?.name)}
          </Text>
        </Group>

        <Text className={classes.company}>{vacancy.employer.name}</Text>
        <Badge
          className={classes.badge}
          style={{ backgroundColor: bg, color: color }}
        >
          {label}
        </Badge>
        <Text className={classes.area}>{vacancy.area.name}</Text>

        <Button
          className={clsx(classes.button, classes["button-apply"])}
          component="a"
          href={vacancy.alternate_url}
          target="_blank"
          rel="noreferrer"
          color="black.9"
        >
          Откликнуться на hh.ru
        </Button>
      </div>
      {vacancy.snippet ? (
        <div className={classes.card}>
          {vacancy.snippet.requirement && (
            <Group
              className={clsx(classes["wrapper-descr"], classes.requirement)}
            >
              <Text className={classes["requirement__title"]}>Требования:</Text>
              <Text
                className={clsx(classes.descr, classes["requirement__descr"])}
              >
                {vacancy.snippet.requirement}
              </Text>
            </Group>
          )}
          {vacancy.snippet.responsibility && (
            <Group
              className={clsx(classes["wrapper-descr"], classes.responsibility)}
            >
              <Text className={classes["responsibility__title"]}>
                Обязанности:
              </Text>
              <Text
                className={clsx(
                  classes.descr,
                  classes["responsibility__descr"]
                )}
              >
                {vacancy.snippet.responsibility}
              </Text>
            </Group>
          )}
        </div>
      ) : (
        <Text>Описание отсутствует</Text>
      )}
    </Group>
  );
};
