// 참고: https://nickymeuleman.netlify.app/blog/table-of-contents#styling-the-active-heading
import { useEffect, useState } from "react";

/**
 * itemIds 중 현재 화면의 rootMargin 영역안에 나와있는 모든 id 반환
 * @param {string[]} itemIds html tag id array
 * @param {string} rootMargin viewport의 margin
 */
function useActives(itemIds, rootMargin) {
  const [activeIds, setActiveIds] = useState([]);

  useEffect(() => {
    let observer;

    if (itemIds && itemIds.length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          const actives = [];
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              actives.push(entry.target.id);
            }
          });
          setActiveIds(actives);
        },
        { rootMargin: rootMargin || `0% 0% -80% 0%` },
      );

      itemIds.forEach((id) => {
        observer.observe(document.getElementById(id));
      });
    }

    return () => observer && observer.disconnect();
  }, [itemIds, rootMargin]);

  return activeIds;
}

export default useActives;
