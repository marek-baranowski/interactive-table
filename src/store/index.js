import { useStrict, observable, action } from "mobx";
import data from "./data";

useStrict(true);

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

const filters = observable({
  [keys.NAME]: {
    value: "",
    setValue: action(function(value) {
      this.value = value;
    })
  }
});

export default observable({
  columns,
  filters,
  animals: data
});
