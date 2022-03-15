import { useState, useEffect } from "react";

const WatchList = ({ handleCurrentTicker, tickers, currentTicker }) => {
  const [tickersInfo, setTickersInfo] = useState([]);

  const [fetchingData, setFetchingData] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTickerData() {
      setFetchingData(true);

      let tickersStringTemp = "";
      tickers.forEach((ticker) => {
        tickersStringTemp += ticker + "%2C";
      });

      const tickersString = tickersStringTemp.slice(0, -3); // to remove the last "%2C" part

      const APILink = `/api/quote?region=US&lang=en&symbols=${tickersString}`;

      const response = await fetch(APILink);

      const data = await response.json();

      if (!response.ok || !data.quoteResponse) {
        setFetchingData(false);
        setError(true);
        return;
      }

      let tempTickersInfo = [];
      data.quoteResponse.result.forEach((ticker) => {
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
  }, [tickers]);

  /* const temp1 = temp === 0 ? "#0db787" : "#dc1f4e"; */
  return (
    <>
      {fetchingData && (
        <div className="p-3 d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      {tickersInfo && (
        <div className="row gx-0">
          {tickersInfo.map((ticker, key) => {
            return (
              <div key={key} className="col-md-12 col-6">
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
            );
          })}
        </div>
      )}
    </>
  );
};

export default WatchList;
