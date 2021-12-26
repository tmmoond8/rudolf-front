import React from 'react';
import useSWR, { mutate as ddd } from 'swr';

export default function useTitle() {
  const dataRef = React.useRef<string>('');
  const { data, mutate } = useSWR('ui/title', () => dataRef.current);

  React.useEffect(() => {
    return () => {
      dataRef.current = '';
      mutate('', false);
    };
  }, []);

  return {
    title: data,
    setTitle: (title: string) => {
      dataRef.current = title;
      mutate(title, false);
    },
  };
}
