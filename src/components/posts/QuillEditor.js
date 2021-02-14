import React, { useRef, useEffect } from "react";
import hljs from "highlight.js";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

// SSR 이라서 import 불가
// 동적으로 불러오기 위해서 import 대신 require를 사용한다
// https://velog.io/@jwisgenius/Next-%EC%99%80-Quill-Editor-wysiwyg-%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0-2
const Quill = typeof window === "object" ? require("quill") : () => false;

hljs.configure({
  tabReplace: "  ",
  languages: ["javascript", "css", "html", "c", "cpp", "csharp", "python"],
});

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: "5rem",
    paddingBottom: "2rem",
  },
  titleField: {
    marginBottom: "2rem",
  },
  titleInput: {
    fontSize: "3rem",
    fontWeight: "bold",
  },
}));

function QuillEditor({ title, body, onChangeField }) {
  const classes = useStyles();
  const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "snow",
      placeholder: "내용을 작성하세요...",
      modules: {
        syntax: {
          // code highlighting에 line 넣는거 연구하고 싶으면 아래 사이트 참고
          // https://programmer.help/blogs/write-your-own-highlight.js-line-number-plugin.html
          highlight: (text) => hljs.highlightAuto(text).value,
        },
        // 더 많은 옵션은 https://quilljs.com/docs/modules/toolbar/ 참고
        toolbar: [
          [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block", "link", "image", "video"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["clean"],
        ],
      },
    });

    // quill에 text-change 이벤트 등록
    // quill에 변화가 생길 때마다 호출된다
    const quill = quillInstance.current;
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        onChangeField({ key: "body", value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  // 타이틀 변경
  const onChangeTitle = (e) => {
    onChangeField({ key: "title", value: e.target.value });
  };

  return (
    <div className={classes.root}>
      <TextField
        placeholder="제목을 입력하세요"
        fullWidth
        margin="normal"
        InputProps={{ classes: { input: classes.titleInput } }}
        className={classes.titleField}
        onChange={onChangeTitle}
        value={title}
      />
      <div ref={quillElement} />
    </div>
  );
}

export default React.memo(QuillEditor);
