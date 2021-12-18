import React from 'react';
import styled from '@emotion/styled';
import type { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { Loader } from 'notion-ui';
import WrodBook from '../../../components/WordBook';
import Layout from '../../../components/Layout';
import type { WordBook as WordBookType } from '../../../types/model';
import { useSWR } from '../../../apis';
import { useTitle } from '../../../hooks';

export default function WordBookEditorPage() {
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

  const wordBook = React.useMemo(() => {
    if (data) {
      if (data.data?.attributes.title) {
        setTitle(data.data?.attributes.title);
      }
      return data?.data;
    }
    return null;
  }, [data]);

  return (
    <Layout>
      <Wrapper>
        {!data && <Loader.ParentFull />}
        {data && (
          <WrodBook.Editor
            wordbookId={slug ? Number(slug.toString()) : undefined}
            wordBook={wordBook?.attributes}
          />
        )}
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.div`
  height: calc(100% - 40px);
`;
