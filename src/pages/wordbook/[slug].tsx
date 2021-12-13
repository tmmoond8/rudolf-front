import React from 'react';
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
    isPaused: () => isNew,
  });
  const wordBook = React.useMemo(() => {
    return data?.data ?? null;
  }, [data]);

  const contents = React.useMemo(() => {
    return wordBook ? wordBook.attributes.contents : [];
  }, [wordBook]);

  return (
    <Layout>
      {isNew && <WrodBook.Editor />}
      {!isNew && <WrodBook contents={contents} />}
    </Layout>
  );
}
