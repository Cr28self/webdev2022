## GitFlow 개발 전략

- 여러 개발자가 아무렇게나 브랜치 따서 만들면 개발 과정이 복잡해지고 추적도 어려워져 
Git branch를 깔끔하게 만들어 줄 수 있는 여러 전략중 하나..

---

### 5개의 branch를 운영

- **main 브랜치**
- **develop 브랜치**
    - (개발용)
- **feature 브랜치**
    - (develop에 기능추가용)
- **hotFix 브랜치**
    - (main 브랜치 버그해결용)
- **release 브랜치**
    - (develop 브랜치를 main 브랜치에 합치기 전에 최종 테스트용)

---

---

### 적용 예시

프로그램을 협업해서 0.9 버전까지 만들어 놨고, 1.0 버전부터 git flow 전략을 사용하고자 할때…

### 1. develop 브랜치 생성

![Untitled](%E1%84%8F%E1%85%A5%E1%84%86%E1%85%B5%E1%86%BA%2078e10f43fc7c415a9b0e92d0db181a18/Untitled.png)

- 일단 **main 프로젝트 사본**을 만들어서 거기다가 먼저 **개발해볼 목적**으로 **develop 브랜치** 생성
    - **이후 모든 개발은 develop 브랜치에서 수행**

### 2. 새로운 기능들은 feature 브랜치에서 진행

![Untitled](%E1%84%8F%E1%85%A5%E1%84%86%E1%85%B5%E1%86%BA%2078e10f43fc7c415a9b0e92d0db181a18/Untitled%201.png)

- 새로운 기능들을 추가하고 싶으면 **develop 브랜치를 복사해서 feature 브랜치에서 개발**함
    - feature/login 브랜치 생성해서 login기능을 개발
    - feature/UI 브랜치 생성해서 UI 개발
    - (브랜치 작명할 때 여러 단어가 필요하면 보통 대시나 / 기호 씁니다)
- 기능이 완성되면 develop 브랜치에 merge합니다.
- 보통 개발자 저장소에만 있는 브랜치이고, origin에 push하지는 않습니다.

### 3. 새로운 버전 출시 준비할때는 release 브랜치 사용

![Untitled](%E1%84%8F%E1%85%A5%E1%84%86%E1%85%B5%E1%86%BA%2078e10f43fc7c415a9b0e92d0db181a18/Untitled%202.png)

- develop 브랜치에서 기능 다 구현 후 main브랜치에 합치기 전에 
**마지막 테스트용**으로 develop 브랜치를 복사해 **release 브랜치** 생성.
    - 여기서 최종적으로 테스트 진행함
    - 버그같은거 발견하면 임시 branch 만들어 수정
    - release/1.0 이런식으로 작명하기
- 최종적으로 완성한것 같으면 main 브랜치로 merge합니다!! & 배포까지..
- 계속 개발을 해야 하니 develop 브랜치에도 merge해 줍니다.

### 4. hotfix 브랜치

![Untitled](%E1%84%8F%E1%85%A5%E1%84%86%E1%85%B5%E1%86%BA%2078e10f43fc7c415a9b0e92d0db181a18/Untitled%203.png)

- 완성해서 배포한 1.0 버전의 프로그램에서 버그나 오류를 발견했을때…
    - 급하게 수정해야 하므로 main브랜치에서 hotfix 브랜치 하나 만들어서 
    바로바로 수정하면 됩니다.
- 수정이 완료 되면 main브랜치에 직접 merge해줍니다.
- 이와 동시에 develop 브랜치에도 merge해줍니다.
    
    

> **이러한 방법 말고도 github flow, gitlab flow, trunk-based 등등  다양한 방법들이 있다.**
> 

> **결론**
> 
- 이미 어느정도 개발이 진척이 되었거나 시니어들만 있을 경우 git flow 보다는
trunk-based 이런거 쓰는게 훨씬 편리합니다.
- 최근 유행한 CI/CD 이런 식으로 개발하는 곳들도 trunk-based 개발방식을 적용합니다.

- 출시된 버전의 안정성이 중요한 프로그램들, 아직 뼈대가 확실하지 않아 연구식으로 개발하는 프로그램들은 git flow가 적절할 수 있습니다.
- 상황과 목적에 맞게 다양한 전략들을 사용하자!!

---

---

출처 : 코딩애플 매우쉽게 알려주는 git & github