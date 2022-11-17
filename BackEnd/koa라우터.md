
## 1-4 koa-router 사용하기

이제, 요청이 들어왔을 때, 경로에 따라 다른 작업을 할 수 있게 해주는  `koa-router`  에 대해서 알아보도록 하겠습니다.

이는 Koa 에 내장되어있는것이 아니므로, 따로 모듈을 설치해주어야 합니다.

```
$ yarn add koa-router

```

### 기본 사용법

이제 koa-router 의 기본사용법을 알아보도록 하겠습니다.  
그 전에, 아까 작성했었던 미들웨어들을 제거해주세요.

#### `src/index.js`

```
const Koa = require('koa');
const app = new Koa();

app.listen(4000, () => {
    console.log('heurm server is listening to port 4000');
});

```

이제, 라우터를 불러와서 적용하는 코드를 입력해보도록 하겠습니다.

```
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = '홈';
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(4000, () => {
    console.log('heurm server is listening to port 4000');
});

```

Router 인스턴스를 새로 생성하여  `router`  값에 넣었고,  `/`  경로로 들어오면 홈 이라는 내용으로 응답하도록 라우터 설정을 하였습니다.

이제  [http://localhost:4000/](http://localhost:4000/)  에 들어가면 홈 이라는 텍스트가 뜰 것입니다.

### 여러개의 라우트, 라우트 파라미터

여러개의 라우트를 설정하는 방법과, 라우트 파라미터를 읽어오는 방법을 알아보겠습니다. 다음 코드를 입력해보세요.

```
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = '홈';
});

router.get('/about', (ctx, next) => {
    ctx.body = '소개';
});

router.get('/about/:name', (ctx, next) => {
    const { name } = ctx.params; // 라우트 경로에서 :파라미터명 으로 정의된 값이 ctx.params 안에 설정됩니다.
    ctx.body = name + '의 소개';
});

router.get('/post', (ctx, next) => {
    const { id } = ctx.request.query; // 주소 뒤에 ?id=10 이런식으로 작성된 쿼리는 ctx.request.query 에 파싱됩니다.
    if(id) {
        ctx.body = '포스트 #' + id;
    } else {
        ctx.body = '포스트 아이디가 없습니다.';
    }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('heurm server is listening to port 4000');
});

```

다음 라우트를 설정해주었습니다:

-   /
-   /about
-   /about/:name
-   /post

3번째의 경우엔 값이 동적으로 들어갈 수 있도록, 뒤에 name 이라는 파라미터를 넣어주었습니다.  
4번째의 경우엔 ?id=10 이런식의 쿼리 파라미터가 들어 갈 수 있게 해주었습니다.

다음 주소들을 하나 하나 들어가서 제대로 작동하는지 확인해보세요:

-   [http://localhost:4000/](http://localhost:4000/)
-   [http://localhost:4000/about](http://localhost:4000/about)
-   [http://localhost:4000/about/me](http://localhost:4000/about/me)
-   [http://localhost:4000/post](http://localhost:4000/post)
-   [http://localhost:4000/post?id=10](http://localhost:4000/post?id=10)

### 라우트 모듈화

프로젝트에는 여러지의 라우트를 만들게 될 것입니다. 하지만, 각 라우트를 지금 index.js 에서 다 작성한다면 코드가 너무 길어지겠죠? 그러면 유지보수도 하기 어려워집니다. 이번에는, 라우터를 다른 파일에 작성해서 불러오는 방법을 알아보도록 하겠습니다.

우선, 라우트들을 저장 할 디렉토리부터 만들도록 하겠습니다. src/api/ 디렉토리를 만들고, 이 내부에 index.js 파일을 생성하세요.

#### `src/api/index.js`

```
const Router = require('koa-router');

const api = new Router();

api.get('/books', (ctx, next) => {
    ctx.body = 'GET ' + ctx.request.path;
});

module.exports = api;

```

books 라는 API 를 준비하였습니다. 우리가 이번에 백엔드 서버 작업을 본격적으로 시작하기전에, 우리는 예제삼아 책에 관련된 REST API 를 만들어보고, 작동방식을 이해하고 난 다음에, 프로젝트를 위한 API 를 만들도록 하겠습니다.

이제, 이렇게 모듈로 만든 라우트를 서버 엔트리파일 (src/index.js) 에서 불러와서 사용해보겠습니다.

```
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const api = require('./api');

router.use('/api', api.routes()); // api 라우트를 /api 경로 하위 라우트로 설정

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('heurm server is listening to port 4000');
});

```

이제,  [http://localhost:4000/api/books](http://localhost:4000/api/books)  경로로 브라우저에 들어가보세요.

![](https://backend-intro.vlpt.us/images/api-books.png)

잘 나타나지요?

우리가 앞으로 api 를 여러 종류를 만들건데요, 각 종류들마다 파일을 분리해보도록 하겠습니다. api 디렉토리안에 books 라는 디렉토리를 만들고, 그 안에 index.js 를 만드세요.

#### `src/api/books/index.js`

```
const Router = require('koa-router');

const books = new Router();

books.get('/', (ctx, next) => {
    ctx.body = 'GET ' + ctx.request.path;
});

module.exports = books;

```

그 다음엔, api 인덱스파일에서 /books 경로에 방금 만든 라우트를 연결해주도록 하겠습니다.

#### `src/api/index.js`

```
const Router = require('koa-router');

const api = new Router();
const books = require('./books');

api.use('/books', books.routes());

module.exports = api;

```

### 여러 메소드 사용하기

REST API 에서는, 요청의 종류에 따라 다른 HTTP 메소드를 사용합니다. HTTP 메소드는 여러 종류가 있는데 그 중 주로 사용되는것들은 다음과 같습니다.

-   **GET**: 데이터를 가져올 때 사용합니다.
-   **POST**: 데이터를 등록 할 때 사용됩니다. 혹은, 인증작업을 거칠때도 사용됩니다.
-   **DELETE**: 데이터를 지울 때 사용됩니다.
-   **PUT**: 데이터를 교체 할 때 사용됩니다.
-   **PATCH**: 데이터의 특정 필드를 수정 할 때 사용됩니다.

라우터에서 각 메소드에 대한 요청을 준비 할 때는,  `.get`,  `.post`,  `.delete`,  `.put`,  `.patch`  를 사용하면 됩니다.

한번 사용을 해볼까요?

#### `src/books/index.js`

```
const Router = require('koa-router');

const books = new Router();

const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

books.get('/', handler);

books.post('/', handler);

books.delete('/', handler);

books.put('/', handler);

books.patch('/', handler);

module.exports = books;

```

이제,  [Postman](https://www.getpostman.com/apps)  같은 HTTP 클라이언트 도구를 사용해서 우리가 준비한, get / post / delete / put / patch 메소드를 각각 테스트 해보세요.

![](https://backend-intro.vlpt.us/images/postman-books.png)

방금 작성했던 코드처럼, 각 메소드를 처리하는 함수를 따로 분리시켜서 작성 할 수도 있습니다. 라우트를 작성 할 때에는, 각 라우트에 해당하는 핸들러를 따로 작성하는것이 좋습니다. 그 이유는, 그렇게 해야 라우트들을 한눈에 보기 쉽기 때문이죠.

이제, 각 라우트에 대한 핸들러를 books 디렉토리에 books.controller.js 파일로 분리시켜보도록 하겠습니다.

#### `src/api/books/books.controller.js`

```
exports.list = (ctx) => {
    ctx.body = 'listed';
};

exports.create = (ctx) => {
    ctx.body = 'created';
};

exports.delete = (ctx) => {
    ctx.body = 'deleted';
};

exports.replace = (ctx) => {
    ctx.body = 'replaced';
};

exports.update = (ctx) => {
    ctx.body = 'updated';
};

```

이렇게,  `exports.변수명 = ...`  으로 내보내기 한 코드는, 파일을 불러올 때 다음과 같이 사용 할 수 있습니다.

```
const 모듈명 = require('파일명');
모듈명.변수명

```

코드를 내보낼때에는, 일반 변수값을 내보낼수도 있고, 함수를 내보낼수도있습니다.

그럼, 방금 작성한 코드에 맞춰서 books 인덱스 파일을 업데이트 해주겠습니다.

#### `src/api/books/index.js`

```
const Router = require('koa-router');

const books = new Router();
const booksCtrl = require('./books.controller');

books.get('/', booksCtrl.list);
books.post('/', booksCtrl.create);
books.delete('/', booksCtrl.delete);
books.put('/', booksCtrl.replace);
books.patch('/', booksCtrl.update);

module.exports = books;

```

이제 각 API 들이 잘 작동하는지 테스팅을 해보세요.

Node.js 에서는, 코드가 복잡해질 것 같을땐, 모듈화를 하여 파일을 분리시키는것이 좋습니다. 그렇게 할 수록, 코드의 가독성이 높아지고 유지보수 하기도 편해지기 때문이죠.
