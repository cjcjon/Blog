// 참고: https://nickymeuleman.netlify.app/blog/table-of-contents#styling-the-active-heading
import { useEffect, useState } from "react";

/**
 * itemIds 중 현재 화면의 rootMargin 영역안에 나와있는 id 반환
 * @param {string[]} itemIds html tag id array
 * @param {string} rootMargin viewport의 margin
 */
function useActive(itemIds, rootMargin) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    let observer;

    if (itemIds && itemIds.length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: rootMargin || `0% 0% -90% 0%` },
      );

      itemIds.forEach((id) => {
        observer.observe(document.getElementById(id));
      });
    }

    return () => observer && observer.disconnect();
  }, [itemIds, rootMargin]);

  return activeId;
}

export default useActive;
