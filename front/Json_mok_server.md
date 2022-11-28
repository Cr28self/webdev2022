
# Json server 연동하기

-   `json server`는 간단하게 백엔드 서버를 구축할 수 있도록 도와줍니다.

## 1. 설치 및 db.json파일 생성

```null
$ npm i json-server
```

`최상단 db.json`

```json
{
  "posts": [
    {
      "title": "First Post",
      "body": "First Content",
      "id": 1
    }
  ]
}
```

`package.json`

```json
  "scripts": {
    ...
    "server": "json-server --watch db.json --port 8000"
  },
```

이제  `localhose:8000/posts`로 접근해 배열 안에 있는 내용들을 CRUD할 수 있습니다.

## 2. 회원가입/로그인 기능 구현

### 2-1 JST?

`jwt`  는  `json web token`  을 줄인 말로, 특정한 json 데이터 (유저 정보) 에 대해서 암호화를 하여, 이를 유저의 인증 정보로서 사용하는 것입니다.

**특정 유저가 로그인되었는지 확인할 때, 이 jwt token 을 사용**하게 됩니다!

```jsx
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  .eyJlbWFpbCI6Im5pbHNvbkBlbWFpbC5jb20iLCJwYXNzd29yZCI6Im5pbHNvbiIsImlhdCI6MTY2MDExMDg0NSwiZXhwIjoxNjYwMTE0NDQ1fQ
  .SHB0bs4GOxZwyTDMzjJGw0BVLYWr8Q4UsdibJtj54d0
```

-   토근은 유저마다 다르며  **유저 정보와 함께, 언제까지 해당 토큰을 쓸 수 있는지**도 담겨있습니다.
-   해당 토큰의 유효기간이 만료되기 전까지는, 우리는 해당 토큰을 토대로 계속 로그인된 상태로 있을 수 있습니다.
-   token 을 이용해서 어떤 유저가 지금 백엔드로 요청을 보내고 있는지도 확인 가능합니다.

### 2-2 jwt 사용(구현X)

```null
$ yarn add json-server-auth
$ yarn add axios react-router-dom
```

`package.json`

```json
  "scripts": {
    ...
    "server": "json-server-auth --watch db.json --port 8000"
  },
```

`db.json`

```json
{
  "posts": [
    {
      "title": "First Post",
      "body": "First Content",
      "id": 1
    }
  ],
  "users": []
}
```

user정보 저장이 가능하게 db.json도 만들어줍니다.

```null
$ yarn server
```

### 회원가입

`서버주소/register`  로 email, password 를 담아서 요청을 보내면 회원가입이 진행됩니다.

### 로그인

서버주소/login 으로 email, password 를 담아서 요청을 보내면 로그인이 진행됩니다!

> 요청이 성공하면, accessToken 이라는 곳에 jwt token 을 담아서 전달해줍니다.  
> 이제 앞으로 요청보낼 때  `**해당 token을 header 라는 곳에 담아서 요청**`을 보내면,백엔드에서는 이  `**token 만으로 로그인 여부 식별 / 어떤 유저인지 식별**`을 할 수 있게 됩니다.

### 회원가입

`components > Register`

```js
import React, { useState } from 'react'
import axios from 'axios'

function Register() {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  })

  const inputChangeHandler = (e) => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  const doSignUp = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:8000/register',
        inputValue,
      )
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <input name="email" onChange={inputChangeHandler} />
      <input name="password" type="password" onChange={inputChangeHandler} />
      <button onClick={doSignUp}>회원가입</button>
    </div>
  )
}

export default Register
```

![](https://velog.velcdn.com/images/0seo8/post/2dbc1863-15d0-4f53-9ab1-292383faa206/image.png)  
![](https://velog.velcdn.com/images/0seo8/post/d21b4e60-b8c9-4124-acca-1ae1bdbfc162/image.png)

이제 이렇게 온 accessToken을 쿠기에 저장을 해야합니다.  `react-cookie`의 경우 리액트에서 쿠기 관리를 할 수 있도록 도와주는 패키지 입니다.

```null
$ yarn add react-cookie
```

```jsx
import { useCookies } from 'react-cookie'

function Resgiter() {
  const [cookies, setCookie, removeCookie] = useCookies()
}
```

-   `cookies`  쿠키 가져오기
-   `setCookie`  쿠키 추가
-   `removeCookie`  쿠기 제거

`Resgiter.jsx`

```jsx
const doSignUp = async () => {
  try {
    const { data } = await axios.post(
      'http://localhost:8000/register',
      inputValue,
    )
    setCookie('accessToken', data['accessToken'], { path: '/' })
  } catch (error) {
    console.log(error)
  }
}
```

-   `{path:'/'}`를 꼭 넣어줘야 전체 웹사이트에서 사용이 가능합니다.(쿠키는 주소별로 저장됩니다.)  
    ![](https://velog.velcdn.com/images/0seo8/post/f270f1af-5e95-4ee6-b496-4162b78f2ce2/image.png)

+PLUS 회원가입 success시, 메인페이지로 이동하기

```jsx
const navigate = useNavigate()

const { data } = await axios.post('http://localhost:8000/register', inputValue)
setCookie('accessToken', data['accessToken'], { path: '/' })
navigate('/post')
```

### 로그인페이지

```jsx
import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  })

  const inputChangeHandler = (e) => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  const [cookies, setCookie, removeCookie] = useCookies()

  const doLogin = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:8000/login',
        inputValue,
      )
      setCookie('accessToken', data['accessToken'], { path: '/' })
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <input name="email" onChange={inputChangeHandler} />
      <input name="password" type="password" onChange={inputChangeHandler} />
      <button onClick={doLogin}>로그인</button>
    </div>
  )
}

export default Login
```

### 로그인이 되었을 때만

`최상단 routes.json`

```json
{
  "posts": 640
}
```

-   json-server-auth에서 제공하는 api마다 권한 설정.(임시 백엔드 서버 만들때 사용.)
-   `posts: 640`의 경우 '/posts' 에 대해서 세자리수로 권한을 표현하는 것입니다.
    -   첫번째 : 글을 쓴사람의 권한(6은 수정, 삭제 가능)
    -   로그인을 한 사람의 권한(4는 글을 읽을 수만)
    -   로그인도 안한 사람의 권한(0은 권한이 0이라는 뜻)

`package.json`

```json
"scripts": {
  ...
  "server": "json-server-auth --watch db.json --port 8000 -r routes.json"
}
```

서버를 재 실행한 후 posts로 접속시 posts글을 보지 못하며 쓰지도 못하는 것을 확인할 수 있습니다.

### Posts에서 토근을 포함해 요청보내기

`Posts.jsx`

```jsx
const [cookies, setCookie, removeCookie] = useCookies()

const getData = async () => {
  const { data } = await axios.get('http://localhost:8000/posts', {
    headers: {
      Authorization: `Bearer ${cookies['accessToken']}`,
    },
  })
  setPost(data)
}
```

-   헤더에다가 다음 요청을 포함시켜서 전송합니다.
-   마찬가지로 다른 요청들에도 headers내용을 추가해서 요청을 보냅니다.
-   이제 post글을 볼 수 있지만, 추가,수정,삭제는 되지 않는 것을 확인할 수 있습니다.

### 내가 쓴 글은 나만 수정, 삭제하기

내가 쓴 글을 나만 수정하게 하기 위해서는 글을 쓸 때 누가 썼는지도 함께 보내줘야합니다.  
**실제로는 백엔드에서 token을 가지고 userId를 추가해주는 작업까지 해주지만, 임의로 진행하는 만큼 직접 userId를 세팅해 진행해보겠습니다**

```json
{
  "posts": [
    {
      "title": "첫번째 제목",
      "content": "첫번째 글",
      "id": 2,
      "userId": 2
    },
    ...
  ]
}
```

현재 로그인한 아이디와 작성한 아이디가 동일한 경우 삭제가 가능한 것을 확인할 수 있습니다.

