const express = require('express');
const postRouter = require('./routes/post');

const app = express();

// http.createServer를 구조적으로 할 수 있다.
// app.메소드(url, (request, response) => {});
// res.end => res.send, res.json로 사용
app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/', (req, res) => {
  res.send('hello api');
});

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ]);
});

// /post가 prefix로 붙는다. 중복 제거
app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('서버 실행 중');
});