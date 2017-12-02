import { StringFilter, MultiSelectFilter, RangeFilter } from "./Filters";
import { PetStore, getRange } from "./PetStore";
import data from "./data";

const keys = {
  NAME: "name",
  ANIMAL: "animal",
  COLOUR: "colour",
  PATTERN: "pattern",
  RATING: "rating",
  PRICE: "price"
};

const columns = [
  { key: keys.NAME, header: "Name", filter: StringFilter.create() },
  {
    key: keys.ANIMAL,
    header: "Animal",
    filter: MultiSelectFilter.create({ selectedValues: [] })
  },
  { key: keys.COLOUR, header: "Colour" },
  { key: keys.PATTERN, header: "Pattern" },
  { key: keys.RATING, header: "Rating", sortable: true },
  {
    key: keys.PRICE,
    header: "Price",
    filter: RangeFilter.create({
      selectedRange: getRange(data.map(({ price }) => price))
    }),
    sortable: true
  }
];

export const createStore = () =>
  PetStore.create({
    animals: data,
    columns
  });
