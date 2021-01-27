const express = require('express');

const app = express();

// http.createServer를 구조적으로 할 수 있다.
// app.메소드(url, (request, response) => {});
// res.end => res.send, res.json로 사용
app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/api', (req, res) => {
  res.send('hello api');
});

app.get('/api/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ]);
});

app.post('/api/post', (req, res) => {
  res.json({ id: 1, content: 'hello' });
});

app.delete('/api/post', (req, res) => {
  res.json({ id: 1 });
});

app.listen(3065, () => {
  console.log('서버 실행 중');
});