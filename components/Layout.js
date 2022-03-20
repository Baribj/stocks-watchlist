import { useState, useEffect } from "react";

const Layout = ({ children }) => {
  /****************************************/

  // Get window's height .. this is to be used instead of 100vh which causes stuff to be hidden behind Safari's bottom bar.

  /* Handling screen size change */
  function getWindowDimensions() {
    const width = window.innerWidth + "px";
    const height = window.innerHeight + "px";
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState({
    height: "",
    width: "",
  });

  useEffect(() => {
    function handleWindowResize() {
      setWindowDimensions(getWindowDimensions());
    }

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  /****************************************/
  return (
    <>
      <div className="page" style={{ height: windowDimensions.height }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
