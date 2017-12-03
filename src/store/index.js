import {
  StringFilterModel,
  MultiSelectFilterModel,
  RangeFilterModel
} from "./FilterModels";
import DataStore from "./DataStore";
import { petService } from "../service";

export const createStore = () => {
  const columns = [
    {
      key: "name",
      header: "Name",
      filter: StringFilterModel.create()
    },
    {
      key: "animal",
      header: "Animal",
      filter: MultiSelectFilterModel.create()
    },
    { key: "colour", header: "Colour" },
    { key: "pattern", header: "Pattern" },
    { key: "rating", header: "Rating", sortable: true },
    {
      key: "price",
      header: "Price",
      filter: RangeFilterModel.create(),
      sortable: true
    }
  ];

  return DataStore.create({ columns }, { service: petService.fetch });
};
