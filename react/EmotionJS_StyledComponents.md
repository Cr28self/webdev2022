
###   
해당 챕터에서 배울 라이브러리 활용 방법

  
저희가 여기에서 배울 내용은 다음과 같습니다.  
  

1.  글로벌 스타일 지정 방법
2.  Tagged Template Literal 방식을 통한 CSS 정의 및 적용 방법
3.  Tagged Template Literal 방식을 통한 Styled Component 생성 방법
4.  객체를 통한 Styled Component 생성 방법
5.  Styled Component에서 Props를 받아 처리하는 방법

  
이 내용은 모두 info.tsx 파일에서 진행되니 따로 파일 경로를 표시하지 않겠습니다.

그리고 핵심적인 내용이 아닌 부분은 생략되니 참고해주세요.  
  
  
  

### CSS 정의 및 글로벌 스타일 지정 방법

  
가장 먼저 글로벌 스타일 지정 방법과 Tagged Template Literal 방식을 통한 css 정의 방법에 대해 알아봅시다.

해당 기능들을 사용하기 위한 컴포넌트와 함수를 불러옵시다.  
  

import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { Global, css } from '@emotion/react'

...

  
다음 해야할 것은 전역으로 설정할 스타일을 정의하는 것입니다.

2번 내용에 해당하며, css라는 함수를 통해 Tagged Template Literal 방식으로 스타일을 정의하겠습니다.  
  

import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/react'

...

const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-size: 20px;
  }
`

...

  
이제 정의한 CSS를 통해 전역 스타일을 변경해봅시다.

이를 위해 emotionjs에서는 Global이라는 컴포넌트를 제공합니다.

styles이라는 이름의 props로 정의한 CSS를 다음과 같이 넘겨주면 됩니다.  
  

...

const InfoPage: FunctionComponent<InfoPageProps> = function ({
  data: {
    site: {
      siteMetadata: { title, description, author },
    },
  },
}) {
  return (
    <div>
      <Global styles={globalStyle} />
      {title} {description} {author}
    </div>
  )
}

...

  
여기까지 따라오셨다면 info 페이지를 확인해보세요.

전역 스타일이 변경된 상태의 페이지를 보실 수 있을 것입니다.  
  
  
  

### Tagged Template Literal 방식을 통해 정의한 CSS 적용 방법

  
이번에는 위에서 살펴본 Tagged Template Literal 방식을 통해 정의한 CSS를 일반 HTML 요소 또는 Styled Component에 적용하는 방법을 알아봅시다.

단, 사용자 정의 컴포넌트에서는 사용이 불가능합니다.

일단 간단하게 아래와 같이 텍스트 스타일을 정의해줍시다.  
  

...

const TextStyle = css`
  font-size: 18px;
  font-weight: 700;
  color: gray;
`

const InfoPage: FunctionComponent<InfoPageProps> = function ({
  data: {
    site: {
      siteMetadata: { title, description, author },
    },
  },
}) {
  return (
    <div>
      <Global styles={globalStyle} />
      {title} {description} {author}
    </div>
  )
}

...

  
title 텍스트에 스타일을 지정해주기 위해 Div 요소로 감싸준 후, css 속성 값으로 위에서 정의한 TextStyle CSS를 넘겨줍니다.  
  

...

const InfoPage: FunctionComponent<InfoPageProps> = function ({
  data: {
    site: {
      siteMetadata: { title, description, author },
    },
  },
}) {
  return (
    <div>
      <Global styles={globalStyle} />
      <div css={TextStyle}>{title}</div>
      {description} {author}
    </div>
  )
}

...

  
단, 여기에서 css props 부분에 빨간 밑줄이 그어지면서 다음과 같은 경고문이 출력될 수 있습니다.  
  

```bash
'{ children: string; css: SerializedStyles; }' 형식은 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>' 형식에 할당할 수 없습니다.
  'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>' 형식에 'css' 속성이 없습니다.ts(2322)

```

  
이를 해결하기 위해서는 기존의 HTML의 Element 타입을 상속받아 해당 프로퍼티를 추가한 새로운 타입을 정의해주어야 하지만 여기에서는 그 과정은 생략하겠습니다.

여기까지 한 후, info 페이지를 확인해보시면 스타일이 적용된 title 텍스트를 확인하실 수 있습니다.  
  
  
  

### Tagged Template Literal 방식을 통한 Styled Component 생성 방법

  
이번에는 CSS 정의가 아닌, Styled Component 생성 방법에 대해 알아봅시다.

일반적으로 사용되는 방식인 Tagged Template Literal 방식을 통해 어떻게 컴포넌트를 생성하는지 알아봅시다.

기본적인 형태는 위에서 살펴본 css 함수를 통한 정의 방법과 비슷하지만, 사용하는 라이브러리와 호출 함수에서 약간의 차이점이 존재합니다.

우선, 생성하기 전에 필요한 함수를 다음과 같이 Import 해야합니다.  
  

import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'

...

  
그리고 다음과 같은 형식으로 변수명이 Text1인 Styled Component를 생성합니다.  
  

...

const TextStyle = css`
  font-size: 18px;
  font-weight: 700;
  color: gray;
`

const Text1 = styled.div`
  font-size: 20px;
  font-weight: 700;
`

...

  
이를 통해 생성한 Text1 컴포넌트는 사용자가 정의한 스타일이 적용된 Div 요소가 됩니다.

만약 Div 요소가 아닌 다른 요소의 스타일을 적용하고 싶은 경우에는  `styled.img`...`` 와 같이 해당 엘리먼트를 styled 뒤에 붙여 호출해주면 됩니다.

이렇게 정의한 Styled Component는 일반적인 컴포넌트나 HTML 요소같이 사용하시면 됩니다.  
  

...

const InfoPage: FunctionComponent<InfoPageProps> = function ({
  data: {
    site: {
      siteMetadata: { title, description, author },
    },
  },
}) {
  return (
    <div>
      <Global styles={globalStyle} />
      <div css={TextStyle}>{title}</div>
      <Text1>{description}</Text1>
      {author}
    </div>
  )
}

...

  
여기까지 잘 따라오셨다면 스타일이 제대로 적용된 description 텍스트를 확인하실 수 있습니다.  
  
  
  

### 객체를 통한 Styled Component 생성 방법

  
이번 방법은 Styled Component를 생성하는 또 다른 방식인 스타일 객체로 생성하는 방법에 대해 알아봅시다.

위의 방법은 진짜 CSS 코드를 작성하듯이 스타일 지정이 가능하지만, 해당 방법은 스타일 속성을 객체에 담아 전달하기 때문에 사용 방법에 차이가 있습니다.

유의사항은 하이픈('-')을 통해 단어를 연결하는 Kebab Case가 아닌 단어가 합쳐진 부분마다 맨 처음 글자를 대문자로 표시하는 Camel Case를 사용한다는 점과 스타일 값은 무조건 String Type으로 전달해야 한다는 점입니다.

따라서 아래와 같이 객체를 생성하여 넘겨주어야 합니다.  
  

...

// Kebab Case 적용
const Text1 = styled.div`
  font-size: 20px;
  font-weight: 700;
`  
// Camel Case 적용
const Text2 = styled('div')(() => ({
  fontSize: '15px',
  color: 'blue',
}))

...

  
다만 여기에서 점을 통해 함수를 호출하는 방법과, HTML 요소를 문자열로 넘겨 함수를 호출하는 방법으로 나뉘는데, Styled Component를 정의하는 방법에 상관없이 사용 가능합니다.

여기서 정의한 Text2 컴포넌트는 마찬가지로 일반 컴포넌트나 HTML 요소처럼 사용 가능합니다.  
  

...

const InfoPage: FunctionComponent<InfoPageProps> = function ({
  data: {
    site: {
      siteMetadata: { title, description, author },
    },
  },
}) {
  return (
    <div>
      <Global styles={globalStyle} />
      <div css={TextStyle}>{title}</div>
      <Text1>{description}</Text1>
      <Text2>{author}</Text2>
    </div>
  )
}

...

  
  

### Styled Component에서 Props를 받아 처리하는 방법

  
이 방법은 Tagged Template Literal 방식으로 생성한 Styled Component와 객체를 통한 Styled Component 모두 Props를 어떻게 받아서 처리하는지 알아봅시다.

여기서는 disabled이라는 Props를 받아 만약 참이면 글씨에 중간줄을 추가해봅시다.

우선, TypeScript 상에서 Styled Component의 Props를 받아 사용하기 위해서는 타입을 지정해주어야 합니다.

다음과 같이 Props 타입을 지정해줍시다.  
  

...

const Text1 = styled.div<{ disable: boolean }>`
  font-size: 20px;
  font-weight: 700;
`

const Text2 = styled('div')<{ disable: boolean }>(() => ({
  fontSize: '15px',
  color: 'blue',
}))

...

  
만약 Props가 많다면 타입을 위에서 따로 정의해 사용하겠지만 여기에서는 단 1개만 받기 때문에 리터럴 형식으로 타입을 작성하겠습니다.

저희는 위와 같이 disable 변수의 타입을 지정해주었습니다.

그 후, 다음과 같이 disable 값에 따라 적용할 스타일을 지정해주어야 합니다.  
  

...

const Text1 = styled.div<{ disable: boolean }>`
  font-size: 20px;
  font-weight: 700;
  text-decoration: ${({ disable }) => (disable ? 'line-through' : 'none')};
`

const Text2 = styled('div')<{ disable: boolean }>(({ disable }) => ({
  fontSize: '15px',
  color: 'blue',
  textDecoration: disable ? 'line-through' : 'none',
}))

...

  
그럼 타입 정의와 Props 값에 따른 스타일 지정까지 모두 끝났으므로, 다음과 같이 컴포넌트에서 Props를 전달해봅시다.  
  

...

const InfoPage: FunctionComponent<InfoPageProps> = function ({
  data: {
    site: {
      siteMetadata: { title, description, author },
    },
  },
}) {
  return (
    <div>
      <Global styles={globalStyle} />
      <div css={TextStyle}>{title}</div>
      <Text1 disable={true}>{description}</Text1>
      <Text2 disable={true}>{author}</Text2>
    </div>
  )
}

...

  
  

### EmotionJS 실습 결과물 확인

  
여기까지 아무 이상 없이 잘 따라오셨다면 각각의 스타일이 적용된 3개의 텍스트를 확인할 수 있습니다.

아래 사진과 같이 흰색 배경에 스타일이 적용된 3개의 텍스트가 나오는지 확인해보세요.
