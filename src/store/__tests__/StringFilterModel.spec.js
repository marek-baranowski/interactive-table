import { SORT_ORDER_TYPES } from "config";
import { types, hasParent } from "mobx-state-tree";
import { StringFilterModel } from "../FilterModels";

test.skip("should have column as a parent and return column key", () => {
  const columnKey = "foo";
  const ColumnMock = types.model({
    key: columnKey,
    filter: StringFilterModel
  });

  const columnInstance = ColumnMock.create({
    filter: StringFilterModel.create()
  });
  expect(hasParent(columnInstance.filter)).toEqual(true);
  expect(columnInstance.filter.columnKey).toEqual(columnKey);
});

test.skip("should allow to set filter data and derivative fields should auto-update accordingly", () => {
  const instance = StringFilterModel.create();

  expect(instance.value).toEqual("");
  expect(instance.isActive).toEqual(false);

  const testValue = "foo";
  instance.setValue(testValue);
  expect(instance.getFilterData()).toEqual(instance.value);
  expect(instance.value).toEqual(testValue);
  expect(instance.isActive).toEqual(true);
});

test.skip("proper filtering behaviour", () => {
  const instance = StringFilterModel.create();

  expect(instance.value).toEqual("");
  expect(instance.isActive).toEqual(false);

  const testValue = "foo";
  instance.setValue(testValue);
  expect(instance.getFilterData()).toEqual(instance.value);
  expect(instance.value).toEqual(testValue);
  expect(instance.isActive).toEqual(true);
});

test.skip("isActive", () => {
  const instance = StringFilterModel.create();

  expect(instance.value).toEqual("");
  expect(instance.isActive).toEqual(false);

  instance.setValue("foo");
  expect(instance.isActive).toEqual(true);

  instance.setValue("");
  expect(instance.isActive).toEqual(false);
});

test.skip("validator", () => {
  const instance = StringFilterModel.create();

  instance.setValue("Foo");
  expect(instance.validator()).toEqual(true);

  instance.setValue("");
  expect(instance.isActive).toEqual(false);
});
