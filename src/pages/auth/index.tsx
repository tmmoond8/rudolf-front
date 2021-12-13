import * as NotionUI from 'notion-ui';
import styled from '@emotion/styled';
import APIS from '../../apis';
import { localStorage } from '../../libs';

export default function AuthPage() {
  const { value: id, setValue: setId } = NotionUI.useInput('');
  const { value: password, setValue: setPassword } = NotionUI.useInput('');
  const handleLogin = async () => {
    const { jwt, user } = await APIS.auth.login(id, password);
    localStorage.setToken(jwt);
  };

  return (
    <Layout>
      <NotionUI.TextField
        label="id"
        id="input-id"
        value={id}
        onChange={(e: any) => {
          setId(e.target.value);
        }}
      />
      <NotionUI.Content.Spacing size={12} />
      <NotionUI.TextField
        label="password"
        id="input-password"
        value={password}
        onChange={(e: any) => {
          setPassword(e.target.value);
        }}
      />
      <NotionUI.Content.Spacing size={12} />
      <NotionUI.Button buttonType="Primary" onClick={handleLogin}>
        login
      </NotionUI.Button>
    </Layout>
  );
}

const Layout = styled.div`
  max-width: 500px;
  padding: 40px 24px;
`;
