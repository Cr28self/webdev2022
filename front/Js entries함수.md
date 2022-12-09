
# Array.prototype.entries()

**`entries()`** 메서드는 배열의 각 인덱스에 대한 키/값 쌍을 가지는 새로운 **`Array Iterator`** 객체를 반환합니다.

## 예시
```
const a = ["a", "b", "c"];

for (const [index, element] of a.entries()) {
  console.log(index, element);
}

// 0 'a'
// 1 'b'
// 2 'c'
```
---
```
const array1 = ['a', 'b', 'c'];

const iterator1 = array1.entries();

console.log(iterator1.next().value);
// expected output: Array [0, "a"]

console.log(iterator1.next().value);
// expected output: Array [1, "b"]
```
