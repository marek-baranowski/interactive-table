import React from "react";
import { inject, observer } from "mobx-react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ColumnHeader from "./components/ColumnHeader";

export const Table = ({ store }) => {
  const { filteredSortedRecords, columns } = store;
  const tableProps = {
    data: filteredSortedRecords,
    keyField: columns[0].key,
    striped: true
  };

  return (
    <div>
      <BootstrapTable {...tableProps}>
        {columns.map(column => (
          <TableHeaderColumn dataField={column.key} key={column.key}>
            <ColumnHeader column={column} store={store} />
          </TableHeaderColumn>
        ))}
      </BootstrapTable>
    </div>
  );
};

export default inject("store")(observer(Table));
