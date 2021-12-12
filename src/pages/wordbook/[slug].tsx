import React from 'react';
import { useRouter } from 'next/router';
import WrodBook from '../../components/WordBook';
import type { WordBook as WordBookType } from '../../types/model';
import { useSWR } from '../../libs/swr';

export default function WordBookPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useSWR<WordBookType>(`/api/words-notes/${slug}`);
  const wordBook = React.useMemo(() => {
    return data?.data ?? null;
  }, [data]);
  console.log('wordBook', wordBook);
  const contents = React.useMemo(() => {
    return wordBook ? wordBook.attributes.contents : [];
  }, [wordBook]);
  return <WrodBook contents={contents} />;
}
