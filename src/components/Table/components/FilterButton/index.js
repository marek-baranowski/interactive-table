import React from "react";
import PropTypes from "prop-types";
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
      className: `fa fa-filter ${filter.isActive ? " text-primary" : ""}`
    };

    return (
      <span className={iconStyles} onClick={filter.toggleVisibility}>
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
                [FILTER_TYPES.STRING_FILTER]: filter => <StringFilter {...{ filter }} />,
                [FILTER_TYPES.MULTI_SELECT_FILTER]: (
                  filter => <MultiSelectFilter {...{ filter }} />
                ),
                [FILTER_TYPES.RANGE_FILTER]: filter => <RangeFilter {...{ filter }} />
              }[filter.type](filter)
            }
          </PopoverBody>
        </Popover>
      </span>
    );
  }
}

FilterButton.propTypes = {
  filter: PropTypes.shape({
    isActive: PropTypes.bool.isRequired,
    isVisible: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    toggleVisibility: PropTypes.func.isRequired
  })
};

export default observer(FilterButton);
