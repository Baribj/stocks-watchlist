import { useState } from "react";

import store from "../app/store";
import { Provider } from "react-redux";

import SidePanel from "../components/side-panel/SidePanel";
import Body from "../components/body/Body";

export default function Home() {
  return (
    <div className="main overflow-hidden d-flex flex-grow-1 h-100">
      <SidePanel />
      <Body />
    </div>
  );
}
