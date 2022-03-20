import { useState, useEffect } from "react";

const WatchList = ({
  handleCurrentTicker,
  tickers,
  tickersAdded,
  currentTicker,
  handleRemoveTicker,
}) => {
  const [tickersInfo, setTickersInfo] = useState([]);

  const [fetchingData, setFetchingData] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    // if there are tickers
    if (tickers.length > 0) {
      // if there are tickers
      async function fetchTickerData() {
        setFetchingData(true);
        setError(false);

        let tickersStringTemp = "";
        tickers.forEach((ticker) => {
          tickersStringTemp += ticker + "%2C";
        });

        const tickersString = tickersStringTemp.slice(0, -3); // to remove the last "%2C" part

        const APILink = `/api/quote?region=US&lang=en&symbols=${tickersString}`;

        const response = await fetch(APILink);

        const data = await response.json();

        if (!response.ok || !data.quoteResponse || data.message) {
          setFetchingData(false);
          setError(true);
          return;
        }

        let tempTickersInfo = [];
        data.quoteResponse.result.forEach((ticker) => {
          // Yahoo API doesn't return price data for stuff like FCBK .. this will cause the map below to throw an error .. this is a temp solution since if user enters FCBK ticker it will still be in the tickers state, ideally, we need to check the ticker and make sure it is correct and there exists data for it before adding it to the tickers state
          if (!ticker.regularMarketPrice) {
            return;
          }
          const price = ticker.regularMarketPrice;
          const change = ticker.regularMarketChange;
          const symbol = ticker.symbol;
          const shortName = ticker.shortName;
          let color;
          if (change > 0) {
            color = "#0db787";
          } else if (change < 0) {
            color = "#dc1f4e";
          } else {
            color = "#646d83";
          }
          tempTickersInfo.push({
            price: price,
            change: change,
            symbol: symbol,
            shortName: shortName,
            color: color,
          });
        });

        setTickersInfo(tempTickersInfo);
      }

      async function runFetch() {
        try {
          await fetchTickerData();
        } catch (e) {
          console.error(e);
          setError(true);
        } finally {
          setFetchingData(false);
        }
      }
      runFetch();
    }
    // if tickers have been deleted
    else {
      setTickersInfo(false);
    }
  }, [tickersAdded]);

  useEffect(() => {
    // remove tickers
    if (tickersInfo.length > 0) {
      const currentTickers = tickersInfo.filter((ticker) =>
        tickers.includes(ticker.symbol)
      );
      setTickersInfo(currentTickers);
    }
  }, [tickers]);

  return (
    <>
      {fetchingData && (
        <div className="p-3 d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      {error && (
        <div className="wrapper my-muted-text p-3 text-center">
          <p className="small mb-0">
            Sorry. We get a 100 requests/day from Yahoo Finance API, and it
            appears that we have exhausted this limit. We encourage you to clone
            this project and add your own free API keys.{" "}
            <a
              href="https://github.com/ritwaldev/stocks-watchlist"
              target="_blank"
              rel="noreferrer"
            >
              Take a look at project repo here.
            </a>
          </p>
        </div>
      )}

      {tickersInfo && (
        <div className="row gx-0">
          {tickersInfo.map((ticker, key) => {
            return (
              <div key={key} className="col-md-12 col-6">
                <div className="position-relative">
                  <div className="delete-ticker-from-watchlist">
                    <svg
                      className="small-close-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      onClick={() => {
                        handleRemoveTicker(ticker.symbol);
                      }}
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </div>
                  <div
                    className={`sidepanel-stock d-flex justify-content-between p-3 ${
                      ticker.symbol === currentTicker ? "activeTicker" : ""
                    }`}
                    style={{ borderLeft: `1px solid ${ticker.color}` }}
                    id={ticker.symbol}
                    onClick={handleCurrentTicker}
                  >
                    <div className="wrapper ticker-and-fullname-wrapper">
                      <p className="sidepanel-ticker mb-0">{ticker.symbol}</p>
                      <p className="sidepanel-fullname my-muted-text mb-0">
                        {ticker.shortName}
                      </p>
                    </div>
                    <div
                      className="wrapper text-end"
                      style={{ color: ticker.color }}
                    >
                      <p className="sidepanel-price mb-0">
                        {ticker.price.toFixed(3)}
                      </p>
                      <p className="sidepanel-change mb-0">
                        {ticker.change.toFixed(3)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default WatchList;
