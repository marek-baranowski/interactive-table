import React from "react";
import { observer } from "mobx-react";
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

export default observer(RangeFilter);
