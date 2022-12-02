
# 1. 클로저(closure)의 개념

클로저(closure)는 자바스크립트에서 중요한 개념 중 하나로 자바스크립트에 관심을 가지고 있다면 한번쯤은 들어보았을 내용이다.  [execution context](https://poiemaweb.com/js-execution-context)에 대한 사전 지식이 있으면 이해하기 어렵지 않은 개념이다. 클로저는 자바스크립트 고유의 개념이 아니라 함수를 일급 객체로 취급하는 함수형 프로그래밍 언어(Functional Programming language: 얼랭(Erlnag), 스칼라(Scala), 하스켈(Haskell), 리스프(Lisp)…)에서 사용되는 중요한 특성이다.

클로저는 자바스크립트 고유의 개념이 아니므로 ECMAScript 명세에 클로저의 정의가 등장하지 않는다. 클로저에 대해  [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)은 아래와 같이 정의하고 있다.

“A closure is the combination of a function and the lexical environment within which that function was declared.”  
클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다.

무슨 의미인지 잘 와닿지 않는다. 위 정의에서 중요한 키워드는 “함수가 선언됐을 때의 렉시컬 환경(Lexical environment)”이다.

말이 무척이나 난해하니 우선 예제부터 살펴보자. “The Art of Computer Programming”의 저자  [도널드 커누스](https://ko.wikipedia.org/wiki/%EB%8F%84%EB%84%90%EB%93%9C_%EC%BB%A4%EB%88%84%EC%8A%A4)의 말처럼 우리 모두는 자신의 힘으로 발견한 내용을 가장 쉽게 익힌다.

```javascript
function outerFunc() {
  var x = 10;
  var innerFunc = function () { console.log(x); };
  innerFunc();
}

outerFunc(); // 10

```

함수 outerFunc 내에서 내부함수 innerFunc가 선언되고 호출되었다. 이때 내부함수 innerFunc는 자신을 포함하고 있는 외부함수 outerFunc의 변수 x에 접근할 수 있다. 이는 함수 innerFunc가 함수 outerFunc의 내부에 선언되었기 때문이다.

스코프는 함수를 호출할 때가 아니라 함수를 어디에 선언하였는지에 따라 결정된다. 이를  **[렉시컬 스코핑(Lexical scoping)](https://poiemaweb.com/js-scope#7-%EB%A0%89%EC%8B%9C%EC%BB%AC-%EC%8A%A4%EC%BD%94%ED%94%84)**라 한다. 위 예제의 함수 innerFunc는 함수 outerFunc의 내부에서 선언되었기 때문에 함수 innerFunc의 상위 스코프는 함수 outerFunc이다. 함수 innerFunc가 전역에 선언되었다면 함수 innerFunc의 상위 스코프는 전역 스코프가 된다.

함수 innerFunc가 함수 outerFunc의 내부에 선언된 내부함수이므로 함수 innerFunc는 자신이 속한 렉시컬 스코프(전역, 함수 outerFunc, 자신의 스코프)를 참조할 수 있다. 이것을  [실행 컨텍스트](https://poiemaweb.com/js-execution-context)의 관점에서 설명해보자.

내부함수 innerFunc가 호출되면 자신의 실행 컨텍스트가 실행 컨텍스트 스택에 쌓이고 변수 객체(Variable Object)와 스코프 체인(Scope chain) 그리고 this에 바인딩할 객체가 결정된다. 이때 스코프 체인은 전역 스코프를 가리키는 전역 객체와 함수 outerFunc의 스코프를 가리키는 함수 outerFunc의 활성 객체(Activation object) 그리고 함수 자신의 스코프를 가리키는 활성 객체를 순차적으로 바인딩한다. 스코프 체인이 바인딩한 객체가 바로 렉시컬 스코프의 실체이다.
