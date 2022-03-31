const RangeItem = ({
  handleChangeActiveRange,
  rangeIntervalMap,
  interval,
  handleUpdateIntervalOnRangeUpdate,
}) => {
  // This function fires when the range is changed
  function updateInterval(e) {
    //First, when a new range is selected, we need to check for the selected interval, and make sure if it is allowed for the new range
    if (rangeIntervalMap[e.currentTarget.id][interval] === false) {
      // if not, we need to set the active interval to the first allowed one for this range
      const intervalsKeys = Object.keys(rangeIntervalMap[e.currentTarget.id]); // First, get all intervals in an array

      for (let i = 0; i < intervalsKeys.length; i++) {
        // then, loop thro the array
        if (rangeIntervalMap[e.currentTarget.id][intervalsKeys[i]] === true) {
          // check if the new interval is allowed for this range, if yes, set it to be the new interval and break
          handleUpdateIntervalOnRangeUpdate(intervalsKeys[i]);
          break;
        }
      }
    }
  }

  return (
    <div className="range-drop-down-list text-white rounded-3">
      {Object.keys(rangeIntervalMap).map((rangeItem, key) => {
        return (
          <div
            key={key}
            className="range-drop-down-list-item"
            id={rangeItem}
            onClick={(e) => {
              updateInterval(e);
              handleChangeActiveRange(e);
            }}
          >
            {rangeItem.toUpperCase()}
          </div>
        );
      })}
    </div>
  );
};

export default RangeItem;
