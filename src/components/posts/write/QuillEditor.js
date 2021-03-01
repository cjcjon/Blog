import React, { useRef, useEffect } from "react";
import hljs from "highlight.js";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";
import { v4 } from "uuid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import postApi from "@src/api/postApi";

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
    marginBottom: "1.5rem",
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

  // 이미지 서버 저장용 핸들러
  const imageHandler = () => {
    // input 생성
    const input = document.createElement("input");

    // image 용으로 생성
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/jpg,image/png,image/jpeg,image/gif");
    input.click();

    // 파일을 base64로 직접 저장하지 않고 image server에 저장해서 url만 불러오기
    input.onchange = async () => {
      const file = input.files[0];

      const formData = new FormData();
      formData.append("image", file);

      const quill = quillInstance.current;

      // 현재 커서 위치 불러오기
      const range = quill.getSelection(true);

      // 임시 이미지 표시
      quill.insertEmbed(
        range.index,
        "image",
        "https://via.placeholder.com/150",
      );

      // 커서를 우측으로 이동
      quill.setSelection(range.index + 1);

      // 서버에 이미지 저장
      let res = null;
      try {
        res = await postApi.uploadImage(formData);
      } catch (e) {
        quill.deleteText(range.index, 1);
        quill.insertText(range.index, "이미지 업로드 실패");
        return;
      }

      // 임시 이미지 삭제
      quill.deleteText(range.index, 1);

      // 업로드된 이미지 추가
      quill.insertEmbed(range.index, "image", res.data);
    };
  };

  useEffect(() => {
    const modules = {
      syntax: {
        // code highlighting에 line 넣는거 연구하고 싶으면 아래 사이트 참고
        // https://programmer.help/blogs/write-your-own-highlight.js-line-number-plugin.html
        highlight: (text) => hljs.highlightAuto(text).value,
      },
      // 더 많은 옵션은 https://quilljs.com/docs/modules/toolbar/ 참고
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, false] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block", "link", "image", "video"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };

    if (typeof window === "object") {
      // Quill 이미지와 비디오 크기 조절 모듈
      Quill.register(
        "modules/blotFormatter",
        // eslint-disable-next-line global-require
        require("quill-blot-formatter").default,
      );
      modules.blotFormatter = {};

      // html Header에 아이디 추가해주는 모듈
      const Header = Quill.import("formats/header");
      class IdHeader extends Header {
        static create(value) {
          const node = super.create(value);
          node.setAttribute("id", v4());
          return node;
        }
      }
      Quill.register("formats/header", IdHeader);
    }

    quillInstance.current = new Quill(
      quillElement.current,
      {
        theme: "snow",
        placeholder: "내용을 작성하세요...",
        modules,
      },
      [],
    );

    // quill에 text-change 이벤트 등록
    // quill에 변화가 생길 때마다 호출된다
    const quill = quillInstance.current;
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        onChangeField({ key: "body", value: quill.root.innerHTML });

        // 이미지가 삭제되었는지 확인
        const currentContents = quillInstance.current.getContents();
        const diff = currentContents.diff(oldDelta);
        const imageDelta = diff.ops
          .filter((i) => i.insert && i.insert.image)
          .map((i) => i.insert.image);

        // quill에서 삭제된 이미지들 서버에서 삭제
        for (let i = 0; i < imageDelta.length; i += 1) {
          // delete는 await 필요 없음
          const imageName = imageDelta[i].substring(
            imageDelta[i].lastIndexOf("/") + 1,
            imageDelta[i].length,
          );
          postApi.deleteImage(imageName);
        }
      }
    });

    // body 저장
    quillInstance.current.root.innerHTML = body;
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
