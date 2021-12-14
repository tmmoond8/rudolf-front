import React from 'react';
import styled from '@emotion/styled';
import SpreadSheet from 'react-spreadsheet';
import { colors } from 'notion-ui';
import { debounce } from 'throttle-debounce';

export default function WordBookEditor() {
  const [wordBook, setWordBook] = React.useState(
    Array.from({ length: 10 }).map((_) => [
      {
        value: '',
      },
      {
        value: '',
      },
    ])
  );
  const handleOnChange = debounce(
    300,
    React.useCallback((d) => {
      console.log('d', d);
    }, [])
  );

  console.log('wordBook', wordBook);
  const HeaderRow = () => (
    <tr>
      <th className="Spreadsheet__header">순번</th>
      <th className="Spreadsheet__header">단어</th>
      <th className="Spreadsheet__header">뜻</th>
    </tr>
  );

  return (
    <Wrapper>
      <SpreadSheet
        data={wordBook}
        onChange={handleOnChange}
        HeaderRow={HeaderRow}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;

  .Spreadsheet {
    width: 100%;
    color: ${colors.grey60};
    background-color: ${colors.transparent};

    table {
      width: 100%;
      colgroup col:nth-child(1) {
        width: 60px;
      }

      tr {
        line-height: 1.4em;
      }

      th,
      td {
        background-color: ${colors.transparent};
        text-align: center;
      }
      tbody tr .Spreadsheet__header {
        font-size: 12px;
        color: ${colors.red};
        border: none;
      }
    }

    .Spreadsheet__active-cell,
    .Spreadsheet__floating-rect--selected,
    .Spreadsheet__floating-rect--copied {
      background: ${colors.grey16};
      border: 2px ${colors.red50} solid;
    }

    .Spreadsheet__data-editor {
      background-color: ${colors.backgroundEmbed};
    }
  }
`;
