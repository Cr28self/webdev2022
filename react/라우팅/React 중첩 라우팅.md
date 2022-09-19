# React 중첩 라우팅

## 중첩 라우팅?

- 중첩 라우팅(Nested Routing)이란 라우팅 맵핑을 **최상위 컴포넌트 뿐만 아니라** 
**여러 개의 컴포넌트에 걸쳐서 단계별로 정의하는 라우팅 기법**

### ex)

브라우저의 주소 창에 `https://www.your-site.com/users`라고 입력되었을 때, 
유저 목록 페이지가 표시되고, `https://www.your-site.com/articles`라고 입력되었을 때, 
기사 목록 페이지가 표시되는 라우팅은 다음과 같이 React Router를 이용하여 단순하게 구현 가능

```jsx
<Router>
  <Route exact path="/" element={Home} />
  <Route path="/users" element={Users} />
  <Route path="/articles" element={Articles} />
</Router>
```

**그러나,**

, 만약 기사 목록 페이지 내에서 `**https://www.your-site.com/articles/1`라고 입력**되었을 때, 
**첫 번째 기사에 대한 상세 페이지가 표시**되야 하고,
 `**https://www.yoursite.com/articles/1/comments`라고 입력**되었을 때, **그 기사에 대한 댓글 목록이
 표시**되어야 한다면 어떨까요?

**결론은,**

- 위와 같이 **앱에서 필요한 모든 경로와 컴포넌트 간의 맵핑**을  **최상위 컴포넌트에서 이뤄진다면**, 
앱의 **규모가 커짐에 따라** **유지 보수가 어려워질 것**
- 하지만 **각 하위 컴포넌트 레벨에서도** **더 하위 경로에 대한 라우팅을 모듈화**할 수 있다면, 
**유지 보수가 쉬워질** 뿐만 아니라 **전반적으로 좀 더 유연한 라우팅 구현**이 가능할 것입니다.

---

### Route props

- 중첩 라우팅을 구현하려면 먼저 ReactRouter의 `**<Route>`컴포넌트의 `element`
 prop으로 넘어온 컴포넌트에 prop으로 어떤 값들이 넘어오는지에 대해서 알아야** 합니다.

```jsx
<BrowserRouter>
  <Route path="/about" element={About} />
</BrowserRouter>
```

- React Router는 **`match`, `location`, `history`라는 3개의 prop**을 `**<About>`컴포넌트에 넘겨줍니다**
- 따라서, 다음과 같이 `<About>`컴포넌트에서는 **이 3개의 prop을 읽어서** **각 객체가 어떤 데이터를 담고 있는지 렌더링**해볼 수 있습니다.

```jsx
import React from "react";

function About({ match, location, history }) {
  return (
    <>
      <h1>About</h1>
      <pre>{JSON.stringify(match, null, 2)}</pre>
      <pre>{JSON.stringify(location, null, 2)}</pre>
      <pre>{JSON.stringify(history, null, 2)}</pre>
    </>
  );
}

export default About;
```

- **중첩 라우팅을 구현**에는 이 중에서도 특히 **매칭 정보를 담고 있는 `match`prop가
사용**되는데, **`match.url`은 `<Link>`컴포넌트를 위해 사용**
- `**match.path**`는 **`<Route>` 컴포넌트를 위해 사용**됩니다.

`**match.url`과 `match.path`의 차이**

 `match.url`는 **실제로 매칭된 URL 문자열(ex. `/articles/1`)**을 담고 있는 반면에,
 `match.path`은 **매칭에 사용된 경로의 패턴(ex. `/articles/:id`)**을 담고 있습니다.

---

---

### 중첩 라우팅 구현

`**/users`경로에 대해서는 유저 목록 페이지를 보여주고,**

 **`/users/<유저 아이디>`경로에 대해서는 유저 상세 페이지를 보여주려고 합니다.**

 **`<App>`컴포넌트를 통해 `/users`경로에 대해서**
 `**<Users>`컴포넌트로 1차 라우팅**하고,
 **`<Users>`컴포넌트를 통해 2차 라우팅**을 하도록 하겠습니다. 

첫번째,

### App 컴포넌트 구현 ( 최상위 컴포넌트 )

- 먼저, **최상위 컴포넌트인 `<App>`**에서 **각 메뉴의 경로에 대응되는 컴포넌트를 맵핑**해주는 
**기본 라우팅을 구현**합니다.
- 여기서 **`/users`경로**에는 `**<Users>`컴포넌트를 맵핑**해주었으며, 
이 **`<Users>`컴포넌트 내부에서 `/users`의 하위 경로에 대한 라우팅을 해줄 것**입니다.

```jsx
import React from "react";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Users from "./Users";
import NotFound from "./NotFound";

function App() {
  return (
    <BrowserRouter >
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
        <Link to="/users">
          <button>Users</button>
        </Link>
      </header>
      <hr />
      <main>
        <Routes>
          <Route exact path="/" element={Home} />
          <Route path="/about" element={About} />
          **<Route path="/users" element={Users} />**
          <Route element={NotFound} />
        </Routes>
      </main>
    </BrowserRouter >
  );
}

export default App;
```

---

### **Users 컴포넌트**

- `**Users`디렉터리를 생성**하고, **그 안에 `index.js`파일을 생성**하고, 
다음과 같이 `**<Users>`컴포넌트를 작성**합니다.
- `<Users>`컴포넌트는 `**<Route>`컴포넌트의 `element`prop의 인자로 넘어갔기 때문에** 
**위에서 설명드린 3개의 props를 가지고 있습니다.**
- 이 중에서 `**match`prop를 읽어**, `**match.path`값을 2개의 내부 `<Route>`
 컴포넌트를 추가할 때 사용**합니다.

```jsx
import React from "react";
import { Route } from "react-router-dom";
import UserList from "./UserList";
import UserDetail from "./UserDetail";

function Users({ **match** }) {
  return (
    <>
      <h1>Users</h1>
      <Route exact path={**match.path**} element={UserList} />
      <Route path={`${**match.path**}/:id`} element={UserDetail} />
    </>
  );
}

export default Users;
```

- **첫 번째 `<Route>`컴포넌트**
    - `**/users`경로 ( match.path )**에 **유저 목록 페이지**를 위한 `<UserList>`컴포넌트를 맵핑
    - `**exact`prop을 사용한 이유**
        - `/users`경로를 정확히 매칭하고 위함입니다.
        - `**exact`prop 없을 경우**, `**/users`로 시작하는 모든 경로가 매칭되어**, 
        **유저 상세 페이지가 표시될 때**, **유저 목록 페이지**도 **항상 같이 표시**되게 됩니다.
            - 같이 표시되게 하고 싶을때는 exact사용 X
- **두 번째 `<Route>`컴포넌트**
    - `**/users/:id`경로**에 **유저 상세 페이지**를 위한 `<UserDetail>`
     컴포넌트를 맵핑합니다.
    - `**/users/:id`경로에서 `:id`부분 ( URL 파라미터 )**
        - **URL 파라미터를 정의할 때 사용**하는 React Router의 문법입니다.
        - 경로에 이와 같이 **URL 파라미터가 포함**된 경우, 
        패턴 매칭이 되어 `**/users/1`, `/users/a`등이 모두 매칭**이 된다.
        - **해당 파라미터는 변수화**되어 **맵핑된 컴포넌트에서 `match.params.id`**
        와 같이 읽어올 수 있습니다.

---

### UserList 컴포넌트

- `**Users`디렉터리 안에 `<UserList>`컴포넌트를 작성**
- **유저 목록 페이지를 렌더링하는 `<UserList>`컴포넌트**도 역시 **`<Route>`컴포넌트의 `component`
 prop의 인자로 넘어갔기 때문에 `match`prop**을 가집니다.
- 여기서는 React Router의 `**<Link>`컴포넌트를 이용**해서, 
**각 유저의 상세 페이지로 이동하는 링크**를 만듭니다.
    - `**match.path`대신에 `match.url`을 사용해야하는 이유**
        - **링크를 걸 때** **경로 문자열(match.url) 이 아닌 
        경로 패턴(match.path)을 사용하면** **URL 파라미터가 포함될 수 있기 때문**입니다
        - [https://www.notion.so/React-c2dbf63b225942ad855f18ecca389a60#155ff94b135847b09cf75b7fbbb82f15](https://www.notion.so/React-c2dbf63b225942ad855f18ecca389a60)

```jsx
import React from "react";
import { Link } from "react-router-dom";
import { users } from "./data.json";

function UserList({ **match** }) {
  return (
    <>
      <h2>User List</h2>
      <ul>
        {users.map(({ id, name }) => (
          <li key={id}>
            **<Link to={`${match.url}/${id}`}>{name}</Link>**
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserList;
```

---

### **UserDetail 컴포넌트**

- `Users`디렉터리 안에 `<UserDetail>`컴포넌트를 작성
- **유저 상세 페이지를 렌더링**하는 `**<UserDetail>`컴포넌트**에서는 
`**match`prop** 뿐 만 아니라 `**history`prop**도 사용합니다.

```jsx
import React from "react";
import { users } from "./data.json";

function UserDetail({ **match**, **history** }) {
  const user = users.find((user) => user.id === **match.params.id**);
  return (
    <>
      <h2>User Detail</h2>
      <dt>id</dt>
      <dd>{user.id}</dd>
      <dt>name</dt>
      <dd>{user.name}</dd>
      <button onClick={() => **history.goBack()**}>Back</button>
    </>
  );
}

export default UserDetail;
```

- 먼저 `**match.params`를 통해** **경로에 포함되어 있는 URL 파라미터를 읽어 온다**.
    - **경로가 `/users/1`**일 경우, `**match.params`에 `{id: "1"}`이 할당**
    - 따라서 **`match.params.id`값은 `1`이 되며**, 
    이 값으로 유저를 조회하여 상세 정보를 렌더링합니다.
- **유저 목록 페이지로 다시 돌아가기** 위한 버튼에는
 `**history`prop의 `goBack()`함수**를 사용하였습니다.

React Router는 `**match`, `location`, `history`라는 3개의 prop**을 `<Route>`컴포넌트에 넘겨줍니다.

중첩 라우팅에서는 매칭 정보를 담고 있는 `match`prop이 사용된다.
 `match.url`은 `<Link>`컴포넌트를 위해 사용되고 ( 실제 매칭된 링크 : `**/users/1**`)

 `match.path`는 `<Route>`컴포넌트를 위해 사용됩니다 ( 경로 패턴 링크 : `**/users/:id**`)