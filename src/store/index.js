import { observable } from "mobx";
import data from "./data";

const columns = [
  { key: "name", header: "Name" },
  { key: "animal", header: "Animal" },
  { key: "colour", header: "Colour" },
  { key: "pattern", header: "Patter" },
  { key: "rating", header: "Rating" },
  { key: "price", header: "Price" }
];

export default observable({
  columns,
  data
});
