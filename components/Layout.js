import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="page vh-100">{children}</div>
    </>
  );
};

export default Layout;
