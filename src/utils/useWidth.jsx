import { useEffect, useState } from "react";

export const useWidth = () => {
  const [width, setWidth] = useState(null);
  const resize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [width]);
  return [width, setWidth];
};
