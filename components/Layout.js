import { useSelector } from "react-redux";

import { windowDimensions } from "../features/window-dimensions/windowDimensionsSlice";

import WindowDimensionsComponent from "../features/window-dimensions/WindowDimensions";

const Layout = ({ children }) => {
  const currentWindowDimensions = useSelector(windowDimensions);
  return (
    <>
      <div className="page" style={{ height: currentWindowDimensions.height }}>
        <WindowDimensionsComponent />
        {children}
      </div>
    </>
  );
};

export default Layout;
