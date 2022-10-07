# axios 인터셉터로 jwt 토큰 재발급

## JWT 토큰 갱신

## axios 커스터마이징

refresh 토큰과 access 토큰을 사용한다고 할 때 

클라이언트 측에서는 인증이 필요한 요청을 보낼때 매번 header 에 refresh 토큰과 access 토큰을 추가하여

 요청을 보내야합니다.

또한 access 토큰을 만료가 됐을 경우 access 토큰을 재발급 받게끔 요청을 해야합니다.

이러한 작업들은 매 요청마다 추가할려고 하면 코드의 분량이 엄청나게 증가하고 복잡해해질겁니다. 

이러한 작업을 axios 커스텀을 통하여 바로 해결을 할 수 있습니다.

```
import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:4000/'
})

client.interceptors.request.use(
    function (config) {
        const user = localStorage.getItem('user');
        if (!user) {
            config.headers["accessToken"] = null;
            config.headers["refreshToken"] = null;
            return config
        }
        const { accessToken, refreshToken } = JSON.parse(user)
        config.headers["accessToken"] = accessToken;
        config.headers["refreshToken"] = refreshToken;
        return config
    }
)

client.interceptors.response.use(
    function (response) {
        return response
    },
    async function (error) {
      if (error.response && error.response.status === 403) {
          try {
              const originalRequest = error.config;
              const data = await client.get('auth/refreshtoken')
              if (data) {
                  const {accessToken, refreshToken} = data.data
                  localStorage.removeItem('user')
                  localStorage.setItem('user', JSON.stringify(data.data, ['accessToken', 'refreshToken']))
                  originalRequest.headers['accessToken'] = accessToken;
                  originalRequest.headers['refreshToken'] = refreshToken;
                  return await client.request(originalRequest);
                  }
          } catch (error){
              localStorage.removeItem('user');
              console.log(error);
          }
          return Promise.reject(error)
      }
      return Promise.reject(error)
    }
)

export default client;
```

하나씩 살펴보면..

```
const client = axios.create({
    baseURL: 'http://localhost:4000/'
})
```

- 요청을 보내는 BaseUrl 설정

```
client.interceptors.request.use(
    function (config) {
        const user = localStorage.getItem('user');
        if (!user) {
            config.headers["accessToken"] = null;
            config.headers["refreshToken"] = null;
            return config
        }
        const { accessToken, refreshToken } = JSON.parse(user)
        config.headers["accessToken"] = accessToken;
        config.headers["refreshToken"] = refreshToken;
        return config
    }
)
```

- reqeust를 보낼때 localStorage에 token 정보가 있다면 헤더에 토큰 정보를 저장하고
 없다면 null로 처리 합니다.

```
client.interceptors.response.use(
    function (response) {
        return response
    },
    async function (error) {
      if (error.response && error.response.status === 403) {
          try {
              const originalRequest = error.config;
              const data = await client.get('auth/refreshtoken')
              if (data) {
                  const {accessToken, refreshToken} = data.data
                  localStorage.removeItem('user')
                  localStorage.setItem('user', JSON.stringify(data.data, ['accessToken', 'refreshToken']))
                  originalRequest.headers['accessToken'] = accessToken;
                  originalRequest.headers['refreshToken'] = refreshToken;
                  return await client.request(originalRequest);
                  }
          } catch (error){
              localStorage.removeItem('user');
              console.log(error);
          }
          return Promise.reject(error)
      }
      return Promise.reject(error)
    }
)
```

- response받앗을때 error가 발생했을때..
    - 해당 error의 status가 403일때..
        - 기존의 originalRequest를 auth/refreshtoken 으로 전달해 토큰을 재발급 받습니다.
            - auth/refreshtoken : 다시 토큰을 발급 받는 end-point
                - 
        - 403 이외의 오류가 들어온다면 토큰 재발급에 실패한것으로 처리를 합니다.
    - 재발급 받은 토큰은 다시 로컬스토리지에 저장을 하고 헤더 부분에서 토큰 정보를 변경하고 다시 originalRequest를 보냅니다.
        - 토큰을 재발급 받았다면 original request를 요청
- 최상단 js 파일에 loadUser 라는 함수를 이용해서 localStorage에 token이 들어있다면 token을 검사하는 end-point로 요청을 보내 검사를 진행해서 유효하다면 로그인 상태를 유지하고 그렇지 않다면 로그아웃을 진행합니다.