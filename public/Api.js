// API 명세
// 서버 API_URL : https://moneyfulpublicpolicy.co.kr

// 🎉 회원가입
// 아이디, 비밀번호, 닉네임으로 DB에 본인의 회원정보를 저장합니다.

// - Request
// Method → POST
// URL PATH →  /register
// Body ⬇️
// JSON
/* 
{
    "id": "유저 아이디",
		"password": "유저 비밀번호",
		"nickname": "유저 닉네임"
}
*/

// - Response
/* 
{
  "message": "회원가입 완료",
  "success": true
}
*/

// 🎉 로그인

// - Request
// Method → POST
// URL PATH →  /login
// Body ⬇️
// JSON
/* 
{
  "id":"유저 아이디",
  "password": "유저 비밀번호"
}
*/

// Query string ⬇️ (선택)
// accessToken 유효시간 조정을 위한 query string
// : query string 없이 path로만 요청 시 기본 1시간
// : query string (expiresIn) 으로 시간 기입 시 해당 시간대로 토큰 유효시간 조정가능
// : expiresIn : 시간 단위를 붙인 문자열 ex) 10s 10m 10h
// : TIP) `토큰만료 시 로그아웃 처리되는 로직을 테스트할 때 사용해 보세요`

/* 
/login?expiresIn=10m 
*/

// 유효시간을 10분인 accessToken 요청

// - Response
/*
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiY2FiYyIsImlhdCI6MTcwMDgxNDQyMCwiZXhwIjoxNzAwODE4MDIwfQ.8hWOHHEzDPzumnqCU7jyoi3zFhr-HNZvC7_pzBfOeuU",
  "userId": "유저 아이디",
  "success": true,
  "avatar": "프로필 이미지",
  "nickname": "유저 닉네임"
}
*/

// 🎉 회원정보 확인
// accessToken이 유효한 경우, 비밀번호를 제외한 본인의 회원정보를 응답해 줍니다.

// - authorization 속성 정의
/*
const response = await axios.get(`${BASE_URL}/user`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
*/

// - Request
// Method → GET
// URL PATH →  /user
// Header ⬇️
/*
{
	"Authorization": "Bearer AccessToken"
}
*/

// - Response
/*
{
  "id": "사용자 아이디",
  "nickname": "사용자 닉네임",
  "avatar": null,
  "success": true
}
*/

// 🎉 프로필 변경
// accessToken이 유효한 경우, 프로필 이미지 또는 닉네임을 FormData을 통해 요청하면 변경 완료된 이미지 URL과 닉네임을 응답해 줍니다.

// -  이미지파일을 FormData에 담는 방법
/*
const formData = new FormData();
// avatar와 nickname 중 하나 또는 모두 변경 가능
formData.append("avatar", imgFile);
formData.append("nickname", nickname);

// 요청 시 Content-Type에 유의
const response = await axios.patch(`${BASE_URL}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    }
);
*/

// - Request
// Method → PATCH
// URL PATH →  /profile

// Header ⬇️
// (참고: Thunder Client 의 경우 header에 Content-Type을 지정하지 않으셔야 정상동작하지만, 실제 api 요청 코드에서는 Content-Type을 반드시 아래와 같이 지정해야 정상동작합니다.)
/* 
{
	"Content-Type": "multipart/form-data",
	"Authorization": "Bearer AccessToken"
}
*/

// Body ⬇️
// FORM
/*
{
	"avatar": [이미지파일],
	"nickname": "변경할 닉네임"
}
*/

// - Response
/*
{
  "avatar": "변경된 이미지 URL",
  "nickname": "변경된 닉네임",
  "message": "프로필이 업데이트되었습니다.",
  "success": true
}
*/
