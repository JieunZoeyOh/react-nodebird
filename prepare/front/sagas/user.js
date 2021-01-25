import { all, fork, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';

function logInAPI(data) {
    return axios.post('/api/login', data)
}

// 성공 결과는 result.data,
// 실패 결과는 err.response.data에 담겨있어요.
// logInAPI(action.data) -> call(logInAPI, action.data) // call or fork(함수, 매개변수들)


function* logIn(action) {
    try {
        // const result = yield call(logInAPI, action.data);
        yield delay(1000);
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: action.data
        });
    } catch (err) {
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data,
        })
    }
}

function logOutAPI(data) {
    return axios.post('/api/logout', data)
}

function* logOut(action) {
    try {
        // const result = yield call(logOutAPI, action.data);
        yield delay(1000);
        yield put({
            type: 'LOG_OUT_SUCCESS',
            // data: action.data
        });
    } catch (err) {
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data,
        })
    }
}

// take : LOG_IN이라는 액션이 실행될 때 까지 기다리겠다.
// yield take의 치명적인 단점 : 일회용이다.
// -> 해결방안 : while(true){} - 동기로 동작
//            : takeEvery - 비동기로 동작

// takeLatest : 버튼을 더블 클릭한 경우 앞에 눌러진 것은 무시 됨. 마지막 것만 실행 됨. (<-> takeLeading)
// throttle : yield throttle('ADD_POST_REQUEST', addPost, 2000); : 2초에 1번만 요청 보낼 수 있음

// 쓰로틀링: 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것
// 디바운싱: 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록 하는 것


function* watchLogIn() {
    yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST', logOut);
}

// all : 배열안의 함수들을 동시에 실행
// fork : 함수 실행 (비동기)
// call : 함수 실행 (동기)
export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
    ]);
};