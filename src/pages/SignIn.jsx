import { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { login } from '../lib/api/auth'
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

const ToggleButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-bottom: 10px;
`

export default function SignIn() {
  const setUser = useAuthStore((state) => state.setUser)

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handelSignIn = async () => {
    console.log(`Id=>`, id)
    console.log(`Password=>`, password)

    // 1. const response = 구조 분해 할당
    // 1. console.log('로그인 API 응답값 : ', response.userId, response.nickname, response.avatar);
    const { userId, nickname, avatar } = await login({ id: id, password: password })
    console.log('로그인 API 응답값 : ', userId, nickname, avatar)
    // 2. 상태 관리에 넣어줌
    alert('로그인 성공')
    setUser({ userId, nickname, avatar })
    navigate('/')
  }
  return (
    <Container className="SignIn">
      <InputGroup>
        <label htmlFor="id">아이디</label>
        <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디" />
      </InputGroup>
      <InputGroup>
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      </InputGroup>
      <ButtonGroup>
        <Button onClick={handelSignIn}>로그인</Button>
        <ToggleButton
          onClick={() => {
            navigate('/signup')
          }}
        >
          회원가입
        </ToggleButton>
      </ButtonGroup>
    </Container>
  )
}
