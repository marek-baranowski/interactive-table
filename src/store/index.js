import { StringFilter, MultiSelectFilter, RangeFilter } from "./Filters";
import { PetStore } from "./PetStore";
import { petService } from "../service";
import { ANIMAL_KEYS } from "../config";

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

  const store = PetStore.create({
    columns
  });
  store.fetchRecords(petService.fetch);

  return store;
};
