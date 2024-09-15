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
      alert('닉네임 변경 실패')
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
