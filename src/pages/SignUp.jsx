import { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { register } from '../lib/api/auth'

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

export default function SignUp() {
  const [id, setId] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handelSignIn = async () => {
    console.log(`Id=>`, id)
    console.log(`Password=>`, password)
    console.log(`nickname=>`, nickname)

    // 유효성 검사 1 : 아이디는 4~10글자로, 비밀번호는 4~15글자로, 닉네임은 1~10글자로 제한
    if (id.length < 4 || id.length > 10) {
      alert('아이디는 4글자에서 10글자 이내로만 가능합니다')
      return
    }

    if (password.length < 4 || password.length > 15) {
      alert('비밀번호는 4글자에서 15글자 이내로만 가능합니다')
      return
    }

    if (nickname.length < 4 || nickname.length > 15) {
      alert('닉네임은 1글자에서 15글자 이내로만 가능합니다')
      return
    }

    // API 호출을 진짜로 하는 부분
    console.log('회원가입 API 호출')
    // 응답값이 나올때 까지 처리 안되도록 하기 위해 불러오고 await, 준다
    const response = await register({
      id: id,
      password: password,
      nickname: nickname
    })
    console.log('회원가입 API 응답값 : ', response)
    if (response) {
      confirm('회원가입 완료')
      navigate('/signin')
    }
  }

  return (
    <Container className="SignIn">
      <InputGroup>
        <label htmlFor="nickname">닉네임</label>
        <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임" />
      </InputGroup>
      <InputGroup>
        <label htmlFor="id">아이디</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디" />
        {/* 유효성 검사 2 : minLength="2" maxLength="8" 입력 제한 */}
      </InputGroup>
      <InputGroup>
        <label htmlFor="password">비밀번호</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      </InputGroup>
      <ButtonGroup>
        <Button onClick={handelSignIn}>회원가입</Button>
        <ToggleButton
          onClick={() => {
            navigate('/signin')
          }}
        >
          로그인으로 돌아가기
        </ToggleButton>
      </ButtonGroup>
    </Container>
  )
}
