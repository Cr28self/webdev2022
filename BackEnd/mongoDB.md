
![MongoDB Logo](https://poiemaweb.com/img/mongo-db-logo.png)

# [#](https://poiemaweb.com/mongdb-basics#1-introduction)1. Introduction

[MongoDB](https://www.mongodb.com/)는 Document-Oriented(문서 지향적)  [NoSQL](https://ko.wikipedia.org/wiki/NoSQL)  데이터베이스이다. 오픈 소스이며 엔진은 C++로 작성되었다.

NoSQL이란 Not Only SQL의 약자로서 기존의 RDBMS(관계형 데이터베이스)의 한계를 극복하기 위한 새로운 형태의 데이터베이스이다.

**Document**

[Document](https://docs.mongodb.com/manual/core/document/)는 RDMS의 record와 유사한 개념으로 JSON objects 형태의 key-value의 쌍으로 이루어진 데이터 구조로 구성된다.

value에는 다른 document, array, document array가 포함될 수 있다.

![MongoDB Document](https://poiemaweb.com/img/mongodb-document.png)

MongoDB Document

Document의 형태를 살펴보자.

```
{
  _id: ObjectId("5099803df3f4948bd2f98391"),
  name: { first: "Alan", last: "Turing" },
  birth: new Date('Jun 23, 1912'),
  death: new Date('Jun 07, 1954'),
  contribs: [ "Turing machine", "Turing test", "Turingery" ],
  views : NumberLong(1250000)
}

```

각 Document는  `_id`라는 고유한 값을 갖는다. 이 고유한 값은 시간/머신ID/프로세스ID/순차번호로 구성되며 값의 고유성을 보장한다.

**Collection**

[Collection](https://docs.mongodb.com/manual/core/databases-and-collections/#collections)은 RDMS의 table과 유사한 개념으로 Document들의 집합으로 구성된다.

**Database**

[Database](https://docs.mongodb.com/manual/core/databases-and-collections/#databases)는 Collection들의 물리적인 컨테이너이다.

Database는 0개 이상의 Collection들의 집합으로 구성되며 Collection은 0개 이상의 Document로 구성되고 Document는 1개 이상의 field로 구성된다.

![MongoDB Structure](https://poiemaweb.com/img/mongodb-structure.png)

MongoDB Structure
