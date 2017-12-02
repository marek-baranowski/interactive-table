import { types } from "mobx-state-tree";
import { uniq, orderBy } from "lodash";
import { StringFilter, MultiSelectFilter, RangeFilter } from "./Filters";
import { SORTING_ORDER_TYPES } from "../settings";

export const getRange = array => [Math.min(...array), Math.max(...array)];

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
    setSorting: column => {
      if (self.column !== column) {
        self.column = column;
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
    animals: types.array(Animal),
    columns: types.array(Column),
    sorting: types.optional(Sorting, {})
  })
  .views(self => ({
    get filters() {
      return self.columns
        .filter(({ filter }) => !!filter)
        .map(({ filter }) => filter);
    },
    get filteredAnimals() {
      const { animals, filters, sorting } = self;
      const filtered = animals.filter(animal =>
        filters.map(({ compare }) => compare(animal)).every(result => result)
      );

      return sorting.column
        ? orderBy(filtered, sorting.column, sorting.order)
        : filtered;
    },
    get uniqueValues() {
      return uniq(self.animals.map(({ animal }) => animal));
    },
    get pricesRange() {
      const prices = self.animals.map(({ price }) => price);

      return getRange(prices);
    }
  }));
