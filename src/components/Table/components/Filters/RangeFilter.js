import React from "react";
import { reaction } from "mobx";
import { inject, observer } from "mobx-react";
import { Range, createSliderWithTooltip } from "rc-slider";
import { sliderStyles, sliderTooltipStyles } from "./styles";

const RangeWithTooltip = createSliderWithTooltip(Range);

const findMaxRange = (records, columnKey) => {
  const columnData = records.map(record => record[columnKey]);

  return [Math.min(...columnData), Math.max(...columnData)];
};

class RangeFilter extends React.Component {
  componentWillMount() {
    reaction(() => this.props.store.records, () => this.setFilterMaxRange());
    this.setFilterMaxRange();
  }

  setFilterMaxRange() {
    const { columnKey, filter, store } = this.props;
    filter.setMaxRange(findMaxRange(store.records, columnKey));
  }

  render() {
    const {
      selectedRange,
      maxRange,
      setSelectedRange,
      isPopulated
    } = this.props.filter;

    const [min, max] = maxRange;
    const value = isPopulated(selectedRange) ? selectedRange.peek() : maxRange;

    return (
      <RangeWithTooltip
        {...{
          className: `${sliderStyles}`,
          min,
          max,
          value,
          onChange: setSelectedRange,
          tipProps: { overlayClassName: `${sliderTooltipStyles}` }
        }}
      />
    );
  }
}

export default inject("store")(observer(RangeFilter));
