import { StringFilter, MultiSelectFilter, RangeFilter } from "./Filters";
import { PetStore } from "./PetStore";
import data from "./data";
import { ANIMAL_KEYS } from "../settings";

export const createStore = () => {
  const columns = [
    { key: ANIMAL_KEYS.NAME, header: "Name", filter: StringFilter.create() },
    {
      key: ANIMAL_KEYS.ANIMAL,
      header: "Animal",
      filter: MultiSelectFilter.create()
    },
    { key: ANIMAL_KEYS.COLOUR, header: "Colour" },
    { key: ANIMAL_KEYS.PATTERN, header: "Pattern" },
    { key: ANIMAL_KEYS.RATING, header: "Rating", sortable: true },
    {
      key: ANIMAL_KEYS.PRICE,
      header: "Price",
      filter: RangeFilter.create(),
      sortable: true
    }
  ];

  return PetStore.create({
    records: data,
    columns
  });
};
