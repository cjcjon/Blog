import React from "react";
import Button from "@material-ui/core/Button";

function PostEditButton() {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ marginTop: "0.25rem" }}
    >
      포스트 작성
    </Button>
  );
}

export default React.memo(PostEditButton);
