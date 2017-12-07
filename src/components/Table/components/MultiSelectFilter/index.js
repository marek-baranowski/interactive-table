import React from "react";
import PropTypes from "prop-types";
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

MultiSelectFilter.propTypes = {
  filter: PropTypes.shape({
    filterValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    isSelected: PropTypes.func.isRequired,
    toggleValue: PropTypes.func.isRequired
  }).isRequired
};

export default observer(MultiSelectFilter);
