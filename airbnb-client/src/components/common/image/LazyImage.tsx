import React, { useState, useEffect } from "react";

type ImageProps = {
  src: string;
  alt?: string;
};

const LazyImage: React.FC<ImageProps> = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = useState<
    string | undefined
  >();
  const [imageRef, setImageRef] =
    useState<HTMLImageElement | null>(null);

  const onLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.classList.add("opacity-100");
  };

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let didCancel = false;

    if (imageRef && imageSrc !== src) {
      if (observer) {
        observer.unobserve(imageRef);
      }
      observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach(
            (entry: IntersectionObserverEntry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 ||
                  entry.isIntersecting)
              ) {
                setImageSrc(src);
                observer!.unobserve(imageRef);
              }
            }
          );
        },
        {
          threshold: 0.01,
          rootMargin: "75%",
        }
      );
      observer.observe(imageRef);
    }

    return () => {
      didCancel = true;
      if (observer && observer.unobserve && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]);

  return (
    <img
      ref={(element) => setImageRef(element)}
      src={imageSrc}
      alt={alt}
      className="transition-opacity duration-500 opacity-0"
      onLoad={onLoad}
    />
  );
};

export default LazyImage;
