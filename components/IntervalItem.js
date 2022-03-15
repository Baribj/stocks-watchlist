const IntervalItem = ({
  handleChangeInterval,
  range,
  rangeIntervalMap,
  interval,
}) => {
  return (
    <div className="interval d-flex flex-row text-white">
      {Object.keys(rangeIntervalMap[range]).map((intervalItem, key) => {
        return (
          <div
            key={key}
            className={`interval-item ${
              intervalItem === interval ? "active" : ""
            } ${
              rangeIntervalMap[range][intervalItem] === true ? "" : "disabled"
            }`}
            id={intervalItem}
            onClick={(e) => {
              rangeIntervalMap[range][intervalItem] && handleChangeInterval(e);
            }}
          >
            {intervalItem.toUpperCase()}
          </div>
        );
      })}

      {/* <div
        className={`interval-item ${interval === "5m" && "active"}`}
        id="5m"
        onClick={handleChangeInterval}
      >
        5m
      </div>

      <div
        className={`interval-item ${interval === "15m" && "active"}`}
        id="15m"
        onClick={handleChangeInterval}
      >
        15m
      </div>

      <div
        className={`interval-item ${interval === "1d" && "active"}`}
        id="1d"
        onClick={handleChangeInterval}
      >
        1d
      </div>
      <div
        className={`interval-item ${interval === "1wk" && "active"}`}
        id="1wk"
        onClick={handleChangeInterval}
      >
        1w
      </div>
      <div
        className={`interval-item ${interval === "1mo" && "active"}`}
        id="1mo"
        onClick={handleChangeInterval}
      >
        1mo
      </div> */}
    </div>
  );
};

export default IntervalItem;
