# 자바스크립트 백엔드 과제

### 익명 게시판 포스트 작성 및 댓글 기능 만들기

- **요구사항**:

  1. Node.js + Express + Mongoose 활용

- 스키마:

  1. **Blog 모델** 정의 (`title`, `content`, `author`).
  2. **Comment 모델** 정의 (`content`, `author`, `blogId`).
  3. Blog의 \_id값은 Comment의 blogId값과 같다.

- API 리스트

  **블로그**

  1. POST 새로운 블로그 포스트 추가.
     1. title, content, author 중 1개라도 없으면 예외처리
  2. GET 블로그 글 전체 조회
     1. query string으로 limit을 받고, limit의 수만큼 내려줄 것
  3. GET 특정 블로그 글 조회
  4. PATCH 특정 블로그 글 수정
     1. author은 수정 불가능, title, content만 수정 가능
  5. DELETE 특정 블로그 글 삭제

  **댓글**

  1. POST 블로그에 댓글 작성
  2. GET 특정 블로그의 댓글 조회
  3. PATCH 특정 댓글 수정
  4. DELETE 특정 댓글 삭제

- **확장 과제**:
  - 댓글에 **대댓글** 기능 추가.
