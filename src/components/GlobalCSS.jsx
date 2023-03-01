import { createGlobalStyle } from "styled-components";
import ColorTheme from "../components/ColorTheme";

const GlobalCSS = createGlobalStyle`
  body {
    background-color: ${ColorTheme.palette.body.main};
  }
`;

export default GlobalCSS;
