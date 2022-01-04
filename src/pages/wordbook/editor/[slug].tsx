import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Loader } from 'notion-ui';
import WrodBook from '../../../components/WordBook';
import Layout from '../../../components/Layout';
import type { ARR, STR, WordBook as WordBookType } from '../../../types/model';
import { useSWR } from '../../../apis';
import { useTitle } from '../../../hooks';

export default function WordBookEditorPage() {
  const router = useRouter();
  const { slug } = router.query;
  const isNew = slug === 'new';
  const { setTitle } = useTitle();
  const { data } = useSWR<STR<WordBookType>>(
    `/api/words-notes/${slug}?populate=tags`,
    {
      isPaused: () => isNew || !slug,
    }
  );

  const wordBook = React.useMemo(() => {
    if (data) {
      if (data.data?.attributes.title) {
        setTitle(data.data?.attributes.title);
      }
      return data?.data.attributes;
    }
    return {
      title: '',
      description: '',
      contents: Array.from({ length: 10 }).map((_) => ({
        word: '',
        description: '',
      })),
    };
  }, [data]);

  return (
    <Layout>
      <Wrapper>
        {!isNew && !data && <Loader.ParentFull />}
        {(isNew || data) && (
          <WrodBook.Editor
            wordbookId={slug ? Number(slug.toString()) : undefined}
            wordBook={wordBook as WordBookType}
          />
        )}
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.div`
  height: calc(100% - 40px);
`;

function useScrollEvent() {
  // if ()
  const scrollable = document.querySelector('Descrop');
}
