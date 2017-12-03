import uniq from "lodash/uniq";

export const findUniqueValues = (records, columnKey) =>
  uniq(records.map(record => record[columnKey]));

export const findMaxRange = (records, columnKey) => {
  const columnData = records.map(record => record[columnKey]);

  return [Math.min(...columnData), Math.max(...columnData)];
};

/* slice needed in case of MobX's observable arrays */
export const rangesEqual = (range1, range2) =>
  range1.slice().toString() === range2.slice().toString();
