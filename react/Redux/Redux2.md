# Redux

## Action Creator

- 액션 생성 함수, 액션을 만들기 위해 사용
- 액션 생성 함수를 컴포넌트에 실제로 적용한다. export해서 dispatch와 함께 사용하게 된다.

```jsx
export function 함수명(변수이름) => {
	return {
		type: 액션타입변수이름, 
		변수이름: 변수이름
	}
}
export function createBucket(bucket){
  return {
		type: CREATE, 
		bucket: bucket
	};
}
```

---

## Action

- type필드를 가지는 JS객체
    - 보통 type과 payload프로퍼티를 가짐
        - type : 어떤 액션인지를 나타냄
        - payload : 데이터를 담음
- 쉽게 말해, 어떤 일이 일어났는지를 설명하는 이벤트라고 생각해도 무방
- 액션 타입을 생성함
- 액션을 불러오는 주소를 만드는 것이라고 생각하면 쉽다.

```jsx
const 액션타입변수이름 = "액션타입이름"
const CREATE = "bucket/CREATE";
const DELETE = "bucket/DELETE";
```

### 동작법

- Action은 dispatch를 통해 reducer함수로 보내짐
    - 기존 state를 기반으로 새로운 state생성
        - ( Redux는 불변성을 지키는 것이 원칙!! )

![Untitled](Redux%20f120333673aa4c9794353428d7c7ac2d/Untitled.png)

---

## Dispatch

- Redux에서는 Action을 Reducer로 전달하는 역할
- 액션을 발생 시키는 역할

```jsx
dispatch(액션생성함수명);//액션 생성 함수 : ActionCreate함수
```

> 즉, state를 업데이트 하는 방법은 store.dispatch함수를 호출하는 것
> 

> 이벤트를 발생시키는 역할
> 

---

## Reducer

- Reducer함수는 기존의 state와 action을 받아서 새로운 state를 생성하는 함수
- store에 들어가 데이터를 변경
- 이벤트 리스너라고 생각해도 무방
- 몇가지 규칙이 존재함..
    - Reducer는 SideEffect를 발생 시켜서는 안됨!!
        - 함수 외부의 존재하는 state or behavior를 변화를 주는것
        
        > 따라서, Reducer에서는 비동기 로직이 존재할 수 없다.
        > 
        
        > 이때, Redux-middleware를 사용해서 비동기 로직을 사용한다.
        > 

```jsx
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/CREATE": {
      const new_bucket_list = [...state.list, action.bucket];
      return {list : new_bucket_list};
    }

    case "bucket/DELETE": {
      const new_bucket_list = state.list.filter((l, idx) => {
        return parseInt(action.bucket_index) !== idx;
      });
  
     return {list: new_bucket_list};
    }
    default:
      return state;
  }
}
```

### Root Reducer

- Redux에서는 오직 하나의 리듀서만이 존재합니다.
- 실무에서는 유지 보수를 위해 여러 개의 리듀서를 만든 뒤에 하나의 Root Reducer로 병합