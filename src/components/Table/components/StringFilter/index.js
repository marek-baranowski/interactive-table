import React from "react";
import { Input } from "reactstrap";

export default ({ filter }) => (
  <Input
    value={filter.value}
    onChange={({ target }) => filter.setValue(target.value)}
    placeholder="Type to filter"
  />
);
