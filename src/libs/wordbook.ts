export const wordBookStringify = (spreadsheet: { value: string }[][]) =>
  JSON.stringify(
    spreadsheet.map(([{ value: word }, { value: description }]) => ({
      word,
      description,
    }))
  );
