import React from "react";
import PropTypes from "prop-types";
import { inject, observer, PropTypes as MobxPropTypes } from "mobx-react";
import { Alert } from "reactstrap";
import ReactTable from "react-table";
import ColumnHeader from "./components/ColumnHeader";

export const Table = ({ store }) => {
  const {
    records,
    filteredSortedRecords,
    columns,
    sorting,
    requestStatus
  } = store;

  if (requestStatus.isPending) {
    return <span>Loading data...</span>;
  }

  if (requestStatus.isRejected) {
    return (
      <Alert color="danger">
        Unexpected error: "{requestStatus.errorMessage}"
      </Alert>
    );
  }

  const tableProps = {
    data: filteredSortedRecords,
    columns: columns.map(column => ({
      Header: () => (
        <ColumnHeader
          {...{ column, sorting, showControls: records.length > 0 }}
        />
      ),
      accessor: column.key
    })),
    minRows: 5,
    showPagination: false,
    sortable: false,
    resizable: false,
    noDataText: 'No records found'
  };

  return <ReactTable {...tableProps} />;
};

Table.propTypes = {
  store: PropTypes.shape({
    records: MobxPropTypes.arrayOrObservableArrayOf(PropTypes.object)
      .isRequired,
    filteredSortedRecords: MobxPropTypes.arrayOrObservableArrayOf(
      PropTypes.object
    ).isRequired,
    columns: MobxPropTypes.arrayOrObservableArrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired,
        filter: PropTypes.object,
        sortable: PropTypes.boolean
      })
    ).isRequired,
    sorting: PropTypes.shape({
      column: PropTypes.string,
      order: PropTypes.string
    }),
    requestStatus: PropTypes.shape({
      isPending: PropTypes.bool,
      isRejected: PropTypes.bool
    })
  }).isRequired
};

Table.defaultProps = {
  records: [],
  filteredSortedRecords: [],
  columns: []
};

export default inject("store")(observer(Table));
