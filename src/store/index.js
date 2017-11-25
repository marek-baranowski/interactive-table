import { useStrict } from "mobx";
import { types } from "mobx-state-tree";
import uniq from "lodash/uniq";
import data from "./data";

useStrict(true);

const stringComparator = (str, target) => str.toUpperCase().startsWith(target.toUpperCase());

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
    setValue: value => self.value = value
  }));

const Filter2 = types
  .model({
    selectedValues: types.array(types.string)
  })
  .views(self => ({
    isSelected: value => self.selectedValues.includes(value)
  }))
  .actions(self => ({
    toggleValue: value => self.selectedValues.includes(value) ?
      self.selectedValues.remove(value) :
      self.selectedValues.push(value)
  }));

const Animal = types
  .model({
    name: types.string,
    animal: types.string,
    colour: types.string,
    pattern: types.string,
    rating: types.number,
    price: types.number
  });

const Column = types
  .model({
    key: types.string,
    header: types.string
  });

const PetStore = types
  .model({
    animals: types.array(Animal),
    columns: types.array(Column),
    filters: types.array(Filter),
    filters2: types.array(Filter2),
  })
  .views(self => ({
    get filteredAnimals() {
      const {filters: [filter], filters2: [filter2]} = self;
      const predicates = [
        animal => stringComparator(animal.name, filter.value),
        animal => filter2.selectedValues.length > 0 ? filter2.isSelected(animal.animal) : true
      ];

      return self.animals.filter(animal => predicates.map(fn => fn(animal)).every(result => result))
    },
    get uniqueValues() {
      return uniq(self.animals.map(({animal}) => animal))
    }
  }));

export default PetStore.create({
  animals: data,
  columns,
  filters: [Filter.create()],
  filters2: [Filter2.create({selectedValues: []})],
});
