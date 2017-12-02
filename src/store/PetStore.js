import { types } from "mobx-state-tree";
import uniq from "lodash/uniq";
import { StringFilter, MultiSelectFilter, RangeFilter } from "./Filters";

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
  filter: types.maybe(types.union(StringFilter, MultiSelectFilter, RangeFilter))
});

export const PetStore = types
  .model({
    animals: types.array(Animal),
    columns: types.array(Column)
  })
  .views(self => ({
    get filters() {
      return self.columns.filter(({filter}) => !!filter).map(({filter}) => filter);
    },
    get filteredAnimals() {
      return self.animals.filter(animal =>
        self.filters
          .map(({ compare }) => compare(animal))
          .every(result => result)
      );
    },
    get uniqueValues() {
      return uniq(self.animals.map(({ animal }) => animal));
    },
    get pricesRange() {
      const prices = self.animals.map(({ price }) => price);

      return getRange(prices);
    }
  }));
