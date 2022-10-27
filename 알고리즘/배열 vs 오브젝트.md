# 배열 vs 오브젝트

```jsx
let instructor = {
	firstName : "Kelly",
	isInstructor : true,
	favoriteNumbrers : [1,2,3,4],
}

```

- 객체는 정렬되어 있지 않는 구조, 시작과 끝이 없는 존재
    - 빠른 접근, 입력, 제거를 원할때 좋다.
    - 전부다 상수 시간 ( O(1) )
- 탐색할때는 선형 시간 O(N)

- JS에서 어떤 정보를 객체 안에 상수 시간O(1) 안에 저장할 수 있음
    - 단지 key를 사용해서 데이터를 추가함
- 원하는 내용을 상수 시간 안에 불러올 수 있음

어떠한 정보를 탐색하는 시간은 상수 시간입니다.

어떤 특정한 정보가 어떤 값에 있는지 확인하는 것입니다.

이쪽에 있는지, 쉽게 알 수 있는 방법이 없어요.

잠재적으로 모든 아이템에 모든 속성을 확인해야할 수 있습니다.

- 위에서부터 하나씩 벗겨봐서 확인함
- ex) true를 찾을때..
    - firstName확인 → “kelly” (X)
    - isInstructor 확인 → true ( O )
    
- Object.Keys - O(N)
- Object.values - O(N)
- Object.entries - O(N)
- hasOwnProperty - O(1)