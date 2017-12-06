import React from "react";
import toJson from "enzyme-to-json";
import { Table } from "../index";
import { FILTER_TYPES, COLUMNS } from "config";
import records from "store/__mockData__/records";
import DataStore from "store/DataStore";
import { data, fetchData } from "store/data";

test.skip("renders correctly", () => {
  const tableProps = {
    store: DataStore.create({ columns: COLUMNS, records })
  };

  const wrapper = mount(<Table {...tableProps} />);

  expect(toJson(wrapper)).toMatchSnapshot();
});
