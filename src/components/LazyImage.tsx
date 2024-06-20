import { useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes } from "react";

type LazyImageProps = {
  src: string;
  onLazyLoad?: (img: HTMLImageElement) => void;
};

type Props = ImgHTMLAttributes<HTMLImageElement> & LazyImageProps;

const defaultUrl: string =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=";

export function LazyImage({
  src,
  onLazyLoad,
  ...imgProps
}: Props): JSX.Element {
  const node = useRef<HTMLImageElement>(null);

  const [isLazyLoaded, setIsLazyLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(defaultUrl);

  useEffect(() => {
    if (isLazyLoaded) {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !node.current) {
          return;
        }
        setCurrentSrc(src);
        setIsLazyLoaded(true);
        observer.disconnect();
      });
    });
    node.current && observer.observe(node.current);

    if (typeof onLazyLoad === "function" && node.current) {
      onLazyLoad(node.current);
    }
    return () => observer.disconnect();
  }, [src, onLazyLoad, isLazyLoaded]);

  return <img ref={node} src={currentSrc} {...imgProps} />;
}
