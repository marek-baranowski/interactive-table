import { getSnapshot } from "mobx-state-tree";
import { RangeFilterModel } from "../FilterModels";

test("setMaxRange", () => {
  const instance = RangeFilterModel.create();
  const range = [0, 100];

  instance.setMaxRange(range);

  const snapshot = getSnapshot(instance);
  expect(snapshot.maxRange).toEqual(range);
  expect(snapshot.selectedRange).toEqual(range);
});

test("setMaxRange called with range different that current, resets selected range", () => {
  const range = [0, 100];
  const selectedRange = [20, 50];
  const instance = RangeFilterModel.create({
    maxRange: range,
    selectedRange: selectedRange
  });

  const newRange = [1, 99];
  instance.setMaxRange(newRange);

  const snapshot = getSnapshot(instance);
  expect(snapshot.maxRange).toEqual(newRange);
  expect(snapshot.selectedRange).toEqual(newRange);
});

test("setMaxRange called with range same as current, does nothing", () => {
  const range = [0, 100];
  const selectedRange = [20, 50];
  const instance = RangeFilterModel.create({
    maxRange: range,
    selectedRange: selectedRange
  });

  instance.setMaxRange(range);

  const snapshot = getSnapshot(instance);
  expect(snapshot.selectedRange).toEqual(selectedRange);
});
