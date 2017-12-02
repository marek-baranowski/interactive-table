import React from "react";
import { inject, observer } from "mobx-react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ColumnHeader from "./components/ColumnHeader";

export default inject("store")(
  observer(({ store }) => {
    const { filteredAnimals, columns } = store;

    return (
      <div>
        <BootstrapTable data={filteredAnimals} keyField="name" striped hover>
          {columns.map(column => (
            <TableHeaderColumn dataField={column.key} key={column.key}>
              <ColumnHeader column={column} store={store} />
            </TableHeaderColumn>
          ))}
        </BootstrapTable>
      </div>
    );
  })
);
