import React from "react";
import { Input, Label } from "reactstrap";

export const StringFilter = filter => (
  <Input
    value={filter.value}
    onChange={({ target }) => filter.setValue(target.value)}
    placeholder="Type to filter"
  />
);

export const MultiSelectFilter = filter => (
  <div className="d-flex flex-column">
    {filter.columnDataToPopulateFilter.map((value, i) => (
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
