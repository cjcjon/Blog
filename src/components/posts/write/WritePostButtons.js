import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useErrorStyles } from "@styles/useful.styles";

const useStyles = makeStyles(() => ({
  buttonBlock: {
    marginTop: "1rem",
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

function WritePostButtons({ onSubmit, onCancel, error }) {
  const classes = useStyles();
  const errorStyles = useErrorStyles();

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
        onClick={onCancel}
      >
        취소
      </Button>
      {error && (
        <div className={errorStyles.defaultError}>전송에 실패하였습니다</div>
      )}
    </div>
  );
}

export default React.memo(WritePostButtons);
