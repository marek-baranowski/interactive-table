import React from "react";
import { Popover, PopoverBody } from "reactstrap";
import { observer } from "mobx-react";
import { iconStyles } from "../ColumnHeader/styles";
import StringFilter from "../StringFilter";
import MultiSelectFilter from "../MultiSelectFilter";
import RangeFilter from "../RangeFilter";
import { FILTER_TYPES } from "config";

class FilterButton extends React.Component {
  handleRef = element => {
    !!element && (this.popoverTarget = element);
  };

  render() {
    const { filter } = this.props;

    if (!filter) {
      return null;
    }

    const iconProps = {
      ref: this.handleRef,
      onClick: filter.toggleVisibility,
      className: `fa fa-filter ${iconStyles}${filter.isActive
        ? " text-primary"
        : ""}`
    };

    return (
      <span>
        <i {...iconProps} />
        <Popover
          placement="top"
          isOpen={filter.isVisible}
          target={() => this.popoverTarget}
          toggle={filter.toggleVisibility}
        >
          <PopoverBody>
            {
              {
                [FILTER_TYPES.STRING_FILTER]: <StringFilter {...{ filter }} />,
                [FILTER_TYPES.MULTI_SELECT_FILTER]: (
                  <MultiSelectFilter {...{ filter }} />
                ),
                [FILTER_TYPES.RANGE_FILTER]: <RangeFilter {...{ filter }} />
              }[filter.type]
            }
          </PopoverBody>
        </Popover>
      </span>
    );
  }
}

export default observer(FilterButton);
