import React from 'react';
import { colors } from 'notion-ui';
import styled from '@emotion/styled';

export default function WordBookEditor() {
  const cells = React.useRef([]);
  return (
    <div>
      <Table>
        <thead>
          {/* <th>순서</th> */}
          <tr>
            <th>단어</th>
            <th>뜻</th>
          </tr>
        </thead>
        <tbody>
          {'abcsdf'.split('').map((_, idx) => (
            <tr key={`word-row-${idx}`}>
              <td>
                <input type="text"></input>
              </td>
              <td>
                <input type="text"></input>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const Table = styled.table`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  color: ${colors.grey60};
  thead {
    width: 100%;
    color: ${colors.grey16};
  }

  thead > tr > th,
  tbody > tr > td {
    height: 32px;
    line-height: 31px;
    padding: 0;
    margin: 0;
    border: 1px solid ${colors.grey08};
  }

  td > input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    color: ${colors.grey60};
    padding: 4px 8px;
    outline: none;
  }
`;
