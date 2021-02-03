import React from "react";
import Hidden from "@material-ui/core/Hidden";

const sm = ["xs"];
const md = ["xs", "sm"];
const lg = ["xs", "sm", "md"];
const xl = ["xs", "sm", "md", "lg"];

function HiddenLessThan({ mediaQuery, children }) {
  return (
    <>
      {mediaQuery === "xs" ? (
        { children }
      ) : (
        <Hidden
          only={
            mediaQuery === "sm"
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
      )}
    </>
  );
}

export default React.memo(HiddenLessThan);
