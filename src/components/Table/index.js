import React from "react";
import { inject, observer } from "mobx-react";
import { Input, Label, Popover, PopoverBody } from "reactstrap";
import { css } from "glamor";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Range, createSliderWithTooltip } from "rc-slider";
import { FILTER_TYPES, SORTING_ORDER_TYPES } from "../../settings";

const RangeWithTooltip = createSliderWithTooltip(Range);

const headerTitleStyles = css({
  flex: 1,
  padding: "0 5px"
});

const iconStyles = css({
  cursor: "pointer",
  fontWeight: "normal"
});

const sortingIconsMapping = {
  [SORTING_ORDER_TYPES.ASCENDING]: "sort-asc",
  [SORTING_ORDER_TYPES.DESCENDING]: "sort-desc",
  none: "sort"
};

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
    const { filteredAnimals, columns, sorting } = store;

    return (
      <div>
        <BootstrapTable data={filteredAnimals} striped hover>
          {columns.map(({ key, header, filter, sortable }, i) => (
            <TableHeaderColumn isKey={i === 0} dataField={key} key={key}>
              <div className="d-flex">
                {sortable && (
                  <span>
                    <i
                      className={`fa fa-${sortingIconsMapping[
                        sorting.column === key && !!sorting.order
                          ? sorting.order
                          : "none"
                      ]} ${iconStyles}`}
                      onClick={() => sorting.setSorting(key)}
                    />
                  </span>
                )}
                <span {...headerTitleStyles}>{header}</span>
                {filter && (
                  <span>
                    <i
                      className={`fa fa-filter ${iconStyles}`}
                      id={key}
                      onClick={filter.toggleVisibility}
                    />
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
              </div>
            </TableHeaderColumn>
          ))}
        </BootstrapTable>
      </div>
    );
  })
);
