import React from "react";
import { inject, observer } from "mobx-react";
import { Input, Label } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

export default inject("store")(
  observer(({ store }) => {
    const {
      columns,
      filters: [filter],
      filters2: [filter2],
      filteredAnimals,
      uniqueValues
    } = store;

    return (
      <div>
        <Input
          className="w-25"
          value={filter.value}
          onChange={({ target }) => filter.setValue(target.value)}
        />
        <div>
          {uniqueValues.map((value, i) => (
            <Label check key={i}>
              <Input
                type="checkbox"
                checked={filter2.isSelected(value)}
                onChange={() => filter2.toggleValue(value)}
              />{" "}
              {value}
            </Label>
          ))}
        </div>
        <BootstrapTable data={filteredAnimals} striped hover>
          {columns.map(({ key, header }, i) => (
            <TableHeaderColumn isKey={i === 0} dataField={key} key={key}>
              {header}
            </TableHeaderColumn>
          ))}
        </BootstrapTable>
      </div>
    );
  })
);
