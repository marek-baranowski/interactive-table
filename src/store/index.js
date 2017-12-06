import { COLUMNS } from "../config";
import DataStore from "./DataStore";
// import { petService } from "../service";
import { data } from "./data";

export const createStore = () => {
  return DataStore.create({ columns: COLUMNS, records: data });
};
