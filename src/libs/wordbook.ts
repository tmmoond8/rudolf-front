import type { SpreadsheetData } from '../types/model';

export const wordBookStringify = (spreadsheet: SpreadsheetData) =>
  JSON.stringify(
    spreadsheet.map(([{ value: word }, { value: description }]: any) => ({
      word,
      description,
    }))
  );
