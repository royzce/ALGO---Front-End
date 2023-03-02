import { createGlobalStyle } from "styled-components";
import ColorTheme from "../components/ColorTheme";

const GlobalCSS = createGlobalStyle`
// @import url('https://fonts.googleapis.com/css2?family=Tilt+Warp&display=swap')

  body {
    background-color: ${ColorTheme.palette.body.main};
  }
  .css-1k51tf5-MuiTooltip-tooltip {
    background-color: red;
  }
  .css-kudwh-MuiTooltip-arrow {
    color: red;
  }
  // #logoName {
  //   font-family: 'Tilt Warp';
  // }
`;

export default GlobalCSS;
