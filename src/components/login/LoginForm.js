import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useErrorStyles } from "@styles/useful.styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    fontSize: "1.125rem",
    padding: "0.6rem 0",
    margin: theme.spacing(2, 0),
  },
}));

function LoginForm({ formData, onChange, onSubmit, loginError }) {
  const classes = useStyles();
  const errorStyles = useErrorStyles();

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Typography component="h1" variant="h4">
        로그인
      </Typography>
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="userName"
          label="아이디"
          name="userName"
          autoFocus
          onChange={onChange}
          value={formData.userName}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          id="password"
          label="비밀번호"
          name="password"
          onChange={onChange}
          value={formData.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          로그인
        </Button>
        {loginError && (
          <div className={errorStyles.defaultError}>{loginError.message}</div>
        )}
      </form>
    </Container>
  );
}

export default React.memo(LoginForm);
