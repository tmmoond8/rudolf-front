import React from 'react';
import styled from '@emotion/styled';
import Spreadsheet, { Point } from 'react-spreadsheet';
import { colors, ContextMenu, Content, Icon } from 'notion-ui';
import type { SpreadsheetData } from '../../types/model';
import { insertInto, removeFrom } from '../../libs/wordbook';

const HeaderRow = () => (
  <tr>
    <th className="Spreadsheet__header">순번</th>
    <th className="Spreadsheet__header">단어</th>
    <th className="Spreadsheet__header">뜻</th>
  </tr>
);

export default function SpreadsheetEditor({
  data,
  onChange,
}: {
  data: SpreadsheetData;
  onChange: (data: SpreadsheetData) => void;
}) {
  const contextMenu = ContextMenu.useContextMenu();
  const activeRef = React.useRef<Point>(null);
  const handleOpenContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = event.target as HTMLDivElement;
    if (targetElement.classList.contains('Spreadsheet__header')) {
      return;
    }

    contextMenu.open({
      event,
      contents: (
        <>
          <ContextMenu.Item
            left={<Icon icon="add" size="Tiny" />}
            center={<Content.Text fontSize={14}>위에 행 1개 추가</Content.Text>}
            onClick={() => {
              if (activeRef.current) {
                onChange(
                  insertInto(data, activeRef.current.row, [
                    { value: '' },
                    { value: '' },
                  ])
                );
              }
              contextMenu.close();
            }}
          />
          <ContextMenu.Item
            left={<Icon icon="add" size="Tiny" />}
            center={
              <Content.Text fontSize={14}>아래에 행 1개 추가</Content.Text>
            }
            onClick={() => {
              if (activeRef.current) {
                onChange(
                  insertInto(data, activeRef.current.row + 1, [
                    { value: '' },
                    { value: '' },
                  ])
                );
              }
              contextMenu.close();
            }}
          />
          <ContextMenu.HR />
          <ContextMenu.Item
            left={<Icon icon="trash2" size="Small" />}
            center={<Content.Text fontSize={14}>행 삭제</Content.Text>}
            onClick={() => {
              if (activeRef.current) {
                onChange(removeFrom(data, activeRef.current.row));
              }
              contextMenu.close();
            }}
          />
        </>
      ),
    });
  };

  return (
    <Wrapper onContextMenu={handleOpenContextMenu}>
      <Spreadsheet
        data={data}
        onChange={onChange}
        HeaderRow={HeaderRow}
        onActivate={(active: Point) => {
          (activeRef as any).current = active;
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
