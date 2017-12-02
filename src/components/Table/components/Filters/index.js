import React from "react";
import { Input, Label } from "reactstrap";
import { Range, createSliderWithTooltip } from "rc-slider";

const RangeWithTooltip = createSliderWithTooltip(Range);


export const StringFilter = filter => (
  <Input
    value={filter.value}
    onChange={({ target }) => filter.setValue(target.value)}
    placeholder="Type to filter"
  />
);

export const MultiSelectFilter = filter => (
  <div>
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

export const RangeFilter = filter => {
  const [min, max] = filter.columnMinMaxRange;

  return (
    <RangeWithTooltip
      {...{
        style: { width: 100 },
        min,
        max,
        value: filter.selectedRange.peek(),
        onChange: filter.setSelectedRange
      }}
    />
  );
};
