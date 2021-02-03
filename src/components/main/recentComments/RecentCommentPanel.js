import React from "react";
import Box from "@material-ui/core/Box";
import ColumnPost from "@components/main/ColumnPost";
import { useColumnBoxStyles } from "@styles/columnBox.style";
import RecentCommentTitle from "./RecentCommentTitle";

function RecentCommentPanel() {
  const columnBoxStyle = useColumnBoxStyles();

  return (
    <Box className={columnBoxStyle.fullBox}>
      <RecentCommentTitle />
      <Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="이거 어떨까요?"
            subText="by 어쩌구"
            subIsDate={false}
          />
        </Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="이거 어떨까요?"
            subText="by 어쩌구"
            subIsDate={false}
          />
        </Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="이거 어떨까요?"
            subText="by 어쩌구"
            subIsDate={false}
          />
        </Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="이거 어떨까요?"
            subText="by 어쩌구"
            subIsDate={false}
          />
        </Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="이거 어떨까요?"
            subText="by 어쩌구"
            subIsDate={false}
          />
        </Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="이거 어떨까요?"
            subText="by 어쩌구"
            subIsDate={false}
          />
        </Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="이거 어떨까요?"
            subText="by 어쩌구"
            subIsDate={false}
          />
        </Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="이거 어떨까요?"
            subText="by 어쩌구"
            subIsDate={false}
          />
        </Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="이거 어떨까요?"
            subText="by 어쩌구"
            subIsDate={false}
          />
        </Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="이거 어떨까요?"
            subText="by 어쩌구"
            subIsDate={false}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(RecentCommentPanel);
