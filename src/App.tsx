import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mantine/core";
import "@mantine/core/styles.css";
import { Header } from "./components/header/Header";
import { VacanciesPage } from "./pages/vacancies_page/VacanciesPage";
import { VacancyPage } from "./pages/vacancy_page/VacancyPage";
import classes from "./App.module.css";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container className={classes.container} mt="md">
        <Routes>
          <Route path="/" element={<Navigate to="/vacancies" replace />} />
          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/vacancies/:id" element={<VacancyPage />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
