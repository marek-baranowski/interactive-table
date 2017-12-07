import React from "react";
import { Simulate } from "react-dom/test-utils";
import { Table } from "../index";
import ColumnHeader from "../components/ColumnHeader";
import FilterButton from "../components/FilterButton";
import SortingButton from "../components/SortingButton";
import { FILTER_TYPES, COLUMNS } from "config";
import records from "store/__mockData__/records";
import DataStore from "store/DataStore";

const findHeaderCell = (wrapper, columnKey) => {
  return wrapper.find(ColumnHeader).filterWhere(columnHeader => {
    const { column } = columnHeader.props();

    return !!column && column.key === columnKey;
  });
};

let wrapper;

beforeAll(() => {
  const tableProps = {
    store: DataStore.create({ columns: COLUMNS, records })
  };

  wrapper = mount(<Table {...tableProps} />);
});

test("string filter", () => {
  const filterButton = findHeaderCell(wrapper, "name")
    .find(FilterButton)
    .first()
    .simulate("click");

  const input = filterButton
    .find("Popover")
    .instance()
    ._popover.querySelector("input");

  input.value = "hat";
  Simulate.change(input);

  const filtered = wrapper.prop("store").filteredSortedRecords;
  expect(filtered).toMatchObject([
    { name: "Hattie" },
    { name: "Hattie" },
    { name: "Hatson" }
  ]);
});

test("multi select filter", () => {
  const initialRecordsState = wrapper.prop("store").filteredSortedRecords;

  const filterButton = findHeaderCell(wrapper, "animal")
    .find(FilterButton)
    .first()
    .simulate("click");

  const selectInputs = filterButton
    .find("Popover")
    .instance()
    ._popover.querySelectorAll("[data-test='multi-select'] input");
  expect(selectInputs).toHaveLength(3);

  const [turtle, dog, snake] = selectInputs;

  snake.checked = true;
  Simulate.change(snake);
  expect(wrapper.prop("store").filteredSortedRecords).toMatchSnapshot();

  dog.checked = true;
  Simulate.change(dog);
  expect(wrapper.prop("store").filteredSortedRecords).toMatchSnapshot();

  turtle.checked = true;
  Simulate.change(turtle);
  expect(wrapper.prop("store").filteredSortedRecords).toMatchObject(
    initialRecordsState
  );
});

test("range filter", () => {
  const initialRecordsState = wrapper.prop("store").filteredSortedRecords;

  const rangeFilter = findHeaderCell(wrapper, "price")
    .first()
    .prop("column").filter;

  rangeFilter.setSelectedRange([492, 736]);
  expect(wrapper.prop("store").filteredSortedRecords).toMatchSnapshot();

  rangeFilter.setSelectedRange([285, 911]);
  expect(wrapper.prop("store").filteredSortedRecords).toMatchObject(
    initialRecordsState
  );
});

test("sorting", () => {
  const initialRecordsState = wrapper.prop("store").filteredSortedRecords;

  const sortingButton = findHeaderCell(wrapper, "rating")
    .find(SortingButton)
    .first();

  sortingButton.simulate("click");
  const ascending = wrapper.prop("store").filteredSortedRecords;
  expect(ascending).toMatchSnapshot();

  sortingButton.simulate("click");
  ascending.reverse();
  expect(wrapper.prop("store").filteredSortedRecords).toEqual(ascending);

  sortingButton.simulate("click");
  expect(wrapper.prop("store").filteredSortedRecords).toEqual(
    initialRecordsState
  );
});
