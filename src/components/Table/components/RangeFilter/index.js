import React from "react";
import PropTypes from "prop-types";
import { observer, PropTypes as MobxPropTypes } from "mobx-react";
import { Range, createSliderWithTooltip } from "rc-slider";
import { sliderStyles, sliderTooltipStyles } from "./styles";

const RangeWithTooltip = createSliderWithTooltip(Range);

const RangeFilter = ({
  filter: { selectedRange, maxRange, setSelectedRange, isPopulated }
}) => {
  const [min, max] = maxRange;
  const value = isPopulated(selectedRange)
    ? selectedRange.slice()
    : maxRange.slice();

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
};

RangeFilter.propTypes = {
  filter: PropTypes.shape({
    selectedRange: MobxPropTypes.arrayOrObservableArrayOf(PropTypes.number),
    maxRange: MobxPropTypes.arrayOrObservableArrayOf(PropTypes.number),
    setSelectedRange: PropTypes.func.isRequired,
    isPopulated: PropTypes.func.isRequired
  }).isRequired
};

export default observer(RangeFilter);
