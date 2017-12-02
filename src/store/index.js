import {
  StringFilterModel,
  MultiSelectFilterModel,
  RangeFilterModel
} from "./FilterModels";
import DataStore from "./DataStore";
import { petService } from "../service";
import { ANIMAL_KEYS } from "../config";

export const createStore = () => {
  const columns = [
    {
      key: ANIMAL_KEYS.NAME,
      header: "Name",
      filter: StringFilterModel.create()
    },
    {
      key: ANIMAL_KEYS.ANIMAL,
      header: "Animal",
      filter: MultiSelectFilterModel.create()
    },
    { key: ANIMAL_KEYS.COLOUR, header: "Colour" },
    { key: ANIMAL_KEYS.PATTERN, header: "Pattern" },
    { key: ANIMAL_KEYS.RATING, header: "Rating", sortable: true },
    {
      key: ANIMAL_KEYS.PRICE,
      header: "Price",
      filter: RangeFilterModel.create(),
      sortable: true
    }
  ];

  return DataStore.create({ columns }, { service: petService.fetch });
};
