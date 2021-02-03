import React from "react";
import Hidden from "@material-ui/core/Hidden";

const xs = ["xs", "sm", "md", "lg", "xl"];
const sm = ["sm", "md", "lg", "xl"];
const md = ["md", "lg", "xl"];
const lg = ["lg", "xl"];
const xl = ["xl"];

function HiddenGraterThanEqual({ mediaQuery, children }) {
  return (
    <Hidden
      only={
        mediaQuery === "xs"
          ? xs
          : mediaQuery === "sm"
          ? sm
          : mediaQuery === "md"
          ? md
          : mediaQuery === "lg"
          ? lg
          : xl
      }
    >
      {children}
    </Hidden>
  );
}

export default React.memo(HiddenGraterThanEqual);
