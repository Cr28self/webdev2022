# React 라우팅 기본

```jsx
import React, { useState } from "react";
import Home from "./Home";
import About from "./About";
import NotFound from "./NotFound";

function App() {
  const [comp, setComp] = useState(Home);

  return (
    <>
      <header>
        <button onClick={() => setComp(Home)}>Home</button>
        <button onClick={() => setComp(About)}>About</button>
        <button onClick={() => setComp(NotFound)}>Users</button>
      </header>
      <hr />
      <main children={comp} />
    </>
  );
}

export default App;
```

**기본적으로 SPA는 `index.html`파일에  `div`엘리먼트만 하나 두고, 자바스크립트로 모든 부분을 동적으로 랜더링하는 구조를 취합니다.**

- 여기서는 url은 고정된 채로 버튼 클릭할때마다 <main>부분만 갱신되는 구조!!

하지만 이런 방식으로 라우팅을 구현하게 되면 브라우저 사용자 입장에서 **다음과 같은 문제가 발생**하게 됩니다.

- **특정 페이지에 대한 즐겨찾기 등록이 불가**합니다. 컴포넌트가 전환되더라도 브라우저 주소창의 **URL은 고정**되어 있기 때문입니다.
- **뒤로 가기 버튼**을 누르면 해당 앱내에서 이전 페이지로 이동하는 것이 아니라 **그 전에 서핑하던 다른 웹사이트로 이동**해버립니다.
- **새로 고침 버튼**을 누르면 사용 중이던 컴포넌트가 아닌 **무조건 최초에 렌더링되었던 `Home` 컴포넌트로 이동**합니다.
- **SEO(검색 엔진 최적화) 측면**에서도 일반 웹사이트들과 차이가 있어서 검색 엔진에 의해 원**치않는 방식으로 색인이 될 수도 있습니다**.

---

# React Router

- 위에서 살펴본 **SPA의 라우팅 문제를 해결하기 위해서** 거의 표준처럼 사용되고 있는 네비게이션 라이브러리
- React Router를 사용하면 앱에서 발생하는 라우팅이 `location`나  `history`와 같은 브라우저 
내장 API와 완벽하게 연동
- 따라서 SPA에서 제공하는 **다이나믹한 사용자 경험을 그대로 살리면서**도 **기존 웹사이트에서 가능하던 브라우저 상의 매끈한 라우팅을 제공**할 수 있습니다.

---

## React Router의 핵심 컴포넌트

### Link

- HTML의 `<a>`태그와 유사한 기능을 하는 컴포넌트
- `to` prop을 통해서 이동할 경로를 지정

```jsx
<Link to="/about">About</Link>
```

- 브라우저에서 **클릭이 가능한 `About`으로 랜더링**되고, `About`를 클릭하면 주소창의 경로가
 **`<도메인 네임>/about`으로 갱신**됩니다.
- 일반적으로 **화면 상단**이나 **좌측에 위치한 네비게이션 바를 구현할 때** 주로 사용하게되는
 컴포넌트입니다.

### Route

- `<Route>`컴포넌트는 **현재 주소창의 경로와 매치될 경우 보여줄 컴포넌트를 지정**하는데 
사용됩니다
- `**path`prop**을 통해서 **매치시킬 경로를 지정**하고 **`element`prop**을 통해서 **매치되었을 때 
보여줄 컴포넌트를 할당**

```jsx
<Route path="/about" element={About} />
```

- 현재 주소창의 경로가 `/about`일 경우 `About`라는 컴포넌트를 보여줍니다.
- 일반적으로 현재 주소창의 URL 경로에 따라 특정 컨텐트를 보여주거나 숨기기 위해서 
사용될 수 있습니다.

### BrowserRouter

- `<Router>`컴포넌트는 위에 나온 `<Route>`와 `<Link>`컴포넌트가 함께 유기적으로 동작하도록 
묶어주는데 사용합니다.
- 다시 말해, **`<Route>`와 `<Link>`컴포넌트는 DOM 트리 상에서 항상 `<Routes>`를 
공통 상위 컴포넌트로 가져야합니다.**

```jsx
<BrowserRouter>
  ...
  <Link />
  <Link />
  ...
  <Route />
  <Route />
  ...
</BrowserRouter>
```

즉, 전체적으로 React Router를 사용하는 어플리케이션은 이와 같은 구조를 가지게 됩니다.

---

---

## 구현

### 헤더 부분

```jsx
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
```

### main부분

```jsx
<main>
  <Route exact path="/" element={Home} />
  <Route path="/about" element={About} />
  <Route path="/users" element={NotFound} />
</main>
```

- `path`prop에 매치 시 비교될 경로를 지정하고, element props에 매치 시 보여줄 컴포넌트를 할당
- `**/`경로를 사용하는 `<Route>`컴포넌트에만 `exact`prop이 사용된 이유**는, React Router의 디폴트 매칭 규칙 때문
    - **React Router**는 `**path`prop의 경로와** **현재 브라우저의 주소창의 URL 경로(`location.pathname`)와 비교**를 하는데요.
    - **현재 URL 경로 값이** `<Route>`의 `**path`prop 값**과 **전체가 아닌 앞부분만 일치해도 매치되는 것으로 간주**합니다. **따라서 `path`가 `/`일 경우**, `**/`뿐만 아니라 `/`로 시작하는 
    모든 URL 경로**, **사실 상 가능한 모든 경우의 수의 경로와 매치**가 됩니다.
    - 그렇기 때문에, `exact` prop이 없으면, **의도치 않게 `Home`
     컴포넌트가 URL 경로와 상관없이 항상 보여지게 됩니다.**
    - `**exact`prop**을 붙여주면 **URL 경로 값이 `<Route>`의 `path`
     값과 완벽히 전체가 일치해야 매치**되는 것으로 처리
    
    ### `<Router>`컴포넌트로 위에서 작성한 모든 `<Link>`컴포넌트와 `<Route>`
     컴포넌트를 함께 감싸주기
    
    ```jsx
    import React from "react";
    import { Link, Route, BrowserRouter as Router } from "react-router-dom";
    import Home from "./Home";
    import About from "./About";
    import NotFound from "./NotFound";
    
    function App() {
      return (
        <Router>
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
            <Route exact path="/" element={Home} />
            <Route path="/about" element={About} />
            <Route path="/users" element={NotFound} />
          </main>
        </Router>
      );
    }
    ```
    
- 브라우저에서 네이게이션 메뉴를 클릭해보면 **브라우저의 주소가 현재 페이지에 맞게 갱신이 되는 것을 확인**하실 수 있을 겁니다.
- 뿐만 아니라, **뒤로 가기, 앞으로 가기, 새로 고침 버튼**들도 **일반 웹사이트를 서핑하듯이 작동**하는 것을 확인하실 수 있을 겁니다.

---

---

---

### 404페이지 처리 방법

- SPA에서 브라우저에 잘못된 경로가 입력되었을 때, 특정한 404 페이지를 보여줘야야 합니다.

이럴 경우, React Router에서 제공하는 또 다른 컴포넌트인 `<Routes>`로 모든 `<Route>`
 컴포넌트로 묶어줘야 합니다.

---

## Routes

- `<Routes>`컴포넌트를 사용하면 **그 하위에 있는 `<Route>`컴포넌트 중에 매치되는 
제일 첫번째 컴포넌트만 보여주고**, **그 이후에 나오는 `Route`컴포넌트는 매치되더라도 
무시**됩니다.
    - **따라서, `<Routes>`컴포넌트의 순서 배치가 중요함!!!**

- 그 다음에 **`path`prop이 없는 `<Route>`컴포넌트를 하나 추가**해주면, 
이 **`<Route>`는 모든 경로에 매치가 가능**해지고, **여기에 404 컴포넌트를 할당**해줄 수 있습니다.
- `**<Route>`중에 매치되는 것이 없었을 경우**, **제일 아래까지 내려올 것**이고, 
이 **마지막 `<Route>`컴포넌트가 매치되어 404 페이지가 보여질 것**입니다.

```jsx
<main>
  <Routes>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route component={NotFound} />
  </Routes>
</main>
```