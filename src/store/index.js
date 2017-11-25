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

const Filter = types
  .model({
    value: ""
  })
  .actions(self => ({
    setValue: value => (self.value = value)
  }));

const Filter2 = types
  .model({
    selectedValues: types.array(types.string)
  })
  .views(self => ({
    isSelected: value => self.selectedValues.includes(value)
  }))
  .actions(self => ({
    toggleValue: value =>
      self.selectedValues.includes(value)
        ? self.selectedValues.remove(value)
        : self.selectedValues.push(value)
  }));

const Filter3 = types
  .model({
    selectedRange: types.array(types.number)
  })
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
    filter: types.array(Filter),
    filter2: types.array(Filter2),
    filter3: types.array(Filter3)
  })
  .views(self => ({
    get filteredAnimals() {
      const { filter: [filter], filter2: [filter2], filter3: [filter3] } = self;
      const predicates = [
        animal => stringComparator(animal.name, filter.value),
        animal =>
          filter2.selectedValues.length > 0
            ? filter2.isSelected(animal.animal)
            : true,
        ({ price }) =>
          price >= filter3.selectedRange[0] && price <= filter3.selectedRange[1]
      ];

      return self.animals.filter(animal =>
        predicates.map(fn => fn(animal)).every(result => result)
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
  filter: [Filter.create()],
  filter2: [Filter2.create({ selectedValues: [] })],
  filter3: [
    Filter3.create({ selectedRange: getRange(data.map(({ price }) => price)) })
  ]
});
