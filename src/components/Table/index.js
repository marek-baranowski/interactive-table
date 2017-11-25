import React from "react";
import { inject, observer } from "mobx-react";
import { Input } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

export default inject("store")(
  observer(({ store }) => {
    const { animals, columns, filters } = store;

    return (
      <div>
        <Input
          className="w-25"
          value={filters.name.value}
          onChange={({ target }) => filters.name.setValue(target.value)}
        />
        <BootstrapTable data={animals} striped hover>
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
