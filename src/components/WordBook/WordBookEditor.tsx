import React from 'react';
import styled from '@emotion/styled';
import SpreadSheet from 'react-spreadsheet';
import { TextField, Content, Button, colors } from 'notion-ui';
import { debounce } from 'throttle-debounce';
import APIS from '../../apis';
import { wordBookStringify } from '../../libs';

export default function WordBookEditor() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [wordBook, setWordBook] = React.useState(
    Array.from({ length: 10 }).map((_) => [
      {
        value: '',
      },
      {
        value: '',
      },
    ])
  );
  const handleOnChange = debounce(
    300,
    React.useCallback((data) => {
      setWordBook(data);
    }, [])
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    await APIS.wordNote.post({
      title,
      description,
      contents: wordBookStringify(wordBook),
      coverImage:
        'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1632299645/tlog/cover/kakao_login_eecddz.png?w=1080&q=75',
    });
  };

  const HeaderRow = () => (
    <tr>
      <th className="Spreadsheet__header">순번</th>
      <th className="Spreadsheet__header">단어</th>
      <th className="Spreadsheet__header">뜻</th>
    </tr>
  );

  return (
    <Wrapper>
      <Form>
        <div className="row">
          <div className="column">
            <TextField
              id="wordbook-title"
              label="title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <Content.Spacing size={16} />
            <TextField
              id="wordbook-description"
              label="description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
            />
          </div>
          <Button
            buttonType="Primary"
            buttonSize="Big"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            제출
          </Button>
        </div>
      </Form>
      <SpreadSheet
        data={wordBook}
        onChange={handleOnChange}
        HeaderRow={HeaderRow}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;

  .Spreadsheet {
    width: 100%;
    color: ${colors.grey60};
    background-color: ${colors.transparent};

    table {
      width: 100%;
      colgroup col:nth-child(1) {
        width: 60px;
      }

      tr {
        line-height: 1.4em;
      }

      th,
      td {
        background-color: ${colors.transparent};
        text-align: center;
      }
      tbody tr .Spreadsheet__header {
        font-size: 12px;
        color: ${colors.red};
        border: none;
      }
    }

    .Spreadsheet__active-cell,
    .Spreadsheet__floating-rect--selected,
    .Spreadsheet__floating-rect--copied {
      background: ${colors.grey16};
      border: 2px ${colors.red50} solid;
    }

    .Spreadsheet__data-editor {
      background-color: ${colors.backgroundEmbed};
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto 30px auto;

  .row {
    display: flex;
    align-items: center;

    .column {
      flex: 1;
      margin-right: 32px;
    }
  }
`;
