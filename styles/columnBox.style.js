import { makeStyles } from "@material-ui/core/styles";

// eslint-disable-next-line import/prefer-default-export
export const useColumnBoxStyles = makeStyles((theme) => ({
  fullBox: {
    width: "100%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.palette.grey[300],
    borderRadius: "4px",
    padding: "8px 12px",
    minHeight: "142px",
  },
  column: {
    marginBottom: "4px",
    "&:last-child": {
      marginBottom: "0",
    },
  },
}));
