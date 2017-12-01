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
  { key: keys.NAME, header: "Name" },
  { key: keys.ANIMAL, header: "Animal" },
  { key: keys.COLOUR, header: "Colour" },
  { key: keys.PATTERN, header: "Pattern" },
  { key: keys.RATING, header: "Rating" },
  { key: keys.PRICE, header: "Price" }
];

export const createStore = () =>
  PetStore.create({
    animals: data,
    columns,
    filters: [
      StringFilter.create(),
      MultiSelectFilter.create({ selectedValues: [] }),
      RangeFilter.create({
        selectedRange: getRange(data.map(({ price }) => price))
      })
    ]
  });
