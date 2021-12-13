import styled from '@emotion/styled';

export default function Layout({ children }: { children?: React.ReactNode }) {
  return <Main>{children}</Main>;
}

const Main = styled.main`
  max-width: 900px;
  height: 100%;
  margin: 20px auto;
  padding: 36px 16px;
`;
