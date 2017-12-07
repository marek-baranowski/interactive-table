import { COLUMNS } from "../config";
import DataStore from "./DataStore";
import { petService } from "../service";

export const createStore = () => {
  return DataStore.create({ columns: COLUMNS }, { service: petService.fetch });
};
