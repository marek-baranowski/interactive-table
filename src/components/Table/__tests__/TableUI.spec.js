import React from "react";
import toJson from "enzyme-to-json";
import { COLUMNS, ASYNC_STATES } from "config";
import records from "store/__mockData__/records";
import DataStore from "store/DataStore";
import { Table } from "../index";

test("loading message displayed when data fetching", () => {
  const tableProps = {
    store: DataStore.create({ columns: COLUMNS, requestStatus: { status: ASYNC_STATES.PENDING } })
  };

  const wrapper = mount(<Table {...tableProps} />);

  expect(toJson(wrapper)).toMatchSnapshot();
});

test("error message displayed when promise rejected", () => {
  const tableProps = {
    store: DataStore.create({ columns: COLUMNS, requestStatus: { status: ASYNC_STATES.REJECTED } })
  };

  const wrapper = mount(<Table {...tableProps} />);

  expect(toJson(wrapper)).toMatchSnapshot();
});

test("full UI", () => {
  const tableProps = {
    store: DataStore.create({ columns: COLUMNS, records })
  };

  const wrapper = mount(<Table {...tableProps} />);

  expect(toJson(wrapper)).toMatchSnapshot();
});
