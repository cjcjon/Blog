import React from "react";
import { END } from "redux-saga";
import Store from "@redux/Store";
import { useRouter } from "next/router";

function PostViewer() {
  const router = useRouter();
  const { postId } = router.query;

  return <div></div>;
}

// export const getServerSideProps = Store.getServerSideProps(
//   async ({ store, params }) => {
//     const { postId } = params;

//     if (!state.post.seriesInfo) {
//       return { notFound: true };
//     }

//     return { props: { title: state.post.seriesInfo.title } };
//   },
// );

export default React.memo(PostViewer);
