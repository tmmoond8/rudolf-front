import type { SpreadsheetData, WordBook, Cell } from '../types/model';

export const wordBookStringify = (spreadsheet: SpreadsheetData) =>
  JSON.stringify(
    spreadsheet.map(([{ value: word }, { value: description }]: any) => ({
      word,
      description,
    }))
  );

export const contentsToSpreadsheetData = (
  contents: WordBook['contents']
): SpreadsheetData => {
  return contents.map(({ word, description }) => [
    { value: word },
    { value: description },
  ]);
};

export function insertInto(
  data: SpreadsheetData,
  index: number,
  row: [Cell, Cell]
) {
  return [...data.slice(0, index), row, ...data.slice(index, -1)];
}

export function removeFrom(data: SpreadsheetData, index: number) {
  return data.filter((_, idx) => idx !== index);
}
