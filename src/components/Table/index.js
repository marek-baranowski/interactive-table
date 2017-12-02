import React from "react";
import { inject, observer } from "mobx-react";
import {
  Input,
  Label,
  Popover,
  PopoverBody,
  Button
} from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Range, createSliderWithTooltip } from "rc-slider";
import { FILTER_TYPES } from "../../settings";

const RangeWithTooltip = createSliderWithTooltip(Range);

const filterTypesToComponentsMapping = {
  [FILTER_TYPES.STRING_FILTER]: filter => (
    <Input
      value={filter.value}
      onChange={({ target }) => filter.setValue(target.value)}
    />
  ),
  [FILTER_TYPES.MULTI_SELECT_FILTER]: (filter, { uniqueValues }) => (
    <div>
      {uniqueValues.map((value, i) => (
        <Label check key={i}>
          <Input
            type="checkbox"
            checked={filter.isSelected(value)}
            onChange={() => filter.toggleValue(value)}
          />{" "}
          {value}
        </Label>
      ))}
    </div>
  ),
  [FILTER_TYPES.RANGE_FILTER]: (filter, { pricesRange: [min, max] }) => (
    <RangeWithTooltip
      {...{
        style: { width: 100 },
        min,
        max,
        value: filter.selectedRange.peek(),
        onChange: filter.setSelectedRange
      }}
    />
  )
};

export default inject("store")(
  observer(({ store }) => {
    const { filteredAnimals, columns } = store;

    return (
      <div>
        <BootstrapTable data={filteredAnimals} striped hover>
          {columns.map(({ key, header, filter }, i) => (
            <TableHeaderColumn isKey={i === 0} dataField={key} key={key}>
              {header}
              {filter && (
                <span>
                  <Button id={key} onClick={filter.toggleVisibility}>
                    F
                  </Button>
                  <Popover
                    placement="bottom"
                    isOpen={filter.isVisible}
                    target={key}
                    toggle={filter.toggleVisibility}
                  >
                    <PopoverBody>
                      {filterTypesToComponentsMapping[filter.type](
                        filter,
                        store
                      )}
                    </PopoverBody>
                  </Popover>
                </span>
              )}
            </TableHeaderColumn>
          ))}
        </BootstrapTable>
      </div>
    );
  })
);
