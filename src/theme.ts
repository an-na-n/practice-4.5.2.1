import { createTheme, type MantineColorsTuple } from "@mantine/core";

const primary: MantineColorsTuple = [
  "#e9f0ff",
  "#d2dbff",
  "#a4b5f8",
  "#728cf1",
  "#4263eb",
  "#2e53e9",
  "#1e47e9",
  "#0f39cf",
  "#0432ba",
  "#002ba5",
];

const darkPrimary: MantineColorsTuple = [
  "#ecf1ff",
  "#d9def9",
  "#b0bbeb",
  "#8595de",
  "#6175d3",
  "#4a60cd",
  "#364fc7",
  "#2f47b4",
  "#273fa2",
  "#1c3590",
];

const black: MantineColorsTuple = [
  "#f4f4f5",
  "#e7e7e7",
  "#cccccc",
  "#b0b0b0",
  "#989898",
  "#888888",
  "#818181",
  "#6e6e6e",
  "#626264",
  "#0f0f10",
];

const gray: MantineColorsTuple = [
  "#f4f4f580",
  "#e7e7e780",
  "#cccccc80",
  "#b0b0b080",
  "#98989880",
  "#88888880",
  "#81818180",
  "#6e6e6e80",
  "#62626480",
  "#0f0f1080",
];

const lightGray: MantineColorsTuple = [
  "#f4f4f54d",
  "#e7e7e74d",
  "#cccccc4d",
  "#b0b0b04d",
  "#9898984d",
  "#8888884d",
  "#8181814d",
  "#6e6e6e4d",
  "#6262644d",
  "#0f0f104d",
];

const preLight: MantineColorsTuple = [
  "#f4f4f533",
  "#e7e7e733",
  "#cccccc33",
  "#b0b0b033",
  "#98989833",
  "#88888833",
  "#81818133",
  "#6e6e6e33",
  "#62626433",
  "#0f0f1033",
];

const ultraLight: MantineColorsTuple = [
  "#f4f4f51a",
  "#e7e7e71a",
  "#cccccc1a",
  "#b0b0b01a",
  "#9898981a",
  "#8888881a",
  "#8181811a",
  "#6e6e6e1a",
  "#6262641a",
  "#0f0f101a",
];

const background: MantineColorsTuple = [
  "#f6f6f7",
  "#e6e6e6",
  "#cbcbcb",
  "#aeaeae",
  "#959597",
  "#868589",
  "#7e7e83",
  "#6b6b71",
  "#5f5f66",
  "#52525c",
];

const white: MantineColorsTuple = [
  "#ffffff",
  "#e7e7e7",
  "#cdcdcd",
  "#b2b2b2",
  "#9a9a9a",
  "#8b8b8b",
  "#848484",
  "#717171",
  "#656565",
  "#575757",
];

export const theme = createTheme({
  colors: {
    primary,
    darkPrimary,
    black,
    gray,
    lightGray,
    preLight,
    ultraLight,
    background,
    white,
  },
  primaryColor: "black",
  fontFamily: "Inter, sans-serif",
});
