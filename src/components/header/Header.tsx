import { useNavigate } from "react-router-dom";
import { Image, Text, NavLink, Group } from "@mantine/core";
import clsx from "clsx";
import classes from "./Header.module.css";
import hhLogo from "../../assets/hh-logo.svg";
import ProfilePic from "../../assets/profile-icon.svg?react";
import SeparatorPic from "../../assets/separator-icon.svg?react";

export const Header = () => {
  const navigate = useNavigate();

  const handleViewVacanciesPage = () => {
    navigate(`/vacancies`);
  };

  return (
    <header className={classes.header}>
      <Group className={classes.logo}>
        <Image className={classes["logo__img"]} src={hhLogo} alt="HH logo" />
        <Text className={classes.text}>.FrontEnd</Text>
      </Group>

      <Group className={classes.nav}>
        <NavLink
          onClick={handleViewVacanciesPage}
          label="Вакансии FE"
          className={clsx(classes["nav__link"], classes["nav__link-vacancies"])}
          rightSection={<SeparatorPic />}
        />
        <NavLink
          href=""
          label="Обо мне"
          className={clsx(classes["nav__link"], classes["nav__link-profile"])}
          leftSection={<ProfilePic />}
        />
      </Group>
    </header>
  );
};
