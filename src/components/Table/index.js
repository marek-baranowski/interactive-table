import React from "react";
import { inject, observer } from "mobx-react";
import { Input } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

export default inject("store")(
  observer(({ store }) => {
    const { columns, filters, filteredAnimals } = store;

    return (
      <div>
        <Input
          className="w-25"
          value={filters[0].value}
          onChange={({ target }) => filters[0].setValue(target.value)}
        />
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
