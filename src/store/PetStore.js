import { types } from "mobx-state-tree";
import orderBy from "lodash/orderBy";
import { StringFilter, MultiSelectFilter, RangeFilter } from "./Filters";
import { SORTING_ORDER_TYPES } from "../settings";

export const Animal = types.model({
  name: types.string,
  animal: types.string,
  colour: types.string,
  pattern: types.string,
  rating: types.number,
  price: types.number
});

export const Column = types.model({
  key: types.string,
  header: types.string,
  filter: types.maybe(
    types.union(StringFilter, MultiSelectFilter, RangeFilter)
  ),
  sortable: types.maybe(types.boolean)
});

const orderTypes = Object.values(SORTING_ORDER_TYPES);
export const Sorting = types
  .model({
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

export const PetStore = types
  .model({
    records: types.array(Animal),
    columns: types.array(Column),
    sorting: types.optional(Sorting, {})
  })
  .views(self => ({
    get columnsWithFilter() {
      return self.columns.filter(({ filter }) => !!filter);
    },
    get filteredSortedRecords() {
      const { records, columnsWithFilter, sorting } = self;
      const filtered = records.filter(record =>
        columnsWithFilter
          .map(({ filter }) => filter.compare(record))
          .every(result => result)
      );

      return sorting.column
        ? orderBy(filtered, sorting.column, sorting.order)
        : filtered;
    }
  }));
