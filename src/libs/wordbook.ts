import type { SpreadsheetData, WordBook } from '../types/model';

export const wordBookStringify = (spreadsheet: SpreadsheetData) =>
  JSON.stringify(
    spreadsheet.map(([{ value: word }, { value: description }]: any) => ({
      word,
      description,
    }))
  );

export const contentsToSpreadsheetData = (
  contents: WordBook['attributes']['contents']
): SpreadsheetData => {
  return contents.map(({ word, description }) => [
    { value: word },
    { value: description },
  ]);
};
