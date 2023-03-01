import { createGlobalStyle } from "styled-components";
import ColorTheme from "../components/ColorTheme";

const GlobalCSS = createGlobalStyle`
  body {
    background-color: ${ColorTheme.palette.body.main};
  }
  .css-1k51tf5-MuiTooltip-tooltip {
    background-color: red;
  }
  .css-kudwh-MuiTooltip-arrow {
    color: red;
  }
`;

export default GlobalCSS;
