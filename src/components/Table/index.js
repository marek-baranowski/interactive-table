import React from "react";
import { inject, observer } from "mobx-react";
import { Alert } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ColumnHeader from "./components/ColumnHeader";

export const Table = ({ store }) => {
  const {
    records,
    filteredSortedRecords,
    columns,
    sorting,
    requestStatus
  } = store;

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
      {records.length > 0 &&
        columns.map(column => (
          <TableHeaderColumn dataField={column.key} key={column.key}>
            <ColumnHeader {...{ column, sorting }} />
          </TableHeaderColumn>
        ))}
    </BootstrapTable>
  );
};

export default inject("store")(observer(Table));
