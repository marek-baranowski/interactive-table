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
    validateValue: value => {
      if (!self.isActive) {
        return true; // no need to validate when filter is not active
      }

      return self.predicate(value);
    },
    predicate: () => true,
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
        predicate: string =>
          string.toUpperCase().startsWith(self.value.toUpperCase())
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
        predicate: value =>
          self.selectedValues.length > 0 ? self.isSelected(value) : true
      }))
      .actions(self => ({
        toggleValue: value =>
          self.selectedValues.includes(value)
            ? self.selectedValues.remove(value)
            : self.selectedValues.push(value)
      }))
  )
  .named(FILTER_TYPES.MULTI_SELECT_FILTER);

/* slice needed in case of Observable arrays */
const rangesEqual = (range1, range2) =>
  range1.slice().toString() === range2.slice().toString();

export const RangeFilterModel = types
  .compose(
    BaseFilterModel,
    types
      .model({
        maxRange: types.optional(types.array(types.number), []),
        selectedRange: types.optional(types.array(types.number), [])
      })
      .views(self => ({
        get isActive() {
          const { selectedRange, maxRange, isPopulated } = self;

          return (
            isPopulated(selectedRange) && !rangesEqual(maxRange, selectedRange)
          );
        },
        getFilterData: () => self.selectedRange,
        predicate: value => {
          const { selectedRange: [min, max] } = self;

          return value >= min && value <= max;
        }
      }))
      .actions(self => ({
        setMaxRange: range => {
          if (rangesEqual(self.maxRange, range)) {
            return;
          }

          self.maxRange = range;
          self.setSelectedRange(range);
        },
        setSelectedRange: range => (self.selectedRange = range)
      }))
  )
  .named(FILTER_TYPES.RANGE_FILTER);
