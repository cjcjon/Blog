import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  buttonBlock: {
    marginTop: "1.625rem",
    marginBottom: "2rem",
    "& * + *": {
      marginLeft: "1rem",
    },
  },
  button: {
    fontWeight: "bold",
    height: "2.5rem",
    fontSize: "1rem",
  },
}));

function WritePostButtons({ onSubmit, onCancle }) {
  const classes = useStyles();

  return (
    <div className={classes.buttonBlock}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={onSubmit}
      >
        포스트 등록
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={onCancle}
      >
        취소
      </Button>
    </div>
  );
}

export default WritePostButtons;
