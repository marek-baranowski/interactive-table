import React from "react";
import { extendObservable } from "mobx";
import { inject, observer } from "mobx-react";
import { Input, Label } from "reactstrap";
import uniq from "lodash/uniq";

const findUniqueValues = (records, columnKey) => {
  return uniq(records.map(record => record[columnKey]));
};

class MultiSelectFilter extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      get filterValues() {
        const { columnKey, store } = this.props;

        return findUniqueValues(store.records, columnKey)
      }
    })
  }

  render() {
    const { filter } = this.props;

    return (
      <div className="d-flex flex-column">
        {this.filterValues.map((value, i) => (
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
    );
  }
}

export default inject("store")(observer(MultiSelectFilter));
