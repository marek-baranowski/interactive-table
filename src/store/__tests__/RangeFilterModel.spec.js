import { getSnapshot } from "mobx-state-tree";
import { RangeFilterModel } from "../FilterModels";

test.skip("setMaxRange", () => {
  const instance = RangeFilterModel.create();
  const range = [0, 100];

  instance.setMaxRange(range);

  const snapshot = getSnapshot(instance);
  expect(snapshot.maxRange).toEqual(range);
  expect(snapshot.selectedRange).toEqual(range);
});
