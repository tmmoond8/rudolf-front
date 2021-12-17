import React from 'react';
import styled from '@emotion/styled';
import { TextField, Content, Button, colors } from 'notion-ui';
import { debounce } from 'throttle-debounce';
import type { SpreadsheetData } from '../../types/model';
import APIS from '../../apis';
import { wordBookStringify } from '../../libs';
import SpreadSheetEditor from './SpreadsheetEditor';

export default function WordBookEditor() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [wordBook, setWordBook] = React.useState<SpreadsheetData>(
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
    React.useCallback((data: SpreadsheetData) => {
      setWordBook(data);
    }, [])
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await APIS.wordNote.post({
        title,
        description,
        contents: wordBookStringify(wordBook),
        coverImage:
          'https://user-images.githubusercontent.com/11402468/146219166-e024ce4e-4e9a-4da2-90bc-83e50015283c.jpeg?w=256&q=75',
      });
    } catch (error) {
      console.error('error', error);
    }
  };

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
      <SpreadSheetEditor data={wordBook} onChange={handleOnChange} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  padding: 0 0 44px 0;
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
