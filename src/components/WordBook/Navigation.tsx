import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors, Button, IconButton } from 'notion-ui';
import { desktop } from '../../styles';

interface Props {
  page: number;
  nexts: number[];
  prevs: number[];
  setPage: (page: number) => void;
}

export default function ({ prevs, page, nexts, setPage }: Props) {
  return (
    <Navigation>
      <li>
        <IconButton icon="chevronLeft" onClick={() => setPage(page - 1)} />
      </li>
      {prevs.map((page) => (
        <li key={page}>
          {page > 0 && (
            <Button
              onClick={() => {
                setPage(page);
              }}
            >
              {page}
            </Button>
          )}
        </li>
      ))}
      <li>
        <Button className="current-page" onClick={() => {}}>
          {page}
        </Button>
      </li>
      {nexts.map((page) => (
        <li key={page}>
          {page > 0 && (
            <Button
              onClick={() => {
                setPage(page);
              }}
            >
              {page}
            </Button>
          )}
        </li>
      ))}
      <li>
        <IconButton icon="chevronRight" onClick={() => setPage(page + 1)} />
      </li>
    </Navigation>
  );
}

const Navigation = styled.ul`
  display: flex;
  position: fixed;
  left: calc(50%);
  top: 45px;
  width: fit-content;
  margin: 0 auto;
  color: ${colors.grey60};
  padding: 8px 82px 22px;
  backdrop-filter: blur(5px);
  transform: translateX(-50%);
  ${desktop(css`
    left: calc((100% + 240px) / 2);
  `)}

  li {
    width: 32px;
  }

  .current-page {
    color: ${colors.red};
  }
`;

export function usePageNavigation(length: number) {
  const [pageSize, setPageSize] = React.useState(20);
  const [page, setPage] = React.useState(1);
  const maxPage = Math.ceil(length / pageSize);

  return {
    page,
    pageSize,
    prevs: [page - 3, page - 2, page - 1],
    nexts: [page + 1, page + 2, page + 3].map((n) => (n > maxPage ? -n : n)),
    setPage: (p: number) => {
      if (p <= 0 || p > maxPage) return;
      setPage(p);
    },
  };
}
