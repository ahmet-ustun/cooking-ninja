import { useTheme } from "../hooks/useTheme.js";

import "./ThemeSelector.css";
import modeIcon from "../assets/mode-icon.svg";

const themeColors = ["#58249c", "#249c6b", "#b70233"];

const ThemeSelector = () => {
  const { mode, changeColor, changeMode } = useTheme();

  const toggleMode = () => {
    changeMode(mode === "light" ? "dark" : "light");
  };

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={modeIcon}
          alt="Light/Dark Mode Toggle Icon"
          style={{ filter: mode === "light" ? "invert(20%)" : "invert(100%)" }}
          onClick={toggleMode}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            style={{ background: color }}
            onClick={() => changeColor(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
