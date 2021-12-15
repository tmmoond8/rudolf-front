import React from 'react';
import styled from '@emotion/styled';
import { colors } from 'notion-ui';
import type { WordBook as WordBookType } from '../../types/model';
import Navigation, { usePageNavigation } from './Navigation';
import WordBookEditor from './WordBookEditor';

interface Props {
  contents: WordBookType['attributes']['contents'];
}

const WordBook = ({ contents }: Props) => {
  const { page, pageSize, prevs, nexts, setPage } = usePageNavigation(
    contents.length ?? 0
  );
  const listRef = React.useRef<HTMLOListElement>();
  const wordBundle = React.useMemo(() => {
    return contents.slice((page - 1) * pageSize, page * pageSize) ?? [];
  }, [contents, page, pageSize]);
  const handleSetPage = (page: number) => {
    setPage(page);
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  };

  return (
    <>
      <Navigation
        page={page}
        prevs={prevs}
        nexts={nexts}
        setPage={handleSetPage}
      />
      <List ref={listRef as React.LegacyRef<HTMLOListElement>}>
        {wordBundle.map(({ word, description }, idx) => (
          <Item key={`${idx}-${word}`}>
            <span className="word-number">
              {idx + 1 + pageSize * (page - 1)}
            </span>
            <dl>
              <dt>{word}</dt>
              <dd>{description}</dd>
            </dl>
          </Item>
        ))}
      </List>
    </>
  );
};

WordBook.Editor = WordBookEditor;

export default WordBook;

const List = styled.ol`
  max-width: 400px;
  height: 100%;
  margin: 0 auto;
  padding: 20px 0 68px 0;
  overflow: auto;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 6px;
  background-color: ${colors.grey08};

  .word-number {
    min-width: 24px;
    color: ${colors.red50};
    font-size: 10px;
    padding: 0 12px 0 0;
  }

  dl {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    color: ${colors.grey60};
  }

  dl > dt {
    padding-right: 16px;
  }

  dl > dd {
    font-size: 12px;
    line-height: 16px;
  }

  & + & {
    margin-top: 8px;
  }
`;
