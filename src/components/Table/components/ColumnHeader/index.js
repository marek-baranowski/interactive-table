import React from "react";
import PropTypes from "prop-types";
import { headerTitleStyles } from "./styles";
import SortingButton from "../SortingButton";
import FilterButton from "../FilterButton";

const ColumnHeader = ({ column, sorting, showControls }) => (
  <div className="d-flex">
    {showControls && <SortingButton {...{ column, sorting }} />}
    <span {...headerTitleStyles}>{column.header}</span>
    {showControls && <FilterButton {...{ filter: column.filter }} />}
  </div>
);

ColumnHeader.propTypes = {
  column: PropTypes.shape({
    key: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    filter: PropTypes.object,
    sortable: PropTypes.bool
  }).isRequired,
  sorting: PropTypes.object,
  showControls: PropTypes.bool
};

ColumnHeader.defaultProps = {
  showControls: false
};

export default ColumnHeader;
