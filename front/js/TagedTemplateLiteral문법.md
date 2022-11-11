
[](https://mygumi.tistory.com/395)

Tagged Template Literals 문법 :: 마이구미


> 이 글은 "Tagged Template Literals" 문법을 다룬다.  
> 이 문법은 직접 구현해서 사용하는 경우는 흔치 않지만 이미 여러 라이브러리에서 활용하고 있어 쉽게 접할 수 있다.  
> MDN -  [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)

#### Template Literals

우리는 동적인 문자열을 처리할 때 다음과 같은 형태를 많이 사용한다.

```
const userName = 'Mygumi';
const age = 20;
const output = `Hi, ${userName} and I am ${age}.`;
```

ES6 에서 새롭게 도입된 기능으로 템플릿 리터럴(Template Literals) 이라고 불린다.

백틱(`) 을 사용하여 문자열과 변수를 함께 사용할 수 있어 문자열 처리에 유용한 기능이다.

#### Tagged 가 붙은 "Tagged Template Literals" 는 무엇인가?

템플릿 리터럴의 발전된 형태로써, 함수 형태로 사용할 수 있다.

이 문법은 문자열에서 userName, age 와 같은 변수들과 "Hi," "and I am" 과 같은 정적인 문자열을 구분지을 수 있다.

여기서는 정적 데이터, 동적 데이터라고 구분 짓겠다.

예제를 통해 확인해보자.

```
function transform(staticData, ...dynamicData) {
  console.log(staticData); // ["Hi, ", " and I am ", "."]
  console.log(dynamicData); // ["Mygumi", 20]
}

transform`Hi, ${userName} and I am ${age}.`;
```

transform 함수를 일반적인 함수 호출 방식인 transform() 이 아닌 transform`` 형태인 것을 볼 수 있다.

첫번째 파라미터에는 정적 데이터가 저장되어 있고, 나머지 파라미터에는 동적 데이터가 저장되어 있는 모습을 볼 수 있다.

  
동적 데이터를 자세히 보면 age 값의 타입은 String 이 아닌 Number 형태로 타입이 유지된다.

만약 function 으로 호출했다면, 전달되는 파라미터는 단순 하나의 문자열이다.

```
function transform(staticData) {
  console.log(staticData); // Hi, Mygumi and I am 20.
}

transform(`Hi, ${userName} and I am ${age}.`);
```

즉, Tagged Template Literals 문법을 사용하면 타입에 상관없이 Function, Number, Array, Object 등을 전달하고 이를 실행할 수 있게 된다.

이게 얼마나 파워풀한지 가늠이 안될 수 있다.

실제로 우리가 이것을 활용해 무언가를 구현할 일은 크게 없을 것이다.

하지만 많은 라이브러리에 이를 기반으로 구현이 되어있고 우리는 그것을 편하게 사용하고 있다.

이 문법을 통해 사용되는 라이브러리들이 어떻게 이런 매직이 가능한지 이해하고 있으면 조금이나마 도움이 될 수 있다.

#### 실제 사용 사례

Styled-components

```
const Button = styled.a`
  display: inline-block;
  border-radius: 3px;

  ${props => props.primary && css`
    background: white;
    color: black;
  `}
`
```

Apollo GraphQL

```
gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;
```

Jest

```
test.each`
  a    | b    | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
`('returns $expected when $a is added $b', ({a, b, expected}) => {
  expect(a + b).toBe(expected);
});
```

i18n

```
i18n`Hello ${name}!`
```
