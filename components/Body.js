import dynamic from "next/dynamic";
import { useState } from "react";

import RangeItem from "./RangeItem";
import IntervalItem from "./IntervalItem";

import { useSelector } from "react-redux";

import { selectedTicker } from "../features/sidePanel/activeTickerSlice";

const Chart = dynamic(import("./Chart"), { ssr: false });

// Mapping which intervals are available for each range
const rangeIntervalMap = {
  "1d": {
    "1m": true,
    "5m": true,
    "15m": true,
    "1d": false,
    "1wk": false,
    "1mo": false,
  },
  "5d": {
    "1m": true,
    "5m": true,
    "15m": true,
    "1d": false,
    "1wk": false,
    "1mo": false,
  },
  "1mo": {
    "1m": false,
    "5m": true,
    "15m": true,
    "1d": true,
    "1wk": true,
    "1mo": false,
  },
  "3mo": {
    "1m": false,
    "5m": false,
    "15m": false,
    "1d": true,
    "1wk": true,
    "1mo": true,
  },
  "6mo": {
    "1m": false,
    "5m": false,
    "15m": false,
    "1d": true,
    "1wk": true,
    "1mo": true,
  },
  "1y": {
    "1m": false,
    "5m": false,
    "15m": false,
    "1d": true,
    "1wk": true,
    "1mo": true,
  },
  "5y": {
    "1m": false,
    "5m": false,
    "15m": false,
    "1d": true,
    "1wk": true,
    "1mo": true,
  },
  "10y": {
    "1m": false,
    "5m": false,
    "15m": false,
    "1d": true,
    "1wk": true,
    "1mo": true,
  },
  ytd: {
    "1m": false,
    "5m": false,
    "15m": false,
    "1d": true,
    "1wk": true,
    "1mo": true,
  },
  /* max: { Yahoo API enforces 3 month dataGranularity and ignores the interval we send
    "1m": false,
    "5m": false,
    "15m": false,
    "1d": true,
    "1wk": true,
    "1mo": true,
  }, */
};

const Body = () => {
  const activeTicker = useSelector(selectedTicker);
  /*  const rangeDropDownList = useRef(); */
  const [rangeDropDownList, setRangeDropDownList] = useState(false);

  const [range, setRange] = useState("1y");

  const [interval, setInterval] = useState("1d");

  function handleRangeDropDown() {
    setRangeDropDownList((prev) => !prev);
  }

  function handleChangeActiveRange(e) {
    handleRangeDropDown();
    setRange(e.currentTarget.id);
  }

  function handleChangeInterval(e) {
    setInterval(e.currentTarget.id);
  }

  function handleUpdateInervalonRnageUpdate(newInterval) {
    setInterval(newInterval);
  }

  return (
    <div className="body overflow-hidden d-flex flex-column flex-grow-1">
      <div className="body-header bg-t p-2 px-3 d-flex flex-row">
        <p className="header-footer-text range-text my-muted-text mb-0">
          Range:
        </p>
        <div className="range-drop-down position-relative">
          <div className="text-white active" onClick={handleRangeDropDown}>
            {range.toUpperCase()}
          </div>
          {rangeDropDownList && (
            <RangeItem
              handleChangeActiveRange={handleChangeActiveRange}
              rangeIntervalMap={rangeIntervalMap}
              interval={interval}
              handleUpdateInervalonRnageUpdate={
                handleUpdateInervalonRnageUpdate
              }
            />
          )}
        </div>
        <p className="header-footer-text interval-text my-muted-text mb-0">
          Interval:
        </p>
        <IntervalItem
          handleChangeInterval={handleChangeInterval}
          range={range}
          interval={interval}
          rangeIntervalMap={rangeIntervalMap}
        />
      </div>

      <div className="body-body h-100 bg-s">
        {!selectedTicker ? (
          <div className="d-flex align-items-center justify-content-center h-100">
            <h3 className="my-muted-text p-5 text-center">
              Click on a stock to view its chart
            </h3>
          </div>
        ) : (
          <Chart range={range} interval={interval} />
        )}
      </div>

      <div className="body-footer bg-t p-2 px-3">
        <p className="header-footer-text text-end my-muted-text mb-1">
          Open Source Project:
          <a
            href="https://github.com/ritwaldev/stocks-watchlist"
            target="_blank"
            rel="noreferrer"
            className="my-muted-text ms-1"
          >
            Github
          </a>
        </p>
      </div>
    </div>
  );
};

export default Body;
