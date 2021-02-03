import React from "react";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Appbar from "./Appbar";
import Navbar from "./Navbar";

/**
 * pages/_app.js 에서 Layout으로 사용됩니다
 * 기본 레이아웃은 이곳에서 설정해주면 router 사용한것들이 children으로 알아서 들어옵니다
 */
function Layout({ children }) {
  return (
    <Container>
      <Appbar />
      <Divider />
      <Navbar />
      {children}
    </Container>
  );
}

export default Layout;
