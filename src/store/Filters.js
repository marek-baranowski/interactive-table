import { types, getType } from "mobx-state-tree";
import { FILTER_TYPES } from "../settings";

/* base properties and methods for all filters */
export const createModelFromBase = comparator =>
  types
    .model({
      isVisible: false
    })
    .views(self => ({
      get type() {
        return getType(self).name;
      },
      compare: record => comparator(record, self)
    }))
    .actions(self => ({
      toggleVisibility: () => (self.isVisible = !self.isVisible)
    }));

export const StringFilter = createModelFromBase((record, { value }) =>
  record.toUpperCase().startsWith(value.toUpperCase())
)
  .named(FILTER_TYPES.STRING_FILTER)
  .props({
    value: ""
  })
  .actions(self => ({
    setValue: value => (self.value = value)
  }));

export const MultiSelectFilter = createModelFromBase(
  (record, { selectedValues, isSelected }) =>
    selectedValues.length > 0 ? isSelected(record) : true
)
  .named(FILTER_TYPES.MULTI_SELECT_FILTER)
  .props({
    selectedValues: types.array(types.string)
  })
  .views(({ selectedValues }) => ({
    isSelected: value => selectedValues.includes(value)
  }))
  .actions(self => ({
    toggleValue: value =>
      self.selectedValues.includes(value)
        ? self.selectedValues.remove(value)
        : self.selectedValues.push(value)
  }));

export const RangeFilter = createModelFromBase(
  (record, { selectedRange }) =>
    record >= selectedRange[0] && record <= selectedRange[1]
)
  .named(FILTER_TYPES.RANGE_FILTER)
  .props({
    selectedRange: types.array(types.number)
  })
  .actions(self => ({
    setSelectedRange: range => (self.selectedRange = range)
  }));
