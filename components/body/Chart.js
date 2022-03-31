import { useEffect, useState, useRef } from "react";

import { createChart, CrosshairMode } from "lightweight-charts";

import { useSelector } from "react-redux";

import { selectedTicker } from "../../features/watch-list/activeTickerSlice";

import { windowDimensions } from "../../features/window-dimensions/windowDimensionsSlice";

const chartOptions = {
  layout: {
    backgroundColor: "#0b0f1c",
    textColor: "#646d83",
  },
  grid: {
    vertLines: {
      color: "#1c2333",
    },
    horzLines: {
      color: "#1c2333",
    },
  },
  crosshair: {
    mode: CrosshairMode.Normal,
    vertLine: {
      style: 0,
      color: "#455378",
      labelBackgroundColor: "#455378",
    },
    horzLine: {
      style: 0,
      color: "#455378",
      labelBackgroundColor: "#455378",
    },
  },
  rightPriceScale: {
    borderColor: "#1c2333",
  },
  timeScale: {
    borderColor: "#1c2333",
  },
};

let chart, candleSeries, volumeSeries;

const Chart = ({ range, interval }) => {
  const activeTicker = useSelector(selectedTicker);

  const currentWindowDimensions = useSelector(windowDimensions);

  const chartContainerDom = useRef();

  const chartDom = useRef();

  const infoDom = useRef();

  const [stockData, setStockData] = useState();

  const [loadingStockData, setLoadingStockData] = useState();

  const [error, setError] = useState(false);

  useEffect(() => {
    if (chart) {
      const width = chartContainerDom.current.offsetWidth; // for this to work, overflow: hidden has to be set on my body and my main HTML .. otherwise the canvas will stretch the parent container and when the screen shrink in size offsetWidth will remain constant
      const height = chartContainerDom.current.offsetHeight;
      chart.applyOptions({ height: height, width: width });
    }
  }, [currentWindowDimensions]);
  /****************************************/

  // Fetch data and update state with ready-to-use data
  useEffect(() => {
    // check to make sure ticker isn't null before calling the API
    if (activeTicker) {
      // set loading status to true
      setLoadingStockData(true);
      // Fetch data, format response in chart.js ready format, and save in state
      async function fetchPriceHistory() {
        /*  const APIlink = `https://yfapi.net/v8/finance/chart/${activeTicker}?range=${range}&region=US&interval=${interval}&lang=en`; */

        const APIlink = `/api/chart/${activeTicker}?range=${range}&region=US&interval=${interval}&lang=en`;

        const response = await fetch(APIlink);
        const data = await response.json();

        // check for errors
        if (!response.ok || !data.chart) {
          setLoadingStockData(false);
          setError(true);
          return;
        }
        setError(false);

        const close = data.chart.result[0].indicators.quote[0].close;
        const high = data.chart.result[0].indicators.quote[0].high;
        const low = data.chart.result[0].indicators.quote[0].low;
        const open = data.chart.result[0].indicators.quote[0].open;
        const timeStamp = data.chart.result[0].timestamp;

        const volume = data.chart.result[0].indicators.quote[0].volume;

        let stockPrices = [];
        for (let i = 0; i < close.length; i++) {
          if (open[i] !== null) {
            // Yahoo finance sometimes return one candlestick data as null which causes chart to crash .. this takes care of that
            stockPrices.push({
              time: timeStamp[i],
              open: open[i],
              high: high[i],
              low: low[i],
              close: close[i],
            });
          }
        }

        let stockVolume = [];
        let color;
        for (let i = 0; i < close.length - 1; i++) {
          if (open[i] < close[i]) {
            color = "#0c5247";
          } else if (open[i] > close[i]) {
            color = "#5f1530";
          } else {
            color = "#646d83";
          }

          if (volume[i] !== null) {
            stockVolume.push({
              time: timeStamp[i],
              value: volume[i],
              color: color,
            });
          }
        }

        setStockData({ price: stockPrices, volume: stockVolume });
      }

      async function runFetch() {
        try {
          await fetchPriceHistory();
        } catch (e) {
          console.error(e);
          setError(true);
        }
      }
      runFetch();
    }
  }, [activeTicker, range, interval]);

  // handle chart creating / updating on data change
  useEffect(() => {
    if (stockData) {
      // set loading status to false
      setLoadingStockData(false);

      if (!chart) {
        chart = createChart(chartDom.current, chartOptions);
        candleSeries = chart.addCandlestickSeries({
          upColor: "#0db787",
          downColor: "#dc1f4e",
          borderDownColor: "#dc1f4e",
          borderUpColor: "#0db787",
          wickDownColor: "#dc1f4e",
          wickUpColor: "#0db787",
        });

        volumeSeries = chart.addHistogramSeries({
          priceFormat: {
            type: "volume",
          },
          priceScaleId: "",
          scaleMargins: {
            top: 0.9,
            bottom: 0,
          },
        });
      }

      // reset default zoom and scroll position
      chart.timeScale().resetTimeScale();

      // Push price data
      candleSeries.setData(stockData.price);

      // Push volume data
      volumeSeries.setData(stockData.volume);

      let price, volume, volumeRaw, open, high, low, close;
      // subscriber function to crossHair movement
      function crosshairMove(param) {
        // prevent error when crosshair is not over a candlestick .. if no candlestick, get last candlestick data, otherwise get current candlestick data
        // --  !param.point catches crosshair as it leaves chart
        // -- !param.seriesPrices.get(candleSeries) || param.seriesPrices.get(volumeSeries) catches  crosshair as it is still on chart but there is no candlestick bar to report (happens when crosshair is in a vertically empty area)
        if (
          // if no candlestick, get last candlestick info
          !param.point ||
          !param.seriesPrices.get(candleSeries) ||
          !param.seriesPrices.get(volumeSeries)
        ) {
          price = stockData.price[stockData.price.length - 1];
          volumeRaw = stockData.volume[stockData.volume.length - 1].value;
        } else {
          // get current candlestick data
          price = param.seriesPrices.get(candleSeries);
          volumeRaw = param.seriesPrices.get(volumeSeries);
        }

        open = price.open.toFixed(2);
        high = price.high.toFixed(2);
        low = price.low.toFixed(2);
        close = price.close.toFixed(2);
        volume = volumeToComma(volumeRaw);

        function volumeToComma(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        let status;
        if (open < close) {
          status = "green";
        } else if (open > close) {
          status = "red";
        } else {
          status = "neutral";
        }

        infoDom.current.innerHTML = `
          <div class="wrapper">
          <span class="letter">O</span>
          <span class="${status}">${open}</span> 
          </div>
        
          <div class="wrapper">
          <span class="letter">H</span>
          <span class="${status}">${high}</span> 
          </div>

          <div class="wrapper">
          <span class="letter">L</span>
          <span class="${status}">${low}</span> 
          </div>

          <div class="wrapper">
          <span class="letter">C</span>
          <span class="${status}">${close}</span> 
          </div>

          <div class="wrapper">
          <span class="letter">V</span>
          <span class="${status}">${volume}</span> 
          </div>
        `;
      }

      // subscribe to crosshair move to display candle stick information

      chart.subscribeCrosshairMove(crosshairMove);

      return () => {
        chart.unsubscribeCrosshairMove(crosshairMove);
      };
    }
  }, [stockData]);

  return (
    <div ref={chartContainerDom} className="position-relative h-100">
      <div
        className={`chart-loading-spinner ${loadingStockData ? "" : "d-none"}`}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
      <div
        className={`chart-fetch-data-error my-muted-text text-center w-100 p-4 ${
          error && !loadingStockData ? "" : "d-none"
        }`}
      >
        Something went wrong, most likely we have exceeded our free API requests
        limit from Yahoo Finance API
      </div>

      <div
        ref={chartDom}
        className={`chart h-100 ${loadingStockData ? "opacity-0" : ""}`}
      ></div>
      <div
        className={`candlestick-info ${loadingStockData ? "opacity-0" : ""}`}
        ref={infoDom}
      ></div>
    </div>
  );
};

export default Chart;
