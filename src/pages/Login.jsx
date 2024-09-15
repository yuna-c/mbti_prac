import { useEffect } from 'react'
import AuthForm from '../components/AuthForm'
import { login, getUserProfile } from '../api/auth'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ setUser }) => {
  const navigate = useNavigate()

  const handleLogin = async (formData) => {
    try {
      const loginData = await login(formData)
      console.log(loginData)
      localStorage.setItem('accessToken', loginData.accessToken)

      const userProfile = await getUserProfile(loginData.accessToken)
      console.log(userProfile)
      setUser(userProfile) // 로그인이 된 시점

      navigate('/')
    } catch (error) {
      alert('로그인에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div>
      <div>
        <h1>로그인</h1>
        <AuthForm mode="login" onSubmit={handleLogin} />
        <div>
          <p>
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
