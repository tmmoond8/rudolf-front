import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Content, colors } from 'notion-ui';
import Link from 'next/link';
import Image from './Image';
import { getDateGoodLook } from '../libs';
import { desktop } from '../styles';
import type { STR, WordBook } from '../types/model';

interface Props {
  wordBooks: STR<WordBook>[];
}

export default function WordBookGallery({ wordBooks }: Props) {
  return (
    <Grid>
      {wordBooks.map(
        ({
          id,
          attributes: { coverImage, title = 'title', description, createdAt },
        }) => (
          <Link key={id} href={`/wordbook/${id}`}>
            <WordBookCard>
              <CoverImage src={coverImage} width={137} height={200} />
              <WordBookBody>
                <Content.Text as="H3" fontSize={20}>
                  {title}
                </Content.Text>
                <Description marginTop={8} as="P">
                  {description}
                </Description>
                <WordBookInfo>
                  <Date fontSize={14}>{getDateGoodLook(createdAt)}</Date>
                </WordBookInfo>
              </WordBookBody>
            </WordBookCard>
          </Link>
        )
      )}
    </Grid>
  );
}

const Grid = styled.ol`
  display: grid;
  grid-template-rows: 1fr;
  position: relative;
  grid-template-columns: 1fr;
  grid-gap: 2rem;

  ${desktop(css`
    grid-template-columns: repeat(2, 1fr);
  `)}
`;

const WordBookCard = styled.li`
  display: flex;
  border-radius: 4px;
  border: 1px solid ${colors.grey32};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  :hover {
    background-color: ${colors.grey08};
    border: 1px solid ${colors.transparent};
  }
`;

const WordBookBody = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 8px 16px 16px;
`;

const WordBookInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

const Date = styled(Content.Text)`
  min-width: fit-content;
`;

const Description = styled(Content.Text)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  align-items: flex-start;
  height: 58px;
  line-height: 26px;
  max-height: 58px;
`;

const CoverImage = styled(Image)`
  max-height: unset !important;
  min-height: unset !important;
  height: auto !important;
  margin: 0 0 auto 0 !important;
`;
