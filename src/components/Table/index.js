import React from "react";
import { inject, observer } from "mobx-react";
import { Alert } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ColumnHeader from "./components/ColumnHeader";

export const Table = ({ store }) => {
  const { filteredSortedRecords, columns, requestStatus } = store;

  if (requestStatus.isPending()) {
    return <span>Loading data...</span>;
  }

  if (requestStatus.isRejected()) {
    return (
      <Alert color="danger">
        Unexpected error: "{requestStatus.errorMessage}"
      </Alert>
    );
  }

  const tableProps = {
    data: filteredSortedRecords,
    keyField: columns[0].key,
    striped: true
  };

  return (
    <BootstrapTable {...tableProps}>
      {filteredSortedRecords.length > 0 &&
        columns.map(column => (
          <TableHeaderColumn dataField={column.key} key={column.key}>
            <ColumnHeader {...{ column, store }} />
          </TableHeaderColumn>
        ))}
    </BootstrapTable>
  );
};

export default inject("store")(observer(Table));
