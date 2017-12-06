import React from "react";
import { inject, observer } from "mobx-react";
import { Alert } from "reactstrap";
import ReactTable from 'react-table';
import ColumnHeader from "./components/ColumnHeader";

export const Table = ({ store }) => {
  const {
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
    columns: columns.map(column => ({
      Header: () => <ColumnHeader {...{ column, sorting }} />,
      accessor: column.key
    })),
    minRows: 5,
    showPagination: false,
    sortable: false,
    resizable: false
  };

  return <ReactTable {...tableProps} />;
};

export default inject("store")(observer(Table));
