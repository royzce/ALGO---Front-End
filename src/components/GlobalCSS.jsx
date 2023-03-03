import { useContext } from "react";
import { createGlobalStyle } from "styled-components";
import { DarkModeContext } from "../context/DarkModeContext";

const GlobalCSS = () => {
  const { darkMode } = useContext(DarkModeContext);

  return <GlobalStyle darkMode={darkMode} />;
};

const GlobalStyle = createGlobalStyle`

  body {
    background-color: ${(props) => (props.darkMode ? "#121212" : "#eef2f6")};
  }
  .css-1k51tf5-MuiTooltip-tooltip {
    background-color: red;
  }
  .css-kudwh-MuiTooltip-arrow {
    color: red;
  }
  #logoName {
    font-family: 'Tilt Warp';
  }
`;

export default GlobalCSS;
