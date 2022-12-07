
# WOW.js를 이용하여 다양한 스크롤 애니메이션 적용하기

라이브러리를 활용해 다양한 스크롤 애니메이션을 클래스 추가만으로 적용하기

1.  [WOW.js 사이트](https://wowjs.uk/)에 연결된  [GitHub](https://github.com/graingert/wow)에서 폴더 다운로드  
    
2.  WOW-master/css/libs/animate.css 파일을 html 파일과 같은 폴더, 혹은 하위 폴더에 추가  
    
3.  WOW-master/dist/wow.min.js 파일을 html 파일과 같은 폴더, 혹은 하위 폴더에 추가  
    
4.  스크롤 효과를 넣을 페이지 html 파일 header에 animate.css 파일 연결  
    
    ```html
    <link rel="stylesheet" href="폴더/animate.css">
    ```
    
      
    
5.  wow.min.js 파일 연결 및 실행 스크립트 추가
    
    ```html
    <script src="js/wow.min.js"></script>
    <script>
    new WOW().init();
    </script>
    ```
    
6.  스크롤 효과를 적용할 요소 클래스명을 “wow”로 지정  
    
    ```html
    <div class="wow">
    Content to Reveal Here
    </div>
    ```
    
7.  [Animate.css 웹사이트](https://daneden.github.io/animate.css/?)에서 원하는 애니메이션 스타일을 골라 “wow” 클래스명 뒤에 추가  
    
    ```html
    <div class="wow bounceInUp">
    Content to Reveal Here
    </div>
    ```
    

기본 세팅값으로는 웹페이지 최초 로딩 후 한 번만 작동하니, 애니메이션 효과 반복 실행을 위해서는 advanced option 적용 필요.

-   data-wow-duration: 애니메이션이 실행(지속)되는 시간 설정  
    
-   data-wow-delay: 페이지 로딩 후 애니메이션이 실행되기까지 간격 설정  
    
-   data-wow-offset: 요소가 어느 정도 올라왔을 때 애니메이션이 실행될지 지정  
    
-   data-wow-iteration: 애니메이션 반복 횟수 설정  
    
    ```html
    <section class="wow slideInLeft" data-wow-duration="2s" data-wow-delay="5s"></section>
    <section class="wow slideInRight" data-wow-offset="10"  data-wow-iteration="10"></section>
    ```
