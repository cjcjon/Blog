import { makeStyles } from "@material-ui/core/styles";

// eslint-disable-next-line import/prefer-default-export
export const useSizeStyles = makeStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  fullHeight: {
    height: "100%",
  },
  full: {
    width: "100%",
    height: "100%",
  },
  maxFullWidth: {
    maxWidth: "100%",
  },
  maxFullHeight: {
    maxHeight: "100%",
  },
  maxFull: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export const useWordStyles = makeStyles(() => ({
  noWordBreak: {
    wordBreak: "keep-all",
  },
  noLineBreak: {
    whiteSpace: "nowrap",
  },
  dottedLine: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  bold: {
    fontWeight: "bold",
  },
}));
