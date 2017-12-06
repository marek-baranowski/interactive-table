import React from "react";
import { observer } from "mobx-react";
import { Input, Label } from "reactstrap";

const MultiSelectFilter = ({ filter }) => {
  return (
    <div className="d-flex flex-column">
      {filter.filterValues.length === 0
        ? "No filters"
        : filter.filterValues.map((value, i) => (
            <Label check key={i} data-test="multi-select">
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
};

export default observer(MultiSelectFilter);
