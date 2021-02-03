import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Layout from "@components/layout/Layout";
import theme from "@src/theme";
import "@styles/globals.scss";
import Store from "@redux/Store";

function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // 서버사이드에서 삽입한 CSS를 제거
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>마구잡이 블로그</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {/* Theme 제공 */}
      <ThemeProvider theme={theme}>
        {/* normalize.css처럼 Material-UI에서 제공해주는 초기화용 CSS가 CssBaseline이다. */}
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default Store.withRedux(MyApp);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
