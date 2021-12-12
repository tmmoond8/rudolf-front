import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { colors, Content } from 'notion-ui';
import { wordbooks } from '../../types/model';

export default function WordBook() {
  const router = useRouter();
  const { slug } = router.query;
  const [pageSize, setPageSize] = React.useState(20);
  const wordbook = React.useMemo(() => {
    return wordbooks.find(({ id }) => slug?.toString() === id.toString());
  }, [router.query.slug]);
  const [page, setPage] = React.useState(1);
  const wordBundle = React.useMemo(() => {
    return (
      wordbook?.contents.slice((page - 1) * pageSize, page * pageSize) ?? []
    );
  }, [wordbook, page, pageSize]);

  return (
    <Wrapper>
      <List>
        {wordBundle.map(({ word, description }, idx) => (
          <Item key={`${idx}-${word}`}>
            <span className="word-number">{idx}</span>
            <dl>
              <dt>{word}</dt>
              <dd>{description}</dd>
            </dl>
          </Item>
        ))}
      </List>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  padding: 40px 24px;
`;

const List = styled.ol`
  width: 400px;
  margin: 0 auto;
`;

const Item = styled.li`
  display: flex;
  align-items: center;

  .word-number {
    display: flex;
    justify-content: flex-end;
    width: 48px;
    color: ${colors.red};
    padding: 0 16px;
  }

  dl {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    color: ${colors.grey60};
    padding: 8px 16px;
    border-radius: 6px;
    background-color: ${colors.grey08};
  }

  dl > dt {
    padding-right: 16px;
  }

  dl > dd {
    font-size: 12px;
  }

  & + & {
    margin-top: 8px;
  }
`;
