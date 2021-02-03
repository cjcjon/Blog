import React from "react";
import Link from "next/link";

/**
 * Link에 항상 a 추가해야되는거 귀찮아서 만든 컴포넌트
 * @param href 이동할 링크 주소
 */
function LinkWrapper({ href, children }) {
  return (
    <Link href={href} passHref>
      <a>{children}</a>
    </Link>
  );
}

export default React.memo(LinkWrapper);
