import { useEffect } from "react";
import { useState } from "react";

const useIntersectionObserver = (
  targetRef,
  options = { threshold: 0, root: null, rootMargin: "0px" }
) => {
  const [entry, setEntry] = useState();

  const isIntersecting = entry?.isIntersecting;

  const updateEntry = (entries) => {
    const [entry] = entries;

    setEntry(entry);
  };

  useEffect(() => {
    const target = targetRef?.current;

    if (isIntersecting || target) return;

    const observer = new IntersectionObserver(updateEntry, options);
    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [
    targetRef,
    options.root,
    options.rootMargin,
    options.threshold,
    isIntersecting,
    options,
  ]);

  return entry;
};

export default useIntersectionObserver;
