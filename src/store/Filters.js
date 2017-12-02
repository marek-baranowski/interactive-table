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

export const StringFilter = createModelFromBase((animal, { value }) =>
  animal.name.toUpperCase().startsWith(value.toUpperCase())
)
  .named(FILTER_TYPES.STRING_FILTER)
  .props({
    value: ""
  })
  .actions(self => ({
    setValue: value => (self.value = value)
  }));

export const MultiSelectFilter = createModelFromBase(
  (animal, { selectedValues, isSelected }) =>
    selectedValues.length > 0 ? isSelected(animal.animal) : true
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
  (animal, { selectedRange }) =>
    animal.price >= selectedRange[0] && animal.price <= selectedRange[1]
)
  .named(FILTER_TYPES.RANGE_FILTER)
  .props({
    selectedRange: types.array(types.number)
  })
  .actions(self => ({
    setSelectedRange: range => (self.selectedRange = range)
  }));
