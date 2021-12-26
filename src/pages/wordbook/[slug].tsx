import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import WrodBook from '../../components/WordBook';
import Layout from '../../components/Layout';
import type { STR, WordBook as WordBookType } from '../../types/model';
import { useSWR } from '../../apis';
import { useTitle } from '../../hooks';

export default function WordBookPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { setTitle } = useTitle();
  const { data } = useSWR<STR<WordBookType>>(
    `/api/words-notes/${slug}?populate=*`,
    {
      isPaused: () => !slug,
    }
  );

  const wordBook = React.useMemo(() => {
    if (data) {
      console.log('data', data);
      if (data.data?.attributes.title) {
        setTitle(data.data?.attributes.title);
      }
      return data?.data;
    }
    return null;
  }, [data]);

  const contents = React.useMemo(() => {
    return wordBook ? wordBook.attributes.contents : [];
  }, [wordBook]);

  return (
    <Layout>
      <Wrapper>
        <WrodBook contents={contents} />
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.div`
  height: calc(100% - 40px);
`;
