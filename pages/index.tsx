import { useState } from "react";

import store from "../app/store";
import { Provider } from "react-redux";

import SidePanel from "../features/sidePanel/SidePanel";
import Body from "../components/Body";

export default function Home() {
  return (
    <div className="main overflow-hidden d-flex flex-grow-1 h-100">
      <Provider store={store}>
        <SidePanel />
        <Body />
      </Provider>
    </div>
  );
}
