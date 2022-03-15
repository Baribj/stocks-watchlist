import { useState } from "react";

import SidePanel from "./SidePanel";
import Body from "./Body";

const Main = () => {
  const [currentTicker, setCurrentTicker] = useState(false);

  function handleCurrentTicker(e) {
    const currentTicker = e.currentTarget.id;
    setCurrentTicker(currentTicker);
  }

  return (
    <div className="main overflow-hidden d-flex flex-grow-1">
      <SidePanel
        handleCurrentTicker={handleCurrentTicker}
        currentTicker={currentTicker}
      />

      <Body currentTicker={currentTicker} />
    </div>
  );
};

export default Main;
