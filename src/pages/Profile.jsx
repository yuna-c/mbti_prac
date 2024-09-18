import { useState } from 'react'
import styled from 'styled-components'
import { updateProfile } from '../lib/api/auth'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 16px;
`

const InputGroup = styled.div`
  margin-bottom: 10px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => (props.danger ? '#ff4d4d' : '#007bff')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-bottom: 10px;

  &:hover {
    background-color: ${(props) => (props.danger ? '#cc0000' : '#0056b3')};
  }

  &:disabled {
    background-color: #a0a0a0;
  }
`

export default function Profile() {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  const [nickname, setNickname] = useState('')
  const [avatar, setAvatar] = useState(null)
  const navigate = useNavigate()

  const handleUpdateProfile = async () => {
    console.log(nickname)
    console.log(avatar)
    // 빈 폼 데이터 만들기
    const formData = new FormData()

    // "avatar": [이미지파일],
    // "nickname": "변경할 닉네임"
    formData.append('nickname', nickname)
    formData.append('avatar', avatar)

    // formData undefined 이유 : updateProfile에 안 넣어줌
    const response = await updateProfile(formData) // 전체 객체 response 받기

    if (response.success) {
      // user데이터는 그대로 받아오 되, 바뀌는 닉네임과 아바타만 변경
      setUser({ ...user, nickname: response.nickname, avatar: response.avatar })
      navigate('/')
    }
  }
  return (
    <Container className="Profile">
      <h2>프로필 수정</h2>
      <InputGroup>
        <label htmlFor="nickname">닉네임</label>
        <input type="text" id="nickname" value={nickname} minLength={1} maxLength={10} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임" />
      </InputGroup>
      <InputGroup>
        <label htmlFor="avatar">아바타 이미지</label>
        <input type="file" accept="image/*" id="avatar" onChange={(e) => setAvatar(e.target.files[0])} placeholder="닉네임" />
      </InputGroup>
      <ButtonGroup>
        <Button onClick={handleUpdateProfile}>변경하기</Button>
      </ButtonGroup>
    </Container>
  )
}
