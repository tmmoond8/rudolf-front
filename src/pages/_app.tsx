import React from 'react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import * as NotionUI from 'notion-ui';
import styled from '@emotion/styled';
import GlobalStyles from '../styles/globalStyles';
import Aside from '../components/Aside';
import GNB from '../components/GNB';
import { useTitle } from '../hooks';

function RudolfApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { title } = useTitle();

  React.useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
    Router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppLayout
        aside={<Aside />}
        leftMenus={<GNB.Left />}
        rightMenus={<GNB.Right />}
        center={<NotionUI.Content.Text>{title}</NotionUI.Content.Text>}
      >
        {isLoading ? (
          <NotionUI.Loader.ParentFull />
        ) : (
          <Component {...pageProps} />
        )}
      </AppLayout>
    </>
  );
}

export default RudolfApp;

const AppLayout = styled(NotionUI.Layout.App)`
  header {
    nav {
      flex: unset;
    }
  }
`;
