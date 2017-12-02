import { types, getType, getParent, getRoot } from "mobx-state-tree";
import { isEmpty, uniq } from "lodash";
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
      get columnKey() {
        return getParent(self).key;
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
    selectedValues: types.optional(types.array(types.string), [])
  })
  .views(self => ({
    get uniqueColumnValues() {
      const { animals } = getRoot(self);

      return uniq(animals.map(animal => animal[self.columnKey]));
    },
    isSelected: value => self.selectedValues.includes(value)
  }))
  .actions(self => ({
    toggleValue: value =>
      self.selectedValues.includes(value)
        ? self.selectedValues.remove(value)
        : self.selectedValues.push(value)
  }));

export const RangeFilter = createModelFromBase(
  (record, { selectedRange: [min, max] }) =>
    record >= min && record <= max
)
  .named(FILTER_TYPES.RANGE_FILTER)
  .props({
    selectedRange: types.optional(types.array(types.number), [])
  })
  .views(self => ({
    get columnMinMaxRange() {
      const { animals } = getRoot(self);
      const values = animals.map(animal => animal[self.columnKey]);

      return [Math.min(...values), Math.max(...values)];
    }
  }))
  .actions(self => ({
    setSelectedRange: range => (self.selectedRange = range),
    afterAttach: () => {
      if (isEmpty(self.selectedRange)) {
        self.setSelectedRange(self.columnMinMaxRange);
      }
    }
  }));
