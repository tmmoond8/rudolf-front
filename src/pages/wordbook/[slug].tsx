import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import WrodBook from '../../components/WordBook';
import Layout from '../../components/Layout';
import type { WordBook as WordBookType } from '../../types/model';
import { useSWR } from '../../apis';

export default function WordBookPage() {
  const router = useRouter();
  const { slug } = router.query;
  const isNew = slug === 'new';
  const { data } = useSWR<WordBookType>(`/api/words-notes/${slug}`, {
    isPaused: () => isNew || !slug,
  });
  const wordBook = React.useMemo(() => {
    return data?.data ?? null;
  }, [data]);

  const contents = React.useMemo(() => {
    return wordBook ? wordBook.attributes.contents : [];
  }, [wordBook]);

  return (
    <Layout>
      <Wrapper>
        {isNew && <WrodBook.Editor />}
        {!isNew && <WrodBook contents={contents} />}
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.div`
  margin: 20px 0;
  height: calc(100% - 40px);
  overflow: hidden;
`;
