import React from 'react';
import styled from '@emotion/styled';
import type { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import WrodBook from '../../components/WordBook';
import Layout from '../../components/Layout';
import type { WordBook as WordBookType } from '../../types/model';
import { useSWR } from '../../apis';
import { useTitle } from '../../hooks';

export default function WordBookPage() {
  const router = useRouter();
  const { slug } = router.query;
  const isNew = slug === 'new';
  const { setTitle } = useTitle();
  const { data } = useSWR<AxiosResponse<WordBookType>>(
    `/api/words-notes/${slug}`,
    {
      isPaused: () => isNew || !slug,
    }
  );

  console.log('data', data);

  const wordBook = React.useMemo(() => {
    if (data) {
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
