import { types, flow } from "mobx-state-tree";
import orderBy from "lodash/orderBy";
import { StringFilter, MultiSelectFilter, RangeFilter } from "./Filters";
import { SORTING_ORDER_TYPES, ASYNC_STATES } from "../config";

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

export const AsyncStatus = types
  .model({
    status: types.optional(
      types.enumeration(Object.values(ASYNC_STATES)),
      ASYNC_STATES.NONE
    ),
    errorMessage: types.maybe(types.string)
  })
  .views(self => ({
    isNone: () => self.status === ASYNC_STATES.PENDING,
    isPending: () => self.status === ASYNC_STATES.PENDING,
    isResolved: () => self.status === ASYNC_STATES.RESOLVED,
    isRejected: () => self.status === ASYNC_STATES.REJECTED
  }))
  .actions(self => ({
    setPending: () => (self.status = ASYNC_STATES.PENDING),
    setResolved: () => (self.status = ASYNC_STATES.RESOLVED),
    setRejected: errorMessage => {
      self.status = ASYNC_STATES.REJECTED;
      self.errorMessage = errorMessage;
    },
    reset: () => {
      self.status = ASYNC_STATES.NONE;
      self.errorMessage = null;
    }
  }));

export const PetStore = types
  .model({
    records: types.optional(types.array(Animal), []),
    columns: types.optional(types.array(Column), []),
    sorting: types.optional(Sorting, {}),
    requestStatus: types.optional(AsyncStatus, AsyncStatus.create())
  })
  .views(self => ({
    get columnsWithFilter() {
      return self.columns.filter(column => !!column.filter);
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
  }))
  .actions(self => ({
    fetchRecords: flow(function*(service) {
      self.requestStatus.setPending();
      try {
        self.records = yield service();
        self.requestStatus.setResolved();
      } catch (error) {
        self.requestStatus.setRejected(error);
      }
    })
  }));
