
javascript를 하면서 실제 코드는 돌아갔는데 무엇이 잘못되어서 원하는 결과가 안나오는지 궁금한 경우가 많았다. 특히나 자바스크립트가 런타임 언어다보니 실제 코드를 돌려보기 전까지는 디버깅이 안되었다.

많은 사람들이 이렇게 불편함을 느껴 탄생하게 된 타입스크립트의 기본문법을 코딩앙마의 강의를 보면서 나중에 계속 체크하기 위해서 핵심 개념만 캡쳐해서 정리하기로 했다.  
아무래도 nest.js로 개발을 하게되면 타입스크립트 ORM을 쓸 것 같으니 우선 기본 문법 정리는 필수인 것 같다.

# 타입스크립트를 쓰는 이유

> 타입스크립트 : 컴파일 언어

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2Fab05fa92-12b0-4b42-b3c7-d55aa0459666%2FScreen%20Shot%202021-08-17%20at%203.51.02%20PM.png)

코드를 돌리기 전임에도 컴퓨터에서 컴파일이 된 상태라서 바로 필요한 인자가 빠졌음을 알려준다.  
코드를 돌려보지 않아도 타입에러, 그외 에러들을 미리미리 잡을 수 있다는 점이 컴파일언어(자바, 타입스크립트)의 장점이다.  
단점은 코딩시간이 오래 걸릴 수 있다는 점이 있다. (나중에 디버깅으로 고생하는 것보다는 ...)

# 기본 타입

> number, string , number [] etc

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2Fc3449d23-122d-4206-abcd-239d0e276ab1%2FScreen%20Shot%202021-08-17%20at%203.56.57%20PM.png)

기본 타입을 지정해주는 것이 기본적인 타입스크립트의 문법

> void : 어떤 값도 반환하지 않을 때  
> ![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2F6423395e-0c9d-4dc1-9d99-ba7a25cb7413%2FScreen%20Shot%202021-08-17%20at%203.58.16%20PM.png)

> never : 에러값이나 영원히 반복되는 경우  
> ![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2Fcb33d6e0-e362-4324-ad73-e3aebeed65de%2FScreen%20Shot%202021-08-17%20at%203.59.08%20PM.png)

> enum : 특정 값들을 같은 그룹으로 묶는 경우  
> ![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2F592ff4bc-61e9-4480-8938-8bba88855b6a%2FScreen%20Shot%202021-08-17%20at%204.00.26%20PM.png)

자동으로 0, 1, 2 인덱스 부여됌  
중간값이 11로 바뀌면 0, 11 ,12 자동으로 다음 인덱스 부여

> Null, undefined  
> ![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2F0dca9a12-f490-4d7d-989c-d840940d535e%2FScreen%20Shot%202021-08-17%20at%204.02.20%20PM.png)

# 인터페이스

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2Ffa4722e6-1fc8-48eb-a665-f1eded092e9e%2FScreen%20Shot%202021-08-17%20at%204.03.20%20PM.png)

해당 인터페이스에 속하면 그 인터페이스가 가지고 있는 요소를 다 가지고 있어야 함, 새로운 값을 추가하면 에러

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2F381917e8-16d5-4b17-8dec-55554f1a952d%2FScreen%20Shot%202021-08-17%20at%204.04.22%20PM.png)  
요소가 없으면 에러 - 필수값이 아니려면 해당 요소 옆에 ? 넣어주기 (`gender?`)

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2F2afd4d1d-170f-414c-bb20-81fc2d5aa956%2FScreen%20Shot%202021-08-17%20at%204.05.36%20PM.png)

키에 해당하는 값이 여러개가 나올 수 있는 경우 위 방법보다 아래처럼 키 : 값 형태로 표현을 하고 들어갈 수 있는 값들이 정해진 새로운 type을 지정해주는 방법이 있다.  
![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2Fe517e0cd-f6fd-44f7-bff9-fd810c6c9134%2FScreen%20Shot%202021-08-17%20at%204.06.29%20PM.png)

```typescript
[grade:number] : Score
```

`grade`는 큰 의미 없고 실제 표현될 때는 1 : "A"이런 식으로 표현됌

> implements - interface로 클래스 표현

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2F2c10ea59-d971-415c-acbd-d044d51a6c5e%2FScreen%20Shot%202021-08-16%20at%206.59.15%20PM.png)

```typescript
//implements
interface Car {
  color : string;
  wheels : number;
  start(): void;
}

class Bmw implements Car {
  color;
  wheels = 4;
  
  constructor(c:string){
    this.color = c;
  }
  start(){
    console.log('go');
  }
}

const b = new Bmw('green')
console.log(b)
b.start()
```

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2Ff1d9546e-3d3f-4c16-af23-1e19785aa89d%2FScreen%20Shot%202021-08-17%20at%204.18.03%20PM.png)

본래 클래스가 인스턴스에 적용이 되고 변수인 green도 색깔에 적용된 모습

> extends - class 확장

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2Fabe6bd02-75c7-4fd3-870d-68443eafc12e%2FScreen%20Shot%202021-08-17%20at%204.19.51%20PM.png)  
위에 벤즈에 벤즈 인터페이스 요소를 넣어도 에러가 나는 이유는 필수적으로 들어가야 하는 car의 인터페이스 부분이 정의되지 않았기 때문

# 함수

함수의 변수 , 결과값에 대해서 타입 지정을 해주어야 함

```typescript
function hello(name:string) : string {
	return `Hello, ${name || "world"}`;
}
```

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2Feacf27d1-710d-496b-91af-0236697c3f55%2FScreen%20Shot%202021-08-17%20at%204.44.04%20PM.png)

`age`가 꼭 들어가 필요가 없다면  `age?`로 표현을 해주면 된다. 단 임의값은 꼭 마지막에만 설정해주어야 함 (파이썬 arguments variable과 유사)

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2F3b9f19a1-be1c-4d3b-a221-0088683f1c6c%2FScreen%20Shot%202021-08-17%20at%204.45.44%20PM.png)

`...`으로 표현을 해주면 들어오는 값들이 배열에 담겨서 전달이 된다.

## 함수 오버로딩

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2F861c90fc-51b7-4d02-816e-e9ecb4de7910%2FScreen%20Shot%202021-08-17%20at%204.34.13%20PM.png)  
예시에서  `sam`과  `jane`에 에러가 나온다. 그 이유는  `age`가  `number`  `string`  두 값이 나오는데 그 값에 따라  `user`,  `string`  두개의 결과가 결정이 되지 않기 때문이다. 따라서 아래와 같이 함수 오버로딩을 통해서  `age`의 타입에 따라 함수출력값의 타입을 지정해주면 에러가 해결이 된다.

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2F20a6da9c-56e5-44e1-bb0a-eb682559c644%2FScreen%20Shot%202021-08-17%20at%204.35.00%20PM.png)

# 리터럴 유니온/교차타입

## 리터럴

const - 값이 변할 수 없음  
let - 값이 변할 수 있음

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2F02a43123-0481-4ad9-a547-63f8bbf5d931%2FScreen%20Shot%202021-08-17%20at%204.52.34%20PM.png)

따라서  `userName2`  에 3을 할당하면 에러가 나온다!(string으로 typescript가 암시적으로 인식해서)

## 유니온

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2Fa6623aea-7773-4a8b-a87e-8da6f8297ad0%2FScreen%20Shot%202021-08-17%20at%204.55.20%20PM.png)  
두 인터페이스 모두 color가 있어서 color를 찍는 건 정상적으로 작동  
`start()`를 찍는 건  `Car`에만 있기 때문에 에러 -> 분기 필요

```typescript
if (gift.name === 'car') {
  gift.start();
} else {
  gift.call();
 }
}
```

## 교차 타입

> interface1 & interface2 로 표현됨

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2F8441c562-fd2f-4a01-a1c5-532011b7e689%2FScreen%20Shot%202021-08-17%20at%204.59.33%20PM.png)

두가지 인터페이스의 값들이 모두 들어있어야 한다.

# 클래스

## public

> 일반적인 경우 -> 부모 클래스의 값을 자식 클래스에서 사용이 가능

## private

> 부모 클래스의 값을 자식 클래스에서 사용 불가능 - 선언된 해당 클래스에서만 사용 가능  
> private 변수, #변수로 표현

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2Fa0420bf8-0df8-446f-a156-647c90b3ba20%2FScreen%20Shot%202021-08-17%20at%205.02.59%20PM.png)

`console.log(super.name);` 부모클래스의 변수를 사용할 수 없어 에러 발생

## protected

> 자식 클래스에서 사용이 가능하나 인스턴스에서는 사용 불가능

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2Fbe70bf17-f89b-4e6f-aa2c-6ebb117d262f%2FScreen%20Shot%202021-08-17%20at%205.15.00%20PM.png)

## static

> this로 접근이 불가능하고 직접 클래스 적용해줘야 함

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2F10649d32-58c2-4ec9-9a9d-fe87c5cb598e%2FScreen%20Shot%202021-08-17%20at%205.18.49%20PM.png)

```typescript
//console.log(this.wheels)  대신에
console.log(Car.wheels)
```

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2Fe4e32460-917f-4628-a1e5-e487a3ea3e91%2FScreen%20Shot%202021-08-17%20at%205.19.15%20PM.png)

## 추상 클래스

> new로 새 객체(인스턴스)를 만들 수 없음, 상속된 자식 클래스로 인스턴스 만들기는 가능

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2Fdaf2a5fa-ef0f-4268-bd5c-adaa2586bfea%2FScreen%20Shot%202021-08-17%20at%205.24.18%20PM.png)

> 추상 메서드 -> 상속받는 클래스에서 반드시 구현을 해주어야한다. -> 한 메서드에 대해서 각기 다른 로직 적용가능

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2F868f4f25-0489-40a7-b8bd-ebdfd1922954%2FScreen%20Shot%202021-08-17%20at%205.24.32%20PM.png)  
![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2F5958cd66-e9b8-4e87-8bbc-141031c14567%2FScreen%20Shot%202021-08-17%20at%205.25.06%20PM.png)

# 제네릭

```typescript
function getSize(arr: number[] | string[] | boolean[] | object[]):number {
    return arr.length;
}

const arr1 = [1, 2, 3]
getSize(arr1) //3

const arr2 = ["a", "b", "c"]
getSize(arr1) //3

const arr3 = [false, true, false]
getSize(arr1) //3

const arr4 = [{},{},{name:"tom"}]
getSize(arr1) //3

```

이렇게 경우의 수를 나열하는 대신에 호출할 때 타입을 정해줄 수 있음

```typescript
function getSize<T>(arr: T[]):number {
    return arr.length;
}

const arr1 = [1, 2, 3]
getSize<number>(arr1) //3

const arr2 = ["a", "b", "c"]
getSize<string>(arr2) //3

const arr3 = [false, true, false]
getSize<boolean>(arr3) //3

const arr4 = [{},{},{name:"tom"}]
getSize<object>(arr4) //3

```

![](https://velog.velcdn.com/images%2Fnellholic108%2Fpost%2F8b2da55a-89a0-492e-9fa1-fedaee46aa19%2FScreen%20Shot%202021-08-17%20at%205.39.11%20PM.png)

`option`에 들어가는 값이 여러가지 인 경우 정의를 하는 부분에서 타입을 지정하도록 제너릭 사용


