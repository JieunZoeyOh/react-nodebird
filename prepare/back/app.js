const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
const path = require('path');
const passport = require('passport');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();

const app = express();

db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공')
  })
  .catch(console.error);

passportConfig();

app.use(cors({
  origin: true,
  credentials: true, // 쿠키 전달
}));
// path.join : 운영체제에 맞게 주소 경로 설정(/ 또는 \)
app.use('/', express.static(path.join(__dirname, 'uploads')));
// 넘어온 data를 request body에 넣어주는 역할 router보다 위에 위치해야 함
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

// http.createServer를 구조적으로 할 수 있다.
// app.메소드(url, (request, response) => {});
// res.end => res.send, res.json로 사용
app.get('/', (req, res) => {
  res.send('hello express');
});

// /post가 prefix로 붙는다. 중복 제거
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(3065, () => {
  console.log('서버 실행 중!');
});