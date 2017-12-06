import { types, flow, getEnv } from "mobx-state-tree";
import orderBy from "lodash/orderBy";
import {
  StringFilterModel,
  MultiSelectFilterModel,
  RangeFilterModel
} from "./FilterModels";
import SortingModel from "./SortingModel";
import AsyncStatusModel from "./AsyncStatusModel";
import { FILTER_TYPES } from "../config";

const ColumnModel = types.model("ColumnModel", {
  key: types.string,
  header: types.string,
  filter: types.maybe(
    types.union(snapshot => {
      return !snapshot
        ? types.null
        : {
            [FILTER_TYPES.STRING_FILTER]: StringFilterModel,
            [FILTER_TYPES.MULTI_SELECT_FILTER]: MultiSelectFilterModel,
            [FILTER_TYPES.RANGE_FILTER]: RangeFilterModel
          }[snapshot.type];
    })
  ),
  sortable: types.maybe(types.boolean)
});

export default types
  .model("DataStore", {
    records: types.optional(types.array(types.frozen), []),
    columns: types.optional(types.array(ColumnModel), []),
    sorting: types.optional(SortingModel, {}),
    requestStatus: types.optional(AsyncStatusModel, {})
  })
  .views(self => ({
    get columnsWithFilter() {
      return self.columns.filter(column => !!column.filter);
    },
    get filteredSortedRecords() {
      const { records, columnsWithFilter, sorting } = self;
      const filtered = records.filter(record =>
        columnsWithFilter
          .map(({ key, filter }) => filter.validateValue(record[key]))
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
    }),
    afterCreate: () => {
      const service = getEnv(self).service;
      !!service && self.fetchRecords(service);
    }
  }));
