
로그인 시 React에서 REST API로 데이터를 가져와서 Redux에 넣으려고 한다

가입했을 때 넣은 내 정보를 가져와야 하는데

내 token값을 header Authorization에 넣어서 Bearer에 token을 담아서  보내줘야 데이터를 가져올 수 있다

**Bearer?**

기본적인 의미는 정보의 신호 전달을 네트워크 단에서 손실 없이 있는 그대로 전달하는 서비스를 말한다

베어러 서비스가 종합 정보 통신망에서는 아래의 의미로 사용된다

즉, 종합정보통신망(ISDN, Integrated Service Digital Network)에 의해 제공되는 3가지 서비스 중 하나이며, 사용자망 인터페이스 상호 간에 정보(음성, 음향 데이터, 영상 등)를 실시간(real time)으로 내용의 변경 없이 전달하는 방법을 제공하는 서비스를 말한다

**GET**으로 /user 중 내 정보를 가져오려고 한다

이때 Headers에 Authorization에 Bearer <token값>을 넣어서 요청해야

내 정보를 받아올 수 있다

Postman 기준으로 이런 식으로 요청을 해야 한다

![](https://k.kakaocdn.net/dn/2ZNCA/btq5qpnIpIL/qoYnzb1jrtLG2zj2oYQRc1/img.png)

이걸 React에서 요청하려면

```
const onLogin = () => {

  var variables = {
    "email": email,
    "password": password
  }

  Axios.post('/auth/login', variables)
    .then(res => {
      setCookie('token', res.payload.accessToken)
      setCookie('exp', res.payload.accessTokenExpiresIn)
      // token이 필요한 API 요청 시 header Authorization에 token 담아서 보내기
      Axios.defaults.headers.common['Authorization'] = `Bearer ${res.payload.accessToken}`
      Axios.get('/user/me')
        .then(res => {
          console.log(res);	
        })
    })
}
```

```
Axios.defaults.headers.common['Authorization'] = `Bearer ${res.payload.accessToken}`

```

/auth/login에서 로그인하면서 얻은 token 값을 그대로 header에 넣어서 요청하면서 내 정보를 가져올 수 있다
