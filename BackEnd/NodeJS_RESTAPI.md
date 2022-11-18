
## - 개요

이번 시간에는 RESTFul API 서버를 구축을 해보겠습니다.

그런데 RESTFul API라는 말은 무엇 일가요...? IT 전문용어는 정말 끝도 없습니다...

간단하게 설명하면 "클라이언트와 서버 간에 데이터를 주고받는 방식을 정의한다"라고 생각하시면 됩니다.

HTTP URI(Uniform Resource Identifier)를 통해 데이터(자원)를 명시하고 Method(GET, POST, PUT, DELETE)를 통해 해당 데이터를 CRUD(Create, Read, Update, Delete)을 한다고 생각하면 됩니다,

(RESTFul API 관련해서 설명하면 글이 정말 길어져서 이 부분은 다른 포스팅에 올리도록 하겠습니다.)

## - REST Method

-   GET : 조회
-   POST : 생성
-   PUT : 전체 수정
-   DELETE : 삭제
-   PATCH : 수정

HTTP 통신을 할 때 위와 같은 메서드를 정의해서 통신을 합니다.

지난 시간 소스코드에 추가를 하면서 진행하도록 하겠습니다.

```
지난 시간 코드
//express 모듈 불러오기
const express = require("express");
//express 사용
const app = express(); 

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/**
 * 파라미터 변수 뜻
 * req : request 요청
 * res : response 응답
 */

/**
 * @path http://localhost:3000/ 경로
 */
app.get("/", (req, res) => {
    res.send("Hello World");
});
  
// http listen port 생성 서버 실행
app.listen(3000, () => console.log("개발이 취미인 남자 :)"));
```

### - GET, POST, PUT, DELETE, PATCH

전체 코드

```
//express 모듈 불러오기
const express = require("express");

//express 사용
const app = express();

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//임시 데이터
const users = [
 { id: 1, name: "유저1" },
 { id: 2, name: "유저2" },
 { id: 3, name: "유저3" }
];

/**
 * 파라미터 변수 뜻
 * req : request 요청
 * res : response 응답
 */

/**
 * @path {GET} http://localhost:3000/
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */
app.get("/", (req, res) => {

    //Hello World 데이터 반환
    res.send("Hello World");
});

/**
 * @path {GET} http://localhost:3000/api/users
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */
app.get("/api/users", (req, res) => {

    //유저 정보 반환
    res.json({ok: true, users: users});
})

/**
 * @path {GET} http://localhost:3000/api/users/user?user_id=1
 * @description Query Params 요청 데이터 값이 있고 반환 값이 있는 GET Method 
 * 
 *  Query Params 방식
 *  user 뒤에 user_id변수를 통해 값을 찾아 올수 있다.
 *  &를 통해 두번째 변수를 받아서 사용할 수 있다.(/user?user_id=1&name="유저1")
 * 
 */
app.get("/api/users/user", (req, res) => {

    const user_id = req.query.user_id

    //filter라는 함수는 자바스크립트에서 배열 함수이다. 필터링을 할때 많이 사용된다 필터링한 데이터를 새로운 배열로 반환한다.
    const user = users.filter(data => data.id == user_id);

    res.json({ok: false, user: user})
})

/**
 * @path {GET} http://localhost:3000/api/users/userBody
 * @description Body 요청 데이터 값이 있고 반환 값이 있는 GET Method 
 * 
 *  post로 요청시 body에 데이터를 담아서 보낼수 있듯이 get도 사용이 가능하다.
 */
app.get("/api/users/userBody", (req, res) => {

    const user_id = req.body.user_id

    //filter라는 함수는 자바스크립트에서 배열 함수이다. 필터링을 할때 많이 사용된다 필터링한 데이터를 새로운 배열로 반환한다.
    const user = users.filter(data => data.id == user_id);

    res.json({ok: false, user: user})
})


 
/**
 * @path {GET} http://localhost:3000/api/users/:user_id
 * @description Path Variables 요청 데이터 값이 있고 반환 값이 있는 GET Method 
 * 
 *  Path Variables 방식
 * 
 *  ex) 아래 GET 주소 에서 :user_id 는 서버에서 설정한 주소 키 값이다.
 *      값을 찾을 때는 req.params.user_id 로 값을 찾는다.
 * 
 *  *주의 사항*
 *  :user_id 이 부분은 변수이기 때문에 
 *  경로가 /users/1 이거나 /users/2 이거 일때 둘다 라우터를 거치게 된다.
 *  그렇기 때문에 다른 라우터 보다 아래 있어야 한다.
 */
app.get("/api/users/:user_id", (req, res) => {

    const user_id = req.params.user_id

    //filter라는 함수는 자바스크립트에서 배열 함수이다. 필터링을 할때 많이 사용된다 필터링한 데이터를 새로운 배열로 반환한다.
    const user = users.filter(data => data.id == user_id);

    res.json({ok: true, user: user})
})


/**
 * @path {POST} http://localhost:3000/api/users/add
 * @description POST Method
 * 
 *  POST 데이터를 생성할 때 사용된다.
 *  req.body에 데이터를 담아서 보통 보낸다.
 */
app.post("/api/users/add", (req, res) => {

    // 구조분해를 통해 id 와 name을 추출
    const { id, name } = req.body

    //concat 함수는 자바스크립트에서 배열 함수이다. 새로운 데이터를 추가하면 새로운 배열로 반환한다.
    const user = users.concat({id, name});

    res.json({ok: true, users: user})
})

/**
 * @path {PUT} http://localhost:3000/api/users/update
 * @description 전체 데이터를 수정할 때 사용되는 Method
 */
app.put("/api/users/update", (req, res) => {
    
    // 구조분해를 통해 id 와 name을 추출
    const { id, name } = req.body

    //map 함수는 자바스크립트에서 배열 함수이다. 요소를 일괄적으로 변경할 때 사용됩니다.
    const user = users.map(data => {

        if(data.id == id) data.name = name

        return {
            id: data.id,
            name: data.name
        }
    })

    res.json({ok: true, users: user})
})

/**
 * @path {PATCH} http://localhost:3000/api/user/update/:user_id
 * @description 단일 데이터를 수정할 때 사용되는 Method
 */
app.patch("/api/user/update/:user_id", (req, res) => {

    const { user_id} = req.params
    const { name } = req.body

    //map 함수는 자바스크립트에서 배열 함수이다. 요소를 일괄적으로 변경할 때 사용됩니다.
    const user = users.map(data => {

        if(data.id == user_id) data.name = name

        return {
            id: data.id,
            name: data.name
        }
    })

    res.json({ok: true, users: user})
})

/**
 * @path {DELETE} http://localhost:3000/api/user/delete
 * @description 데이터 삭제
 * 
 */
app.delete("/api/user/delete", (req, res) => {

    const user_id = req.query.user_id

    //filter라는 함수는 자바스크립트에서 배열 함수이다. 필터링을 할때 많이 사용된다 필터링한 데이터를 새로운 배열로 반환한다.
    const user = users.filter(data => data.id != user_id );

    res.json({ok: true, users: user})
})

// http listen port 생성 서버 실행
app.listen(3000, () => console.log("개발이 취미인 남자 :)"));
```

클라이언트가 데이터를 전송하는 방식은 3가지 방식이 있습니다. 위 코드에서는 대표적으로 GET 방식에서 설명하고 있습니다.

다른 메서드에서도 사용이 가능합니다.

1.  Query Params (req.query.user_id)
2.  Body (req.body.user_id)
3.  Path Variables (req.params.user_id)
4.  그리고 위 방식을 혼합해서 사용할 수 있습니다.

#### - GET (조회)

GET Method는 데이터를 조회하는데 사용됩니다. 보통 3번 방식은 잘 사용하지 않습니다. 참고해서 만드는걸 추천드립니다. :)

#### - POST (생성)

POST Method 는 데이터를 생성할 때 사용됩니다. 보통 Body 에 데이터를 담아서 전송합니다.

#### - PUT (전체 데이터 수정)

PUT Method 는 전체 데이터를 수정할 때 사용됩니다. 보통 Body 에서 수정할 데이터를 담아서 전송합니다.

#### - PATCH(단일 데이터 수정)

PATCH Method 는 단일 데이터를 수정할 때 사용됩니다. 보통 Query Params나 Path Variables와 Body를 혼합에서 잘 사용합니다.

#### - DELETE(삭제)

DELETE Method 는 데이터를 삭제할 때 사용됩니다.  보통 Query Params나 Path Variables를 잘 사용합니다.

이번 시간에는 Node.js Express를 활용한 RESTFul API를 만들어 봤습니다.
