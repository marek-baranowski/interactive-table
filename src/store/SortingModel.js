import { types } from "mobx-state-tree";
import { SORT_ORDER_TYPES } from "../config";

const orderTypes = Object.values(SORT_ORDER_TYPES);

export default types
  .model("SortingModel", {
    column: types.maybe(types.string),
    order: types.maybe(types.string)
  })
  .actions(self => ({
    toggleColumnSorting: columnKey => {
      if (self.column !== columnKey) {
        self.column = columnKey;
        self.order = orderTypes[0];
        return;
      }

      const i = orderTypes.indexOf(self.order);
      if (i === orderTypes.length - 1) {
        self.column = null;
        self.order = null;
        return;
      }

      self.order = orderTypes[i + 1];
    }
  }));
