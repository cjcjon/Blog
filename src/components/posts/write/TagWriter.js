import React, { useState, useCallback, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { useSizeStyles } from "@styles/useful.styles.js";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    fontSize: "1.875rem",
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    "& * + *": {
      marginRight: "1rem",
    },
  },
  textFieldButton: {
    marginTop: "0.75rem",
    marginBottom: "0.25rem",
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
  },
}));

const useTagStyles = makeStyles(() => ({
  list: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "0.5rem",
    "& * + *": {
      marginLeft: "0.5rem",
    },
  },
}));

// 이곳에서만 추가용 Tag를 만드므로
// tags 폴더안의 컴포넌트들 말고 따로 만들어준다
// 또한 컴포넌트로 따로 뺌으로 인해 input의 바뀜에도 re rendering이 발생하지 않는다.
const TagItem = React.memo(({ tag, onDelete }) => (
  <Chip
    style={{ margin: "0.25rem" }}
    label={tag}
    onDelete={() => onDelete(tag)}
  />
));

const TagList = React.memo(({ tags, onDelete }) => {
  const classes = useTagStyles();

  return (
    <div className={classes.list}>
      {tags.map((tag) => (
        <TagItem key={tag} tag={tag} onDelete={onDelete} />
      ))}
    </div>
  );
});

function TagWriter({ tags, onChangeTags }) {
  const [input, setInput] = useState("");
  const [localTags, setLocalTags] = useState([]);

  const classes = useStyles();
  const sizeStyles = useSizeStyles();

  // 태그 추가 함수
  const insertTag = useCallback(
    (tag) => {
      if (!tag) return; // 공백 무시
      if (localTags.includes(tag)) return; // 중복 무시
      const nextTags = [...localTags, tag];
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onDelete = useCallback(
    (tag) => {
      const nextTags = localTags.filter((t) => t !== tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault(); // 전파되는 이벤트 막기
      insertTag(input.trim()); // 좌우 공백 제거
      setInput(""); // 추가 후 공백으로 변경
    },
    [input, insertTag],
  );

  // tags가 바뀌었을 때 호출
  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  return (
    <div className={sizeStyles.fullWidth}>
      <div className={classes.title}>태그 등록</div>
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField label="태그" value={input} onChange={onChange} />
        <Button
          type="submit"
          variant="contained"
          className={classes.textFieldButton}
        >
          추가
        </Button>
      </form>
      <TagList tags={localTags} onDelete={onDelete} />
    </div>
  );
}

export default React.memo(TagWriter);
