import { types } from "mobx-state-tree";

/* all filters should have 'compare' method */
export const createModelFromBase = (filterModel, comparator) =>
  types.model(filterModel).views(self => ({
    compare: record => comparator(record, self)
  }));

export const StringFilter = createModelFromBase(
  {
    value: ""
  },
  (animal, { value }) =>
    animal.name.toUpperCase().startsWith(value.toUpperCase())
).actions(self => ({
  setValue: value => (self.value = value)
}));

export const MultiSelectFilter = createModelFromBase(
  {
    selectedValues: types.array(types.string)
  },
  (animal, { selectedValues, isSelected }) =>
    selectedValues.length > 0 ? isSelected(animal.animal) : true
)
  .views(self => ({
    isSelected: value => self.selectedValues.includes(value)
  }))
  .actions(self => ({
    toggleValue: value =>
      self.selectedValues.includes(value)
        ? self.selectedValues.remove(value)
        : self.selectedValues.push(value)
  }));

export const RangeFilter = createModelFromBase(
  {
    selectedRange: types.array(types.number)
  },
  (animal, { selectedRange }) =>
    animal.price >= selectedRange[0] && animal.price <= selectedRange[1]
).actions(self => ({
  setSelectedRange: range => (self.selectedRange = range)
}));
