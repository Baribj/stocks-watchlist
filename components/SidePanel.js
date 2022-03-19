import { useState, useRef } from "react";
import WatchList from "./WatchList";

const SidePanel = ({ handleCurrentTicker, currentTicker }) => {
  const [tickers, setTickers] = useState(["AAPL", "GOOG"]);

  const [addingTicker, setAddingTicker] = useState(false);

  const tickerInput = useRef();

  function handleAddTickerButton() {
    setAddingTicker(true);
  }

  // Adding a ticker by clicking the + sign
  function handleAddTickerSvg() {
    if (tickerInput.current.value !== "") {
      const ticker = tickerInput.current.value.toUpperCase();
      setTickers([...tickers, ticker]);
      handleCloseTickerInput();
    }
  }

  // Adding a ticker by pressing the Enter key
  function handleAddTickerEnterKey(e) {
    if (e.key === "Enter") {
      handleAddTickerSvg();
    }
  }

  // Closing the add ticker input
  function handleCloseTickerInput() {
    setAddingTicker(false);
  }

  // Removing a ticker from watch list
  function handleRemoveTicker(tickerToRemove) {
    setTickers(
      tickers.filter((singleTicker) => {
        return singleTicker !== tickerToRemove;
      })
    );
  }

  return (
    <div className="sidepanel d-flex flex-column">
      <div className="sidepanel-header bg-t p-2 px-3">
        <p className="header-footer-text my-muted-text mb-0">Watch List</p>
      </div>
      <div className="sidepanel-body d-flex flex-column flex-grow-1 bg-s border-e">
        <WatchList
          handleCurrentTicker={handleCurrentTicker}
          tickers={tickers}
          currentTicker={currentTicker}
          handleRemoveTicker={handleRemoveTicker}
        />

        <div className="p-3">
          {!addingTicker ? (
            <button
              className="btn btn-outline-primary d-flex justify-content-center w-100"
              onClick={handleAddTickerButton}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </button>
          ) : (
            <div className="d-flex flex-row">
              <div className="wrapper flex-grow-1">
                <input
                  ref={tickerInput}
                  type="text"
                  placeholder="Ticker"
                  className="sidepanel-ticker-input form-control"
                  onKeyPress={handleAddTickerEnterKey}
                ></input>
              </div>

              <div className="d-flex justify-content-center align-items-center px-2">
                <div className="wrapper">
                  <svg
                    className="small-add-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    onClick={handleAddTickerSvg}
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </div>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <div className="wrapper">
                  <svg
                    className="small-close-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    onClick={handleCloseTickerInput}
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="sidepanel-footer bg-t p-2 px-3">
        <p className="header-footer-text my-muted-text mb-1 text-center">
          Built by:
          <a
            href="https://www.ritwal.com"
            target="_blank"
            rel="noreferrer"
            className="my-muted-text ms-1"
          >
            Ritwal
          </a>
        </p>
      </div>
    </div>
  );
};

export default SidePanel;
