import { SORT_ORDER_TYPES } from "config";
import { getSnapshot } from "mobx-state-tree";
import { MultiSelectFilterModel } from "../FilterModels";

test("toggleValue", () => {
  const instance = MultiSelectFilterModel.create();
  const values = ["foo", "bar", "baz"];

  values.forEach(instance.toggleValue);

  expect(getSnapshot(instance).selectedValues).toEqual(values);
});

test("toggleValue called twice with the same value", () => {
  const instance = MultiSelectFilterModel.create();
  const snapshot = getSnapshot(instance);

  const value = "foo";
  instance.toggleValue(value);
  instance.toggleValue(value);

  expect(snapshot).toEqual(getSnapshot(instance));
});

test("isSelected", () => {
  const instance = MultiSelectFilterModel.create();
  const value = "foo";

  expect(instance.isSelected(value)).toEqual(false);

  instance.toggleValue(value);
  expect(instance.isSelected(value)).toEqual(true);
});

test("isActive", () => {
  const instance = MultiSelectFilterModel.create();
  const value = "foo";

  expect(instance.isActive).toEqual(false);

  instance.toggleValue(value);
  expect(instance.isActive).toEqual(true);
});

test("validateValue", () => {
  const instance = MultiSelectFilterModel.create({
    selectedValues: ["foo", "bar"]
  });

  expect(instance.validateValue("")).toEqual(false);
  expect(instance.validateValue("baz")).toEqual(false);
  expect(instance.validateValue("foo")).toEqual(true);
  expect(instance.validateValue("bar")).toEqual(true);
});
