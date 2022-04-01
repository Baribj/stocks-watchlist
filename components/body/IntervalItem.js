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
    </div>
  );
};

export default IntervalItem;
