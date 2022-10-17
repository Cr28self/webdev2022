

## 1. NGINX 의 용도

주로 NodeJS같은 웹 애플리케이션 앞에 배치되어 사용되어 지는 NGINX는 주로 어떻게 사용되어 지는 것 일까요?

개인적으로 주요 용도는 아래 두가지를 볼 수 있을 것 같습니다.

#### 1-1. 정적인 리소스를 Serve해 주는 것

유저로부터 어떠한 요청이 들어왔을 때,

이미지나 CSS같은 정적인 리소스(Static Content)에 대한 request들을 NGINX에게 맏기고,

동적으로 계산되거나 전달되어야 하는 것들은 NodeJS같은 애플리케이션 서버에게 맡깁니다.

마지막으로 데이터베이스에 대한 리퀘스트들을 위해서 DB서버를 사용하는 것이지요.

이렇게 분할해서 보다 효율적으로 서버를 관리하는 용도로 NGINX를 사용합니다.

#### 1-2. Reverse Proxy Server로서 Request와 Response를 중개해 주는 것

Reverse Proxy Server로서 Request와 Response를 중개하는 Proxy서버로 동작하게 할 수 있는데요.

(Reverse Proxy Server에 대한 개념은 아래에서 정리하였습니다.)

여기에 플러스해서, NodeJS보다 더 강력한 보안이나 가속화 기능등을 추가적으로 적용할 수 있습니다.


https://developer88.tistory.com/m/299