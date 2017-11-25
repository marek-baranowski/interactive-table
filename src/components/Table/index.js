import React from "react";
import { inject, observer } from "mobx-react";
import { Input, Label } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Range, createSliderWithTooltip } from 'rc-slider';

const RangeWithTooltip = createSliderWithTooltip(Range);

export default inject("store")(
  observer(({ store }) => {
    const {
      columns,
      filter: [filter],
      filter2: [filter2],
      filter3: [filter3],
      filteredAnimals,
      uniqueValues,
      pricesRange: [min, max]
    } = store;

    return (
      <div>
        <Input
          className="w-25"
          value={filter.value}
          onChange={({ target }) => filter.setValue(target.value)}
        />
        <div>
          {uniqueValues.map((value, i) => (
            <Label check key={i}>
              <Input
                type="checkbox"
                checked={filter2.isSelected(value)}
                onChange={() => filter2.toggleValue(value)}
              />{" "}
              {value}
            </Label>
          ))}
        </div>
        <div className="w-25">
          <RangeWithTooltip {...{min, max, value: filter3.selectedRange.slice(), onChange: filter3.setSelectedRange}} />
        </div>
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
