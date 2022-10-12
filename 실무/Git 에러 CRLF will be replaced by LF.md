# Git 에러 CRLF will be replaced by LF

- 맥 또는 리눅스를 쓰는 개발자와 윈도우 쓰는 개발자가 Git으로 협업할 때 발생하는 
**Whitespace** 에러

## 해결법

`core.autocrlf`를 켜는 것!

- 이 기능은 개발자가 git에 코드를 추가했을 때 (예컨대 커밋할 때)에는 CRLF를 LF로 변환해주고, git의 코드를 개발자가 조회할 때 (예컨대 clone한다거나 할 때)에는 LF를 CRLF로 변환해준다.

> `git config --global core.autocrlf true`
> 

- **리눅스나 맥을 사용**하고 있는 경우, 조회할 때 LF를 CRLF를 변환하는 것은 원하지 않을 것이다. 
따라서 뒤에 `input`이라는 명령어를 추가해줌으로써 단방향으로만 변환이 이루어지도록 설정한다.