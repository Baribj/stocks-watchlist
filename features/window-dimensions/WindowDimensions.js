import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { getDimensions } from "./windowDimensionsSlice";

const windowHeight = () => {
  const dispatch = useDispatch();
  // Get window's height .. this is to be used instead of 100vh which causes stuff to be hidden behind Safari's bottom bar.

  useEffect(() => {
    function handleWindowResize() {
      dispatch(
        getDimensions({ height: window.innerHeight, width: window.innerWidth })
      );
    }

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return null;
};

export default windowHeight;
