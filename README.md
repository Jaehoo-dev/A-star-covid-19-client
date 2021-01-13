# 🚶‍♂️A* COVID19

- A* 경로 탐색 알고리즘을 시각화한 웹애플리케이션입니다.

### 🎬 시연 GIF

![preview](/README.assets/preview.gif)

### 🗂 깃헙 저장소

- [https://github.com/Jaehoo-dev/A-star-covid-19-client](https://github.com/Jaehoo-dev/A-star-covid-19-client) (프론트엔드)
- [https://github.com/Jaehoo-dev/A-star-covid-19-server](https://github.com/Jaehoo-dev/A-star-covid-19-server) (백엔드)

### 🔗 배포 주소

- [https://astar-covid19.info/](https://astar-covid19.info/)

### 📅 개발 기간

- Scrum & Sprint
    - 2020년 12월 26일
        - [ ] 기획
        - [ ] UI 목업 작업
        - [ ] 기술 스택 확정
    - 2020년 12월 27 - 2021년 1월 3일
        - [ ] 개발
        - [ ] 테스트코드 작성
        - [ ] CI 구축 및 배포

### 🕹 실행 방법

- 프론트엔드
    - 프로젝트를 클론받습니다.

        ```jsx
        git clone https://github.com/Jaehoo-dev/A-star-covid-19-client.git
        cd A-star-covid-19-client
        npm install
        ```

    - root 디렉토리에 .env 파일을 만들고 환경변수를 설정합니다.

        ```jsx
        REACT_APP_API_KEY=<firebase api key>
        REACT_APP_AUTH_DOMAIN=<firebase auth domain>
        REACT_APP_PROJECT_ID=<firebase project id>
        REACT_APP_STORAGE_BUCKET=<firebase storage bucket>
        REACT_APP_MESSAGING_SENDER_ID=<firebase messaging sender id>
        REACT_APP_APP_ID=<firebase app id>
        REACT_APP_LOCALHOST=http://localhost:8080
        ```

    - 애플리케이션을 실행합니다.

        ```jsx
        npm start
        ```

- 백엔드
    - Git을 이용해 프로젝트를 클론합니다.

        ```jsx
        git clone https://github.com/Jaehoo-dev/A-star-covid-19-server.git
        cd A-star-covid-19-server
        npm install
        ```

    - root 디렉토리에 .env 파일을 만들고 환경변수를 설정합니다.

        ```jsx
        JWT_SECRET_KEY=some_long_random_string_to_use_as_jsonwebtoken_secret_key
        POSTGRES_DATABASE=<postgreSQL database>
        POSTGRES_USERNAME=<postgreSQL username>
        POSTGRES_PASSWORD=<postgreSQL password>
        POSTGRES_HOST=<postgreSQL URL>
        POSTGRES_LOCALHOST=localhost
        TEST_PORT=4000
        ```

    - 서버를 실행합니다.

        ```jsx
        npm run dev
        ```

---

## 💡 프로젝트 동기

- 코로나19 확진자 위치를 기반으로 위험 반경을 피해가는 길을 알려주는 프로젝트를 보고 떠올렸습니다.
- 해당 앱은 경로를 표시하기 위해 여러 외부 API에 요청을 보낸 뒤 기다려야 했는데 '길 찾는 과정을 직접 만들어 보면 좋겠다'고 생각해 기획을 시작했습니다.
- 대신 지도와 코로나19 확진자 위치 등은 가상으로 만들었습니다.

---

## 🔎 프로젝트 설명

### 🛠 기술 스택

- Typescript
- React
- Styled Components
- Node.js / Express
- PostgreSQL / Sequelize
- AWS (CodeBuild, CodePipeline, Elastic Beanstalk)
- Jest
- React Testing Library
- Supertest

### 🕹 기능

1. 회원가입 및 로그인
    - Firebase를 이용해 Github 소셜 로그인을 구현했습니다.
    - 회원가입과 로그인을 나누지 않았습니다. 이메일이 데이터베이스에 없으면 자동으로 회원가입 처리를 하고 로그인합니다.
    - 로그인을 하지 않아도 웹사이트를 이용할 수 있습니다. 다만 경로 탐색 이력 버튼은 활성화되지 않습니다.
2. 지도
    - 지도(Map)는 Cell 컴포넌트들을 담은 배열로 만들었습니다. 행과 열을 표현하려 중첩된 배열을 이용하면 관리가 힘들 것이라 생각해 1차원 배열로 구성했습니다. x 좌표값과 y 좌표값은 필요할 때마다 계산합니다.
    - 클라이언트에서 코로나19 확진자 위치를 서버에 요청하면 서버에서 가상의 코로나19 확진자 위치를 무작위로 3~7개 만들어 보냅니다.
    - 클라이언트는 코로나19 확진자 위치를 받으면 5x5 위험 반경을 계산해서 표시합니다. 위험 반경이 지도 밖으로 흘러 나갈 땐 지도가 포함하는 반경만 표시합니다. 반경들은 겹칠 수 있습니다.
    - 이용자 위치는 GPS에 의해 자동으로 정해진다고 상정하고 클라이언트 쪽에서 자동으로 결정하게 설계했습니다.
    - Random 버튼을 누르면 코로나19 확진자 위치와 이용자 위치를 다시 설정합니다.
    - 사용자는 셀 한 군데를 도착지로 지정할 수 있습니다. 위험 반경을 표시하도록 설정했을 땐 위험 반경 안쪽 셀은 선택하지 못합니다.
    - 사용자는 'Find Path' 버튼과 'Visualize A*' 버튼 가운데 하나를 눌러 경로를 탐색할 수 있습니다. Find Path 버튼은 경로 탐색 결과만 보여줍니다. Visualize A* 버튼은 길찾기 과정을 시각화합니다. 길을 찾는 중일 때는 모든 지도 버튼과 도착지 지정 onClick을 비활성화합니다.
    - 위험 반경 표시가 'On'일 때는 위험 반경을 피해서 길을 찾습니다. 'Off'일 때는 위험 반경을 표시하지 않고 최단 거리로 길을 찾습니다. 'On'일 땐 위험 반경을 출발점이나 도착점으로 선택하지 못합니다.
    - 'Clear' 버튼을 누르면 경로 또는 시각화 과정을 지웁니다.
    - 로그인을 하면 'History' 버튼이 활성화됩니다. History 버튼을 누르면 모달이 나타나며 최근 경로 탐색 이력을 10개 불러옵니다. x 좌표와 y 좌표로 보여줍니다.
    - 특정 경로 탐색 이력을 누르면 지도에 해당 출발지와 도착지를 표시합니다. 코로나19 확진자 위치는 경로를 검색했던 당시와 달라졌을 수 있기에 현재 상태로 놔둡니다.
    - History 데이터는 데이터베이스에서 불러옵니다. Local storage 등 더 간편한 방법으로 저장하는 것이 적절하다고 생각하기도 했으나 풀스택 개발 경험을 늘리는 의미에서 데이터베이스에 저장했습니다.

### 🔑 A* Pathfinding Algorithm

1. 설계
    - Classes
        - 경로 탐색 알고리즘과 시각화 과정을 분리하려 Map 클래스와 Cell 클래스를 만들었습니다.
        - Map

            ```jsx
            const map = new Map(numberOfRows, numberOfColumns)
            ```

            - Map은 길이가 numberOfRows * numberOfColumns인 배열입니다.
            - getCell 메소드로 특정 Cell에 접근할 수 있습니다.
        - Cell

            ```jsx
            const cell = new Cell(index, numberOfColumns)
            ```

            - 각 셀은 index, rowIndex, columnIndex, gCost, hCost, fCost, isCangerous, cameFrom 정보를 담고 있습니다.
            - gCost와 hCost, fCost는 경로 탐색 알고리즘이 사용합니다. 기본값은 `Infinity`입니다.
            - isDangerous는 boolean 값으로 true면 해당 Cell에 해당하는 UI Cell이 빨간색으로 나타납니다. 기본값은 `false`입니다.
            - cameFrom 역시 경로 탐색 때 쓰는 속성으로 직전 Cell을 가리킵니다. 기본값은 `null`입니다.

    2. 실행

    - 사용자가 'Find Path' 버튼이나 'Visualize A*' 버튼을 누르면 findPath 함수를 실행합니다.
    - findPath는 초기 UI에 맞춰 Map과 Cell들을 초기 설정할 값들과 함께 useState의 setState 함수 등을 인자로 받습니다. 이 함수들에 의해 openIndices, closedIndices, pathIndices, currentCellIndex 등 state들이 바뀌며 useEffect에 의해 UI를 리랜더링합니다.
    - new Map으로 Cell들을 생성하고 초기값을 설정하고 출발지와 도착지를 찾아 둡니다.
    - 출발지의 gCost와 hCost, fCost를 계산합니다.
        - gCost는 출발지와 현재 셀 사이의 거리를 뜻합니다. 따라서 출발지의 gCost는 0입니다.
        - hCost는 현재 셀과 도착지 사이의 추정 거리입니다. Manhattan distance를 이용했습니다.
        - fCost는 gCost와 hCost를 더한 값입니다. A* 경로 탐색 알고리즘은 fCost를 최소화하는 방향으로 길을 찾습니다.
    - openCells와 closedCells를 초기화합니다.
        - openCells는 경로 후보 Cell들을 담는 배열입니다. 출발지 Cell 하나로 초기화합니다.
        - closedCells 역시 Cell들로 이뤄진 배열입니다. 검토를 완료한 Cell들을 담습니다. 빈 배열로 시작합니다.
    - openCells 배열에 검토할 Cell들이 있는 동안 while문을 돌립니다.
        - 현재 셀은 openCells 가운데 fCost가 가장 작은 셀입니다. 해당 Cell을 openCells에서 제외하고 closedCells에 추가합니다.
        - (이용자가 경로 탐색을 시각화하도록 설정했다면 state들을 최신화합니다.)
        - 현재 Cell의 인덱스가 도착지 인덱스와 같다면 while문에서 빠져나갑니다.
        - 주변 Cell들을 파악하고 neighbors 배열에 담습니다. A* COVID19은 지도 상에서 대각선으로 움직일 수 없다고 상정했습니다. 따라서 neighbors에는 상하좌우 Cell들만 담습니다.
        - neighbors Cell들이 조건에 맞다면 openCells에 추가합니다. 이미 검토했더나(즉 closedCells이 포함하거나) 위험 반경에 속하는 Cell이라면 추가하지 않습니다.
        - neighbors Cell들의 gCost, hCost, fCost, cameFrom을 최신화합니다.
        - (이용자가 경로 탐색을 시각화하도록 설정했다면 state들을 최신화합니다.)
    - openCells가 비었는데 현재 Cell의 인덱스가 도착지 인덱스와 다르다면 가능한 경로가 없다는 뜻이므로 이용자에게 알립니다.
    - cameFrom을 역으로 거슬러 올라가 경로를 표시합니다.

### 💾 데이터베이스 모델

- A* COVID19은 데이터베이스 모델이 비교적 단순합니다. 데이터베이스를 복잡하게 만들기보단 associate 등 관계형 데이터베이스의 특징을 활용하는 데 초점을 맞췄습니다.
- PostgreSQL은 mySQL 등과 달리 배열 데이터타입을 지원한다는 점이 흥미로워 선택했습니다.
- User
    - User 모델은 email 정보만을 저장합니다.
    - User 모델은 History 모델과 hasMany 관계로 엮여 있습니다.
    - User class는 메소드로 getHistories와 addHistory, hasHistory, countHistories, createHistory 등을 지닙니다.
- History
    - History 모델은 id와 userEmail, coordinates와 timestamps를 저장합니다. userEmail을 foreign key로 사용합니다.
    - coordinates는 [출발지 인덱스, 도착지 인덱스] 형식으로 구성했습니다. 출발지 인덱스와 도착지 인덱스 열을 만들 수도 있었지만 postgreSQL의 특징 가운데 하나인 배열 데이터타입을 다뤄봤습니다.
- 이전에 워런버핏테스트500([https://warrenbuffett-test500.site/](https://warrenbuffett-test500.site/))이라는 프로젝트를 mySQL을 이용해 만들면서 관계형 데이터베이스는 mongoDB의 sub schema 개념을 지원하지 않는 점이 불편하다고 느꼈습니다. 워런버핏테스트500은 주식 포트폴리오 관리 웹애플리케이션인데 포트폴리오에 속하는 주식 id들을 배열로 담지 못해 답답했습니다.
- 그래서 이번엔 배열 데이터타입을 지원하는 postgreSQL을 사용해봤습니다. 처음엔 User 모델만 만들고 User에 histories 좌표값들을 배열로 담으려 했습니다. 배열의 배열 `number[][]`도 저장할 수 있는줄 알았기 때문입니다. 하지만 배열의 배열은 저장할 수 없고 행과 열의 숫자가 같은 matrix 형태만 지원한다는 사실을 알았습니다.
- 그럼 History 아이디들의 배열을 User 모델에 저장해둘까 생각도 했지만 관계형 데이터베이스의 의미가 무색해지고 트랜젝션 과정도 쓸데없이 늘린다고 생각해 결국 현재 형태로 데이터베이스를 짰습니다.

---

## 🧶 어려움 극복 및 배운 점

- 이번 프로젝트는 타입스크립트와 PostgreSQL, 테스트코드 작성 등 세 가지에 초점을 맞췄습니다. 이외 시간이 드는 작업은 과감하게 생략했습니다.

### 📐 타입스크립트

- 개발 초기에는 타입스크립트 때문에 무척 애를 먹었습니다. 프론트엔드는 Create React App으로 개발을 시작했지만 백엔드는 제너레이터 없이 서버를 기초부터 만들자는 생각에 시간이 상당히 들었습니다. 타입을 찾고 정의하는 데도 시간이 많이 걸렸습니다.
- 하지만 이내 차츰 타입스크립트의 장점을 절감했습니다. 특히 console.log를 찍지 않고 있는 모습을 발견했을 때 크게 놀랐습니다. 런타임에 에러가 거의 나지 않아 버그를 찾으려 고생하지 않아도 됐기 때문입니다.
- 가령 이전 프로젝트에서는 잘 실행하던 함수가 언젠가부터 undefined만 반환하기 시작했습니다. undefined가 나오고 있다는 사실을 뒤늦게 알았을 뿐더러 원인을 찾는 데도 한참이 걸렸습니다. 결국은 사소한 오타 하나 때문이었는데 컴포넌트를 옮겨다니며 여기저기 console.log를 적어야 했습니다. 타입스크립트를 썼더라면 오류도 바로 알아채고 디버깅하는 데도 시간이 거의 안 걸렸을 거라 이번에 생각했습니다.
- 이 밖에 Java나 Go 등 strongly typed language들을 배우는 데도 거부감이 한층 없어졌다는 데 의미를 두고 싶습니다.

### 📋 테스트코드

- 이전 프로젝트들을 진행할 땐 기능을 하나라도 더 구현할 수 있는 시간이 아쉬워 테스트코드를 우선순위에서 미뤄뒀습니다. 하지만 이번에 처음부터 테스트코드 작성에 방점을 뒀으며 결과적으로 테스트코드 작성의 장점을 절감했습니다.
- 테스트를 초기 설정하면서 예상치 못하게 배운 점이 있습니다. 파일 분리입니다. 가령 Express 앱을 설정하는 파일에서 서버도 함께 구동하고 있었는데 테스트를 돌리기 전까진 아무 문제가 없었습니다. 하지만 테스트를 실행하려 Express 앱을 불러올 때 서버의 listen 함수가 실행돼 버리니 테스트에서 오류가 났습니다.
- 또한 애플리케이션이 제대로 구동하는지 신뢰하려면 테스트 실행은 선택이 아니라 필수라는 생각이 들었습니다. 배포 직전에 테스트를 실행하고 오류가 난다면 배포가 되지 않도록 막는 과정은 꼭 필요하다고 생각했습니다.
- 테스트 파일은 병렬로 실행이 된다는 점을 배웠습니다. 프론트엔드 코드를 테스트할 때는 문제가 발생하지 않았으나 백엔드 코드를 테스트할 때는 테스트 파일들이 병렬로 돌아가 계속해서 오류가 발생했습니다. afterAll로 테스트 데이터베이스를 비우는데도 데이터베이스 속 자료들이 다른 테스트들에 영향을 미치고 있었기 때문입니다. 테스트 구동 옵션을 추가해 테스트들이 직렬로 돌아가도록 설정했습니다.

### ⚙ 배포 자동화

- 타입스크립트를 도입하자 배포할 때 타입스크립트를 자바스크립트로 컴파일해주는 빌드를 언제할지를 고민해야 했습니다. 역시 프론트엔드는 리액트가 해결해줬으나 백엔드가 애매했습니다.
- 처음엔 직접 컴파일을 한 다음에 자바스크립트 코드를 파이프라인에 넣는 방법을 생각했으나 git에 타입스크립트와 자바스크립트 코드를 모두 보관하는 것은 비효율적이라고 생각했습니다.
- 결국 git의 deploy 브랜치에 코드를 merge하면 AWS의 CodeBuild가 새로운 코드를 감지하고 타입스크립트 코드를 컴파일하도록 설정했습니다. 빌드 과정을 마치면 CodePipeline과 Elastic Beanstalk을 거쳐 새 코드가 자동으로 배포됩니다.

---
