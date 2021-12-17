import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface Props {
  children?: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <Main>{children}</Main>;
}

const Main = styled.main<{ padding?: string }>`
  max-width: 900px;
  height: 100%;
  margin: 0 auto;
  padding: 12px 16px;
`;
