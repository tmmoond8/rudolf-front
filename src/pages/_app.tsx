import React from 'react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import * as NotionUI from 'notion-ui';
import styled from '@emotion/styled';
import GlobalStyles from '../styles/globalStyles';

function RudolfApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      console.log('routeChangeStart');
      setIsLoading(true);
    });
    Router.events.on('routeChangeComplete', () => {
      console.log('routeChangeComplete');
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppLayout
        aside={<div>aside</div>}
        leftMenus={<div>header left</div>}
        rightMenus={<div>header right</div>}
        center={<div>header title</div>}
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
  header > div {
    flex: 1;
    overflow: hidden;
  }
`;
