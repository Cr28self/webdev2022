
# 1. Introduction

[Sass(Syntactically Awesome StyleSheets)](http://sass-lang.com/)는 CSS pre-processor로서 CSS의 한계와 단점을 보완하여 보다 가독성이 높고 코드의 재사용에 유리한 CSS를 생성하기 위한 CSS의 확장(extension)이다.

CSS의 간결한 문법은 배우기 쉬우며 명확하여 프로젝트 초기에는 문제가 없이 보이지만 프로젝트의 규모가 커지고 수정이 빈번히 발생함에 따라 쉽게 지저분해지고 유지보수도 어려워지는 단점도 가지고 있다.

이러한 CSS의 태생적 한계를 보완하기 위해 Sass는 다음과 같은 추가 기능과 유용한 도구들을 제공한다.

-   변수의 사용
-   조건문과 반복문
-   Import
-   Nesting
-   Mixin
-   Extend/Inheritance

CSS와 비교하여 Sass는 아래와 같은 장점이 있다.

-   CSS보다 심플한 표기법으로 CSS를 구조화하여 표현할 수 있다.
-   스킬 레벨이 다른 팀원들과의 작업 시 발생할 수 있는 구문의 수준 차이를 평준화할 수 있다.
-   CSS에는 존재하지 않는 Mixin 등의 강력한 기능을 활용하여 CSS 유지보수 편의성을 큰 폭으로 향상시킬 수 있다.

# [#](https://poiemaweb.com/sass-basics#2-install)2. Install

브라우저는 Sass의 문법을 알지 못하기 때문에 Sass(.scss) 파일을 css 파일로 트랜스파일링(컴파일)하여야 한다. 따라서 Sass 환경의 설치가 필요하다.

Sass는 2006년 Ruby로 처음 개발되었고 이후 Ruby Sass를 C++로 포팅한  [Libsass](https://github.com/sass/libsass), node.js 환경에서 Libsass를 사용할 수 있는  [node-sass](https://github.com/sass/node-sass)  등 다양한 포팅 버전이 등장했다. Sass는 최근에  [Dart Sass](https://sass-lang.com/dart-sass)로 재구현되었다. Libsass나 node-sass는 현재 유지 관리는 되고 있으나 폐지되었으므로 Dart Sass를 사용하도록 하자.

다음 명령을 사용해 Sass를 설치한다.

```bash
$ npm install -g sass

```

# [#](https://poiemaweb.com/sass-basics#3-command)3. Command

## [#](https://poiemaweb.com/sass-basics#31-version)3.1 version

```bash
$ sass --version
1.30.0 compiled with dart2js 2.10.4

```

## [#](https://poiemaweb.com/sass-basics#32-%ED%8A%B8%EB%9E%9C%EC%8A%A4%ED%8C%8C%EC%9D%BC%EB%A7%81)3.2 트랜스파일링

sass-project 디렉터리를 생성하고 트랜스파일링할 foo.scss 파일을 아래와 같이 생성하자.

```scss
$site_max_width: 960px;
$font_color: #333;
$link_color: #00c;
$font_family: Arial, sans-serif;
$font_size: 16px;
$line_height: percentage(20px / $font_size);

body {
  color: $font_color;

  // Property Nesting
  font: {
    size: $font_size;
    family: $font_family;
  }

  line-height: $line_height;
}

#main {
  width: 100%;
  max-width: $site_max_width;
}

```

트랜스파일링할 SCSS 파일의 경로와 트랜스파일링 후 생성될 css 파일의 경로를 지정한다.

```bash
$ cd sass-project

## foo.scss를 트랜스파일링해서 foo.css를 생성
$ sass foo.scss:foo.css

```

foo.scss 파일이 드랜스파일링되어 다음과 같이 foo.css 파일이 생성된다.

```css
body {
  color: #333;
  font-size: 16px;
  font-family: Arial, sans-serif;
  line-height: 125%;
}

#main {
  width: 100%;
  max-width: 960px;
}

/*# sourceMappingURL=foo.css.map */

```

특정 디렉터리 내의 모든 scss 파일을 css 파일로 일괄 트랜스파일링해서 지정한 디렉터리에 저장하려면 다음과 같이 인풋 디렉터리와 아웃풋 디렉터리를 지정한다.

```bash
## sass input-directory-path:output-directory-path
$ sass src/sass:dist/css

```

npm scripts를 사용하면 매번 긴 명령어를 입력하지 않고 좀 더 간단히 명령어를 사용할 수 있다.

프로젝트 디럭터리에 아직 package.json이 없다면 다음 명령으로 package.json을 생성한다.

```bash
$ cd sass-project
$ npm init -y

```

생성된 package.json을 다음과 같이 수정한다.

```json
{
  "name": "sass-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build:sass": "sass src/sass:dist/css"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

이제 다음 명령으로 좀 더 간단히 트랜스파일링할 수 있다.

```bash
$ npm run build:sass

```

## [#](https://poiemaweb.com/sass-basics#33-style)3.3 style

scss 파일을 트랜스파일링하여 css 파일을 생성할 때 2가지 스타일 중 하나를 선택할 수 있다.

**expanded**

표준적인 스타일의 css 파일이 생성된다. 기본값이다.

```bash
$ sass --style expanded src/sass:dist/css
# 위와 같은 결과가 만들어진다.
$ sass src/sass:dist/css

```

**compressed**

가능한 빈공간이 없는 압축된 스타일의 css 파일이 생성된다.

```bash
$ sass --style compressed src/sass:dist/css

```

## [#](https://poiemaweb.com/sass-basics#34-watch)3.4 watch

watch 옵션은 scss 파일의 변경을 감지하여 변경될 때마다 scss 파일을 트랜스파일링하여 css 파일을 자동 업데이트한다.

```bash
## watch src/sass -> dist/css
$ sass --watch src/sass:dist/css

```

# [#](https://poiemaweb.com/sass-basics#4-sass-vs-scss)4. SASS vs. SCSS

Sass는 SASS 표기법(.sass)과 SCSS 표기법(.scss)이 있다. 이전 버전에서는 SASS 표기법이 기본 표기법이었으나 Sass 3.0부터 CSS 친화적인 SCSS（Sassy CSS） 표기법이 기본 표기법이 되었다.

SCSS

SASS

CSS

중괄호 {}

필요

불필요（공백 2문자 들여쓰기가 코드 블록을 의미)

필요

세미콜론 ;

필요

불필요

필요

: 뒤의 공백

불필요

필요

불필요

Mixin

@mixin

=

없음

Include

@include

+

없음

확장자

.scss

.sass

.css

SASS 표기법은 보다 코딩을 간략화할 수 있는 장점이 있지만 CSS 친화적인 SCSS 표기법를 사용하는 경우가 더 많으므로 본 Post에서는 SCSS 표기법을 기준으로 한다.

Sass의 문법에 대한 설명은 아래 포스트를 참조하기 바란다.

-   [SassScript](https://poiemaweb.com/sass-script)
    
-   [Sass CSS Extensions](https://poiemaweb.com/sass-css-extention)
    
-   [Sass Built-in Function](https://poiemaweb.com/sass-built-in-function)
