import { useStrict } from "mobx";
import { types } from "mobx-state-tree";
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
  .model("PetStore", {
    animals: types.array(Animal),
    columns: types.array(Column),
    filters: types.array(Filter)
  })
  .views(self => ({
    get filteredAnimals() {
      return self.animals.filter(animal => stringComparator(animal.name, self.filters[0].value))
    }
  }));

export default PetStore.create({
  animals: data,
  columns,
  filters: [Filter.create()]
});
