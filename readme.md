## 익명 게시판 포스트 및 댓글 기능 구현

### 구현 완료 항목: [v]

---

**기술 스택:**

* Node.js + Express + Mongoose [v]
* MongoDB Atlas 클러스터 [v]

**데이터 모델:**

1.  **Blog 모델**:
    * `title`: String (제목) [v]
    * `content`: String (내용) [v]
    * `author`: String (작성자) [v]
2.  **Comment 모델**:
    * `content`: String (내용) [v]
    * `author`: String (작성자) [v]
    * `blogId`: ObjectId (참조하는 Blog 모델의 \_id) [v]
3.  **참조 관계**: Comment 모델의 `blogId` 필드는 Blog 모델의 `_id` 값을 참조합니다. [v]

**API 엔드포인트:**

**블로그 (Blog)**

1.  **POST /blogs**: 새로운 블로그 포스트 추가
    * 요청 바디: `{ title: String, content: String, author: String }`
    * 유효성 검사: `title`, `content`, `author` 필드 중 하나라도 누락 시 예외 처리 [v]
2.  **GET /blogs**: 전체 블로그 포스트 조회
    * 쿼리 파라미터: `limit` (Number, 응답받을 포스트 수 제한)
    * 구현 사항: `limit` 쿼리 스트링을 통해 요청된 수만큼 블로그 포스트 반환 [v]
3.  **GET /blogs/:id**: 특정 블로그 포스트 조회
4.  **PATCH /blogs/:id**: 특정 블로그 포스트 수정
    * 요청 바디: `{ title?: String, content?: String }` (선택적으로 수정할 필드 포함)
    * 제약 사항: `author` 필드는 수정 불가능 [v]
5.  **DELETE /blogs/:id**: 특정 블로그 포스트 삭제

**댓글 (Comment)**

1.  **POST /blogs/:blogId/comments**: 특정 블로그 포스트에 댓글 작성
    * 요청 바디: `{ content: String, author: String }`
2.  **GET /blogs/:blogId/comments**: 특정 블로그 포스트의 모든 댓글 조회
3.  **PATCH /comments/:id**: 특정 댓글 수정
    * 요청 바디: `{ content?: String }` (선택적으로 수정할 필드 포함)
4.  **DELETE /comments/:id**: 특정 댓글 삭제

**환경 변수:**

* `.env` 파일은 `.gitignore`에 등록되어 있으며, `DATABASE_URL`을 포함한 중요한 환경 설정 정보를 관리합니다.

**확장 과제:**

* 댓글에 **대댓글** 기능 추가 [-]

---

**추가 설명:**

본 문서는 익명 게시판의 포스트 작성 및 댓글 기능 구현에 대한 기술적인 명세를 담고 있습니다. Node.js, Express, Mongoose를 활용하여 백엔드 API를 구축하고, MongoDB Atlas 클러스터를 이용하여 데이터를 관리합니다. 기본적인 CRUD 기능을 제공하며, 확장 과제로 대댓글 기능을 고려하고 있습니다.

**다음 단계:**

* 명시되지 않은 API 엔드포인트 (`GET /blogs/:id`, `GET /blogs/:blogId/comments`, `PATCH /comments/:id`, `DELETE /comments/:id`) 구현
* 확장 과제인 대댓글 기능 구현 여부 및 방식 결정
