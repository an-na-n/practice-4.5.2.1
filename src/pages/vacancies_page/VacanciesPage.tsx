/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Title, Skeleton, Group, TextInput, Button } from "@mantine/core";
import "@mantine/core/styles.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  loadVacancies,
  setPage,
  setSearch,
  setCity,
  setSkills,
} from "../../store/vacanciesSlice";
import { VacancyCard } from "../../components/vacancy_card/VacancyCard";
import { PaginationBar } from "../../components/pagination_bar/PaginationBar";
import { SideBar } from "../../components/sidebar/SideBar";
import SearchIcon from "../../assets/search-icon.svg?react";
import classes from "./VacanciesPage.module.css";

export const VacanciesPage = () => {
  const dispatch = useAppDispatch();
  const { items, loading, page, totalPages, search, city, skills } =
    useAppSelector((state) => state.vacancies);
  const [localSearch, setLocalSearch] = useState(search);
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstSync = useRef(true);

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlCity = searchParams.get("city") || "";
    const urlSkillsParam = searchParams.get("skills");
    const urlSkills = urlSkillsParam
      ? urlSkillsParam.split(",").filter(Boolean)
      : null;
    const urlPage = Number(searchParams.get("page")) || 1;

    if (urlPage !== page) dispatch(setPage(urlPage));
    if (urlSearch !== search) {
      dispatch(setSearch(urlSearch));
      setLocalSearch(urlSearch);
    }
    if (urlCity !== city) dispatch(setCity(urlCity));
    if (urlSkills && urlSkills.join(",") !== skills.join(",")) {
      dispatch(setSkills(urlSkills));
    }
  }, [searchParams]);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (search) params.search = search;
    if (city) params.city = city;
    if (skills.length > 0) params.skills = skills.join(",");
    if (page > 1) params.page = page.toString();

    if (isFirstSync.current) {
      setSearchParams(params, { replace: true });
      isFirstSync.current = false;
    } else {
      setSearchParams(params);
    }
  }, [search, city, skills, page]);

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(loadVacancies());
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [search, city, skills, page]);

  const handleSearch = () => {
    dispatch(setSearch(localSearch));
    dispatch(setPage(1));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(setSearch(localSearch));
      dispatch(setPage(1));
    }
  };

  const handlePageChange = (p: number) => {
    dispatch(setPage(p));
  };

  return (
    <div className={classes.container}>
      <Group className={classes.header}>
        <div>
          <Title order={2} className={classes.title}>
            Список вакансий
          </Title>
          <p className={classes.subtitle}>по профессии Frontend-разработчик</p>
        </div>

        <Group className={classes.search}>
          <TextInput
            placeholder="Должность или название компании"
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              if (e.target.value === "") {
                dispatch(setSearch(""));
                dispatch(setPage(1));
              }
            }}
            onKeyDown={handleKeyDown}
            className={classes["search__input"]}
            leftSection={<SearchIcon />}
          />
          <Button
            className={classes["search__button"]}
            color="primary.4"
            onClick={handleSearch}
          >
            Найти
          </Button>
        </Group>
      </Group>

      <Group className={classes.content}>
        <SideBar />
        <main className={classes.vacancies}>
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} />)
          ) : (
            <>
              {items.map((vacancy) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))}
              {totalPages > 1 && (
                <PaginationBar
                  page={page}
                  total={totalPages}
                  onChange={handlePageChange}
                />
              )}
            </>
          )}
        </main>
      </Group>
    </div>
  );
};
