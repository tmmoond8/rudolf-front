import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { colors } from 'notion-ui';
// import { wordbooks } from '../../types/model';
import Navigation, { usePageNavigation } from './Navigation';

export default function WordBook() {
  const router = useRouter();
  const { slug } = router.query;
  // const wordbook = React.useMemo(() => {
  //   return wordbooks.find(({ id }) => slug?.toString() === id.toString());
  // }, [router.query.slug]);
  // const { page, pageSize, prevs, nexts, setPage } = usePageNavigation(
  //   wordbook?.contents.length ?? 0
  // );
  // const wordBundle = React.useMemo(() => {
  //   return (
  //     wordbook?.contents.slice((page - 1) * pageSize, page * pageSize) ?? []
  //   );
  // }, [wordbook, page, pageSize]);

  return (
    <Wrapper>
      {/* <Navigation page={page} prevs={prevs} nexts={nexts} setPage={setPage} /> */}
      <List>
        {/* {wordBundle.map(({ word, description }, idx) => (
          <Item key={`${idx}-${word}`}>
            <span className="word-number">
              {idx + 1 + pageSize * (page - 1)}
            </span>
            <dl>
              <dt>{word}</dt>
              <dd>{description}</dd>
            </dl>
          </Item>
        ))} */}
      </List>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  padding: 24px;
`;

const List = styled.ol`
  max-width: 400px;
  margin: 0 auto;
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
