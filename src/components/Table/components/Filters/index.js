import React from "react";
import { Input, Label } from "reactstrap";
import { Range, createSliderWithTooltip } from "rc-slider";
import isEmpty from "lodash/isEmpty";

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

export const RangeFilter = filter => {
  const [min, max] = filter.columnMinMaxRange;
  const value = isEmpty(filter.selectedRange) ? filter.columnMinMaxRange : filter.selectedRange.peek();

  return (
    <RangeWithTooltip
      {...{
        style: { width: 100 },
        min,
        max,
        value,
        onChange: filter.setSelectedRange
      }}
    />
  );
};
