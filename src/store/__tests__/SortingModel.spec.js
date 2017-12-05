import { SORT_ORDER_TYPES } from "config";
import SortingModel from "../SortingModel";

describe("toggleColumnSorting", () => {
  let instance;

  beforeEach(() => {
    instance = SortingModel.create();
  });

  test("fired in sequence for the same column, should set subsequent order types and reset at the end", () => {
    const columnKey = "foo";

    Object.values(SORT_ORDER_TYPES).forEach(orderType => {
      instance.toggleColumnSorting(columnKey);
      expect(instance.column).toEqual(columnKey);
      expect(instance.order).toEqual(orderType);
    });

    instance.toggleColumnSorting(columnKey);
    expect(instance.column).toBeNull();
    expect(instance.order).toBeNull();
  });

  test("properly handles column change", () => {
    const columnFoo = "foo";
    const columnBar = "bar";

    instance.toggleColumnSorting(columnFoo);
    instance.toggleColumnSorting(columnFoo);
    expect(instance.column).toEqual(columnFoo);
    expect(instance.order).toEqual(SORT_ORDER_TYPES.DESCENDING);

    instance.toggleColumnSorting(columnBar);
    expect(instance.column).toEqual(columnBar);
    expect(instance.order).toEqual(SORT_ORDER_TYPES.ASCENDING);
  });
});
