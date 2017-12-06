import React from "react";
import { headerTitleStyles } from "./styles";
import SortingButton from "../SortingButton";
import FilterButton from "../FilterButton";

export default ({ column, sorting }) => (
  <div className="d-flex">
    <SortingButton {...{ column, sorting }} />
    <span {...headerTitleStyles}>{column.header}</span>
    <FilterButton {...{ filter: column.filter }} />
  </div>
);
