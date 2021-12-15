import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import * as NotionUI from 'notion-ui';
import { useSWR, APIS } from '../../apis';
import type { User } from '../../types/model';

function UserMenu() {
  const router = useRouter();
  const userResult = useSWR<User>(APIS.USER.ME);
  const user = userResult?.data;
  const handleClickLoginButton = () => {
    router.push('/auth');
  };
  return (
    <>
      {!user && (
        <NotionUI.Button onClick={handleClickLoginButton}>
          로그인
        </NotionUI.Button>
      )}
      {user && <NotionUI.Content.Text>{user.username}</NotionUI.Content.Text>}
    </>
  );
}

function Left() {
  return <NotionUI.Content.Text>영단어</NotionUI.Content.Text>;
}

function Right() {
  return (
    <Row>
      <UserMenu />
    </Row>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Right,
  Left,
};

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px 0 0;
`;
