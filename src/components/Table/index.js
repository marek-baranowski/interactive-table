import React from "react";
import { inject, observer } from "mobx-react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

export default inject(store => store)(
  observer(({ data, columns }) => {
    return (
      <BootstrapTable data={data} striped hover>
        {columns.map(({ key, header }, i) => (
          <TableHeaderColumn isKey={i === 0} dataField={key} key={key}>
            {header}
          </TableHeaderColumn>
        ))}
      </BootstrapTable>
    );
  })
);
