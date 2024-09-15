import { useState } from 'react'
import { updateProfile } from '../api/auth'

const Profile = ({ user, setUser }) => {
  const [nickname, setNickname] = useState(user?.nickname || '')

  const handleNicknameChange = (e) => {
    setNickname(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await updateProfile({ nickname })
      console.log(response)
      setUser({ ...user, nickname: response.nickname })
      alert('프로필이 성공적으로 업데이트 되었습니다')
    } catch (error) {
      // 에러의 유형에 따라 구체적인 메시지 표시
      if (error.response) {
        // 서버에서 응답한 에러 (예: 4xx, 5xx 에러)
        console.error('Server Error:', error.response.data)
        if (error.response.status === 400) {
          alert('잘못된 요청입니다. 입력값을 확인하세요.')
        } else if (error.response.status === 401) {
          alert('인증이 필요합니다. 다시 로그인하세요.')
        } else {
          alert(`서버 에러: ${error.response.data.message || '알 수 없는 오류입니다.'}`)
        }
      } else if (error.request) {
        // 서버로부터 응답이 없을 때
        console.error('Network Error:', error.request)
        alert('서버와 통신할 수 없습니다. 네트워크 상태를 확인하세요.')
      } else {
        // 요청 설정 중에 발생한 에러
        console.error('Error:', error.message)
        alert(`에러: ${error.message}`)
      }
    }
  }

  return (
    <div>
      <div>
        <h1>프로필 수정</h1>
        <form onSubmit={handleSubmit}>
          <div className="m-5">
            <label>닉네임</label>
            <input
              onChange={handleNicknameChange}
              className="ml-2 border
            rounded-[6px] "
            />
          </div>
          <button type="submit">프로필 업데이트</button>
        </form>
      </div>
    </div>
  )
}

export default Profile
