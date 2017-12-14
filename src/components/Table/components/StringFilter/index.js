import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";

const StringFilter = ({ filter }) => (
  <Input
    value={filter.value}
    onChange={({ target }) => filter.setValue(target.value)}
    placeholder="Type to filter"
  />
);

StringFilter.propTypes = {
  filter: PropTypes.shape({
    value: PropTypes.string,
    setValue: PropTypes.func.isRequired
  }).isRequired
};

StringFilter.defaultProps = {
  filter: {
    value: ""
  }
};

export default observer(StringFilter);
