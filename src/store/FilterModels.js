import { types, getType, getParent, getRoot } from "mobx-state-tree";
import { isEmpty, uniq } from "lodash";
import { FILTER_TYPES } from "../config";

/* common props and methods shared between all filters */
const BaseFilterModel = types
  .model({
    isVisible: false
  })
  .views(self => ({
    get type() {
      return getType(self).name;
    },
    get columnKey() {
      return getParent(self).key;
    },
    get isActive() {
      return self.isPopulated(self.getFilterData());
    },
    isPopulated: filterData => !isEmpty(filterData),
    validateRecord: record => {
      if (!self.isActive) {
        return true; // no need to filter records when Filter is not active
      }

      return self.validator(record);
    },
    validator: () => true,
    getFilterData: () => null
  }))
  .actions(self => ({
    toggleVisibility: () => (self.isVisible = !self.isVisible)
  }));

export const StringFilterModel = types
  .compose(
    BaseFilterModel,
    types
      .model({
        value: ""
      })
      .views(self => ({
        getFilterData: () => self.value,
        validator: record =>
          record[self.columnKey]
            .toUpperCase()
            .startsWith(self.value.toUpperCase())
      }))
      .actions(self => ({
        setValue: value => (self.value = value)
      }))
  )
  .named(FILTER_TYPES.STRING_FILTER);

export const MultiSelectFilterModel = types
  .compose(
    BaseFilterModel,
    types
      .model({
        selectedValues: types.optional(types.array(types.string), [])
      })
      .views(self => ({
        get columnDataToPopulateFilter() {
          const { records } = getRoot(self);

          return uniq(records.map(record => record[self.columnKey]));
        },
        isSelected: value => self.selectedValues.includes(value),
        getFilterData: () => self.selectedValues,
        validator: record =>
          self.selectedValues.length > 0
            ? self.isSelected(record[self.columnKey])
            : true
      }))
      .actions(self => ({
        toggleValue: value =>
          self.selectedValues.includes(value)
            ? self.selectedValues.remove(value)
            : self.selectedValues.push(value)
      }))
  )
  .named(FILTER_TYPES.MULTI_SELECT_FILTER);

export const RangeFilterModel = types
  .compose(
    BaseFilterModel,
    types
      .model({
        selectedRange: types.optional(types.array(types.number), [])
      })
      .views(self => ({
        get columnMaxRange() {
          const { records } = getRoot(self);
          const columnData = records.map(record => record[self.columnKey]);

          return [Math.min(...columnData), Math.max(...columnData)];
        },
        get isActive() {
          const { selectedRange, columnMaxRange, isPopulated } = self;

          return (
            isPopulated(selectedRange) &&
            columnMaxRange.toString() !== selectedRange.peek().toString()
          );
        },
        getFilterData: () => self.selectedRange,
        validator: record => {
          const { columnKey, selectedRange: [min, max] } = self;

          return record[columnKey] >= min && record[columnKey] <= max;
        }
      }))
      .actions(self => ({
        setSelectedRange: range => (self.selectedRange = range)
      }))
  )
  .named(FILTER_TYPES.RANGE_FILTER);
