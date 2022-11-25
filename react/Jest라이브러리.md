
# Jest로 기본적인 테스트 작성하기

Jest는 페이스북에서 만들어서 React와 더불어 많은 자바스크립트 개발자들로 부터 좋은 반응을 얻고 있는 테스팅 라이브러리입니다. 출시 초기에는 프론트앤드에서 주로 쓰였지만 최근에는 백앤드에서도 기존의 자바스크립트 테스팅 라이브러리를 대체하고 있습니다.

## [](https://www.daleseo.com/jest-basic/#jest-all-in-one-%ED%85%8C%EC%8A%A4%ED%8C%85-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC)Jest: All-in-one 테스팅 라이브러리

페이스북에서는 Jest를 단순한 테스팅 라이브러리가 아닌 “테스팅 프레임워크”라고 부르는 만큼 기존 자바스크립트 테스팅 라이브러리와는 차별점이 있습니다. Jest 이전에는 자바스크립트 코드를 테스트하라면 여러가지 테스팅 라이브러리를 조합해서 사용하곤 했었습니다. 예를 들어, Mocha나 Jasmin을 Test Runner로 사용하고, Chai나 Expect와 같은 Test Matcher를 사용했으며, 또한 Sinon과 Testdouble 같은 Test Mock 라이브러리도 필요했었습니다. 이 라이브러리들은 굉장히 유사하지만 살짝씩 다른 API를 가지고 있었기 때문에, 여러 프로젝트에 걸쳐서 일하는 자바스크립트 개발자들에게 혼란을 주기도 했었습니다. 하지만 Jest는 라이브러리 하나만 설치하면, Test Runner와 Test Matcher 그리고 Test Mock 프레임워크까지 제공해주기 때문에 상당히 편리하게 느껴지는 것 같습니다.

이번 포스팅는 Jest 테스팅 프레임워크를 사용하는 기본적인 방법에 대해서 알아보록 하겠습니다.

## [](https://www.daleseo.com/jest-basic/#%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%83%9D%EC%84%B1)프로젝트 생성

프로젝트 디렉터리를 생성하고 NPM 초기화 커맨드로  `package.json`  파일을 만듭니다.

```text
$ mkdir my-jest
$ npm init -y
$ ls
package.json
```

## [](https://www.daleseo.com/jest-basic/#jest-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%84%A4%EC%B9%98)Jest 라이브러리 설치

Jest 라이브러리를 개발 의존성으로 설치합니다.

```text
$ npm i -D jest
```

## [](https://www.daleseo.com/jest-basic/#test-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%88%98%EC%A0%95)test 스크립트 수정

`package.json`  파일을 열고  `test`  스크립트를  `jest`로 수정해줍니다.

```js
  "scripts": {
    "test": "jest"
  },
```

이렇게 해줌으로써 터미널에  `npm test`라고 입력하면  `jest`  커맨드를 실행할 수 있습니다.  `jest`  커맨드를 전역으로 설치할 수도 있겠지만, 실제 프로젝트에서는 스크립트로 등록해놓고 사용하는 경우가 많습니다.

## [](https://www.daleseo.com/jest-basic/#%EC%B2%AB-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BD%94%EB%93%9C-%EC%9E%91%EC%84%B1)첫 테스트 코드 작성

`test.js`라는 파일을 생성하고, 그 안에 다음과 같이 입력합니다.

```js
test("1 is 1", () => {
  expect(1).toBe(1);
});
```

그 다음 터미널에  `npm test`를 실행해보면 초록색 글씨로 테스트가 통과했다고 나옵니다.

```bash
$ npm test

> my-jest@1.0.0 test /my-jest
> jest

 PASS  ./test.js
  ✓ 1 is 1 (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.868s, estimated 1s
Ran all test suites.
```

자, 이렇게 첫 테스트 코드를 작성하고 테스트가 통과되었습니다!

기본적으로 테스트는 다음과 같이 일정한 패턴으로 작성합니다.

```js
test("테스트 설명", () => {
  expect("검증 대상").toXxx("기대 결과");
});
```

`toXxx`  부분에서 사용되는 함수를 흔히 Test Matcher라고 하는데요. 위에서 사용된  `toBe()`  함수는 숫자나 문자와 같은 객체가 아닌 기본형(primitive) 값을 비교할 때 사용됩니다.

그리고  `npm test`를 실행하면 프로젝트 내에 모든 테스트 파일을 찾아서 테스트를 실행해줍니다. Jest는 기본적으로  `test.js`로 끝나거나,  `__test__`  디렉터리 안에 있는 파일들은 모두 테스트 파일로 인식합니다. 만약 특정 테스트 파일만 실행하고 싶은 경우에는  `npm test <파일명 이나 경로>`를 입력하면 됩니다.

## [](https://www.daleseo.com/jest-basic/#%EC%9E%90%EC%A3%BC-%EC%82%AC%EC%9A%A9%EB%90%98%EB%8A%94-matcher)자주 사용되는 Matcher

Jest에서는 거의 상상 가능한 모든 경우에 대한 Matcher 함수를 제공하고 있습니다. 이번 포스팅에서는 기본적인 사용법을 다루고 있는 만큼 실전에서 많이 사용되는 Matcher만 다뤄보도록 하겠습니다.

### [](https://www.daleseo.com/jest-basic/#toequal)toEqual()

다음과 같이 아이디를 넘기면 가짜 유저 객체를 리턴하는 함수를 테스트하려고 합니다.

```js
function getUser(id) {
  return {
    id,
    email: `user${id}@test.com`,
  };
}
```

위에서 했던 방식으로 다음과 같이  `toBe()`  함수를 사용하면 테스트가 실패하는 것을 알 수 있습니다.

```js
test("return a user object", () => {
  expect(getUser(1)).toBe({
    id: 1,
    email: `user1@test.com`,
  });
});
```

진철하게도 Jest는  `toBe()`  대신에  `toEqual()`  함수를 사용하라고 가이드해주고 있습니다. 실제로 테스트 코드를 작성할 때는 객체를 검증해야할 일이 많기 때문에  `toEqual()`  함수를 가장 많이 접할 수 있습니다.

```bash
$ npm test

> my-jest@1.0.0 test /my-jest
> jest

 FAIL  ./test.js
  ✕ return a user object (7ms)

  ● return a user object

    expect(received).toBe(expected) // Object.is equality

    Expected: {"email": "user1@test.com", "id": 1}
    Received: {"email": "user1@test.com", "id": 1}

    Difference:

    Compared values have no visual difference. Note that you are testing for equality with the stricter `toBe` matcher using `Object.is`. For deep equality only, use `toEqual` instead.

      11 |
      12 | test('return a user object', () => {
    > 13 |   expect(getUser(1)).toBe({
         |                      ^
      14 |     id: 1,
      15 |     email: `user1@test.com`
      16 |   });

      at Object.toBe (test.js:13:22)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.901s, estimated 1s
Ran all test suites.
npm ERR! Test failed.  See above for more details.
```

다음과 같이 Matcher 함수 부분을  `toEqual()`로 교체하면,

```js
test("return a user object", () => {
  expect(getUser(1)).toEqual({
    id: 1,
    email: `user1@test.com`,
  });
});
```

테스트는 통과하게 됩니다.

```bash
$ npm test

> my-jest@1.0.0 test /my-jest
> jest

 PASS  ./test.js
  ✓ return a user object (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.91s, estimated 1s
Ran all test suites.
```

### [](https://www.daleseo.com/jest-basic/#tobetruthy-tobefalsy)toBeTruthy(), toBeFalsy()

`toEqual()`  함수 다음으로 많이 사용되는 Matcher 함수는 아마도  `toBeTruthy()`  와  `toBeFalsy()`일 것입니다. 많은 분들이 아시다시피 느슨한 타입 기반 언어인 자바스크립트는, 자바같은 강한 타입 기반 언어처럼  `true`와  `false`가 boolean 타입에 한정되지 않습니다. 따라서 숫자  `1`이  `true`로 간주되고, 숫자  `0`이  `false`로 간주되는 것과 같이 모든 타입의 값들을  `true`  아니면  `false`  간주하는 규칙이 있습니다.  `toBeTruthy()`는 검증 대상이 이 규칙에 따라  `true`로 간주되면 테스트 통과이고,  `toBeFalsy()`는 반대로  `false`로 간주되는 경우 테스트가 통과됩니다.

```js
test("number 0 is falsy but string 0 is truthy", () => {
  expect(0).toBeFalsy();
  expect("0").toBeTruthy();
});
```

### [](https://www.daleseo.com/jest-basic/#tohavelength-tocontain)toHaveLength(), toContain()

배열의 경우에는 배열이 길이를 체크하거나 특정 원소가 존재 여부를 테스트하는 경우가 많습니다.  `toHaveLength()`  배열의 길이를 체크할 때 쓰이고,  `toContain()`  특정 원소가 배열에 들어있는지를 테스트할 때 쓰입니다.

```js
test("array", () => {
  const colors = ["Red", "Yellow", "Blue"];
  expect(colors).toHaveLength(3);
  expect(colors).toContain("Yellow");
  expect(colors).not.toContain("Green");
});
```

위 테스트 코드를 주의 깊게 보시면 마지막 줄에  `not`  Matcher가 사용된 것을 알 수 있습니다. 이처럼 어떤 Matcher 함수가 불만족하는지를 테스트할 때는 앞에  `not`을 붙여주면 됩니다.

### [](https://www.daleseo.com/jest-basic/#tomatch)toMatch()

문자열의 경우에는 단순히  `toBe()`를 사용해서 문자열이 정확히 일치하는지를 체크하지만, 종종 정규식 기반의 테스트가 필요할 떄가 있는데  `toMatch()`  함수를 사용하면됩니다.

```js
test("string", () => {
  expect(getUser(1).email).toBe("user1@test.com");
  expect(getUser(2).email).toMatch(/.*test.com$/);
});
```

### [](https://www.daleseo.com/jest-basic/#tothrow)toThrow()

마지막으로 예외 발생 여부를 테스트해야할 때는  `toThrow()`  함수를 사용하면 됩니다.  `toThrow()`  함수는 인자도 받는데 문자열을 넘기면 예외 메세지를 비교하고 정규식을 넘기면 정규식 체크를 해줍니다.

먼저, 위에서 작성한  `getUser()`  함수가 음수 아이디가 들어왔을 경우, 예외를 던지도록 수정하겠습니다.

```js
function getUser(id) {
  if (id <= 0) throw new Error("Invalid ID");
  return {
    id,
    email: `user${id}@test.com`,
  };
}
```

그리고 테스트 코드를 작성해서 실행해보면 다음과 같이 테스트가 실패하게 됩니다.

```js
test("throw when id is non negative", () => {
  expect(getUser(-1)).toThrow();
  expect(getUser(-1)).toThrow("Invalid ID");
});
```

```bash
$ npm test

> my-jest@1.0.0 test /my-jest
> jest

 FAIL  ./test.js
  ✕ throw when id is non negative (2ms)

  ● throw when id is non negative

    Invalid ID

      1 | function getUser(id) {
    > 2 |   if (id <= 0) throw Error('Invalid ID');
        |                      ^
      3 |   return {
      4 |     id,
      5 |     email: `user${id}@test.com`

      at Error (test.js:2:22)
      at Object.getUser (test.js:10:10)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.928s, estimated 1s
Ran all test suites.
npm ERR! Test failed.  See above for more details.
```

`toThrow()`  함수를 사용할 때 하기 쉬운 실수 인데요. 반드시  `expect()`  함수에 넘기는 검증 대상을 함수로 한 번 감싸줘야 합니다. 그렇지 않으면 예외 발생 여부를 체크하는 것이 아니라, 테스트 실행 도중 정말 그 예외가 발생하기 때문에 그 테스트는 항상 실패하게 됩니다.

아래와 같이, 예외가 발생할 함수 호출 부분을 함수로 감싸주면,

```js
test("throw when id is non negative", () => {
  expect(() => getUser(-1)).toThrow();
  expect(() => getUser(-1)).toThrow("Invalid ID");
});
```

테스트는 통과하게 됩니다.

```bash
$ npm test

> my-jest@1.0.0 test /my-jest
> jest

 PASS  ./test.js
  ✓ throw when id is non negative (2ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.449s
Ran all test suites.
```
