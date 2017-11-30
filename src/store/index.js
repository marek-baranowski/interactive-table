import { useStrict } from "mobx";
import { types } from "mobx-state-tree";
import uniq from "lodash/uniq";
import data from "./data";

useStrict(true);

const stringComparator = (str, target) =>
  str.toUpperCase().startsWith(target.toUpperCase());
const getRange = array => [Math.min(...array), Math.max(...array)];

const keys = {
  NAME: "name",
  ANIMAL: "animal",
  COLOUR: "colour",
  PATTERN: "pattern",
  RATING: "rating",
  PRICE: "price"
};

const columns = [
  { key: keys.NAME, header: "Name" },
  { key: keys.ANIMAL, header: "Animal" },
  { key: keys.COLOUR, header: "Colour" },
  { key: keys.PATTERN, header: "Pattern" },
  { key: keys.RATING, header: "Rating" },
  { key: keys.PRICE, header: "Price" }
];

const StringFilter = types
  .model({
    value: ""
  })
  .views(self => ({
    compare: animal => stringComparator(animal.name, self.value)
  }))
  .actions(self => ({
    setValue: value => (self.value = value)
  }));

const MultiSelectFilter = types
  .model({
    selectedValues: types.array(types.string)
  })
  .views(self => ({
    isSelected: value => self.selectedValues.includes(value),
    compare: animal => self.selectedValues.length > 0
      ? self.isSelected(animal.animal)
      : true
  }))
  .actions(self => ({
    toggleValue: value =>
      self.selectedValues.includes(value)
        ? self.selectedValues.remove(value)
        : self.selectedValues.push(value)
  }));

const RangeFilter = types
  .model({
    selectedRange: types.array(types.number)
  })
  .views(self => ({
    compare: ({ price }) =>
      price >= self.selectedRange[0] && price <= self.selectedRange[1]
  }))
  .actions(self => ({
    setSelectedRange: range => (self.selectedRange = range)
  }));

const Animal = types.model({
  name: types.string,
  animal: types.string,
  colour: types.string,
  pattern: types.string,
  rating: types.number,
  price: types.number
});

const Column = types.model({
  key: types.string,
  header: types.string
});

const PetStore = types
  .model({
    animals: types.array(Animal),
    columns: types.array(Column),
    filters: types.array(types.union(StringFilter, MultiSelectFilter, RangeFilter))
  })
  .views(self => ({
    get filteredAnimals() {
      return self.animals.filter(animal =>
        self.filters.map(({compare}) => compare(animal)).every(result => result)
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

export default PetStore.create({
  animals: data,
  columns,
  filters: [
    StringFilter.create(),
    MultiSelectFilter.create({ selectedValues: [] }),
    RangeFilter.create({ selectedRange: getRange(data.map(({ price }) => price)) })
  ]
});
