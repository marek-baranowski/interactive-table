import React from "react";
import { Input, Label } from "reactstrap";
import { Range, createSliderWithTooltip } from "rc-slider";
import { sliderStyles, sliderTooltipStyles } from "./styles";

const RangeWithTooltip = createSliderWithTooltip(Range);

export const StringFilter = filter => (
  <Input
    value={filter.value}
    onChange={({ target }) => filter.setValue(target.value)}
    placeholder="Type to filter"
  />
);

export const MultiSelectFilter = filter => (
  <div className="d-flex flex-column">
    {filter.uniqueColumnValues.map((value, i) => (
      <Label check key={i}>
        <Input
          type="checkbox"
          checked={filter.isSelected(value)}
          onChange={() => filter.toggleValue(value)}
        />{" "}
        {value}
      </Label>
    ))}
  </div>
);

export const RangeFilter = ({
  selectedRange,
  columnMaxRange,
  setSelectedRange,
  isPopulated
}) => {
  const [min, max] = columnMaxRange;
  const value = isPopulated(selectedRange)
    ? selectedRange.peek()
    : columnMaxRange;

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
