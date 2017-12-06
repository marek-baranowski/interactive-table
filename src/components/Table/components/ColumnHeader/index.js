import React from "react";
import { headerTitleStyles } from "./styles";
import SortingButton from "../SortingButton";
import FilterButton from "../FilterButton";

export default ({ column, sorting, showControls }) => (
  <div className="d-flex">
    {showControls && <SortingButton {...{ column, sorting }} />}
    <span {...headerTitleStyles}>{column.header}</span>
    {showControls && <FilterButton {...{ filter: column.filter }} />}
  </div>
);
