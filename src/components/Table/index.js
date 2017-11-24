import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { petService } from "../../service";

const columns = [
  { key: "name", header: "Name" },
  { key: "animal", header: "Animal" },
  { key: "colour", header: "Colour" },
  { key: "pattern", header: "Patter" },
  { key: "rating", header: "Rating" },
  { key: "price", header: "Price" }
];

export default class extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    petService
      .fetch()
      .then(
        data => this.setState({ data }),
        console.error.bind(console, "ERROR:")
      );
  }
  render() {
    return (
      <BootstrapTable data={this.state.data} striped hover>
        {columns.map(({ key, header }, i) => (
          <TableHeaderColumn isKey={i === 0} dataField={key} key={key}>
            {header}
          </TableHeaderColumn>
        ))}
      </BootstrapTable>
    );
  }
}
