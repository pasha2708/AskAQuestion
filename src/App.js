import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './index.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Header = styled.div`
  background-color: #e16f3b;
  height: 50px;
`;

const HeaderText = styled.p`
  margin: auto;
  color: white;
  font-size: 22px;
  font-family: 'Roboto', sans-serif;
  padding-top: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 800px;
  text-align: center;
`;

const App = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false)
  const [loadingHeader, setLoadingHeader] = useState(false)
  const [headerText, setHeaderText] = useState('')

  useEffect(() => {
axios.get('https://asq-a-question-be.vercel.app/topic').then(({data}) => {
  setHeaderText(data.topic)
})
  }, [])

  const handleClick = () => {
    setLoading(true)
    axios
      .post('https://asq-a-question-be.vercel.app/questions', {
        date: new Date(),
        topic: headerText,
        text: data,
      })
      .then(() => {
        NotificationManager.success('Відгук надіслано, дякуємо');
        setData('');
        setLoading(false)
      })
      .catch(() => {
        NotificationManager.error('Помилка. Спробуйте пізніше');
        setLoading(false)
      });
  };

  if (!headerText) {
    return (<h1 style={{textAlign: 'center'}}>Зачекайте...</h1>)
  }

  return (
    <>
      <Header>
        <Container>
          <HeaderText>Анонімна анкетка від батьків</HeaderText>
        </Container>
      </Header>
      <Container>
        <p>1. Що хорошого ти вчишся в тата або мами?
</p>
<p>2. Чим можна покращити те як тебе виховують батьки? Що тобі не подобається у відношеннях з татом та мамою? Що ти б хотів змінити?</p>
        <textarea
          placeholder='Введіть ваш відгук(анонімно)'
          onChange={(e) => setData(e.target.value)}
          value={data}
        />
        <Button
          style={{ backgroundColor: '#e16f3b' }}
          variant='contained'
          onClick={handleClick}
          disabled={!data || loading}
        >
          Надіслати
        </Button>
        {loading && <p>Зачекайте, відгук відправляється...</p>}
        <NotificationContainer />
      </Container>
    </>
  );
};

export default App;
